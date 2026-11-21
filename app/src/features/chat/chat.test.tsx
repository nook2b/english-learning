import { act, fireEvent, render, screen } from '@testing-library/react'
import { CHATS, CHAT_PHOTOS, ROOM17, chatMessages, openChats } from '../../content/chats'
import { sessionId } from '../../data/db'
import type { SessionResult } from '../../data/db'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { clipUrl } from '../../speech/clips'
import { voicedText } from '../../speech/delivery'
import { ChatHome, ChatScreen } from './ChatScreen'
import { line } from '../../test/line'

const done = (...ids: [string, number][]) =>
  Object.fromEntries(ids.map(([u, i]) => [sessionId(u, i), { id: sessionId(u, i), unitId: u, index: i, correct: 1, total: 1, seconds: 60, completedAt: 0 } as SessionResult]))

test('messages arrive when their session is done, and follow the story choices', () => {
  expect(chatMessages({}, {})).toEqual([])
  const after003 = chatMessages(done(['003', 2]), {})
  expect(after003.length).toBe(5)
  expect(after003.some((m) => m.type === 'voice' && m.from === 'rei')).toBe(true)
  const room = (flags: Record<string, true>) => chatMessages(done(['008', 8]), flags).filter((m) => m.type === 'photo').map((m) => m.image)
  expect(room({ u008_layout_window: true })).toEqual(['chat_008_room_after_window'])
  expect(room({})).toEqual(['chat_008_room_after_wall'])
})

test('every voice message has its clip, every message its translation', () => {
  for (const m of ROOM17.messages) {
    if (m.type === 'voice') expect(clipUrl(m.from, voicedText(m.text!, m))).toBeTruthy()
    if (m.type === 'text' || m.type === 'voice' || m.type === 'system') expect(m.ru).toBeTruthy()
    if (m.type === 'photo') expect(m.about).toBeTruthy()
  }
})

test('the chat shows what has arrived and marks it read', async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
  useClub.setState({ sessions: done(['003', 2]) })
  render(<ChatScreen />)
  expect(screen.getByText('Мика добавила тебя в чат «Room 17»')).toBeInTheDocument()
  expect(screen.getAllByText('Показать текст').length).toBe(3)
  await new Promise((r) => setTimeout(r, 50))
  expect(useClub.getState().settings.chatSeen?.length).toBe(5)
})

test('the player answers in the chat: a slip brings a question, an accepted answer stays with its reaction', async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
  useClub.setState({ sessions: done(['013', 2]) })
  render(<ChatScreen />)
  fireEvent.click(screen.getByRole('button', { name: 'Описать, как изменился двор' }))
  const box = () => screen.getByRole('textbox')
  fireEvent.change(box(), { target: { value: 'Courtyard good' } })
  fireEvent.click(screen.getByRole('button', { name: 'Проверить' }))
  expect(screen.getByText(line('Usually, or right now?'))).toBeInTheDocument()
  fireEvent.change(box(), { target: { value: "It's usually quiet here, but they're drilling today." } })
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Проверить' })))
  expect(await screen.findByText(line("That's the courtyard today. Save that line."))).toBeInTheDocument()
  expect(await db.flags.get('room17-013-2-r1:1')).toBeTruthy()
})

test('the confirmation reply follows the recording time chosen in 015', () => {
  const at = (flags: Record<string, true>) => chatMessages(done(['016', 2]), flags).filter((m) => m.type === 'reply')[0]!.intents![0]!.answers[0]
  expect(at({})).toMatch(/Friday/)
  expect(at({ u015_slot_sat11: true })).toMatch(/Saturday/)
})

// Photos asked for in an art brief and not delivered yet (docs/66-art-021-024-brief.md).
const WAITING_FOR_ART = ['chat_021_title', 'chat_023_steps']

test('every photo in the chat has its picture (or is waiting for one in an art brief)', () => {
  const missing = Object.values(CHATS).flatMap((c) => c.messages).filter((m) => m.type === 'photo' && !(m.image && CHAT_PHOTOS[m.image])).map((m) => m.image)
  expect(missing).toEqual(WAITING_FOR_ART)
})

test('a personal chat opens after its session; the phone then lists the chats', async () => {
  expect(openChats(done(['021', 8]), {}).map((c) => c.id)).toEqual(['room17'])
  expect(openChats(done(['022', 8]), {}).map((c) => c.id)).toEqual(['room17', 'dm-iris'])
  await db.delete()
  await db.open()
  await useClub.getState().init()
  useClub.setState({ sessions: done(['022', 8], ['023', 8]) })
  render(<ChatHome />)
  expect(screen.getByRole('button', { name: /^Room 17/ })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /^Iris, новых: 2/ })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /^Rei/ })).toBeInTheDocument()
})

test('in a personal chat the player taps a ready reply; it keeps the story flag the next units answer to', async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
  useClub.setState({ sessions: done(['022', 8]) })
  render(<ChatScreen chat={CHATS['dm-iris']} />)
  await act(async () => fireEvent.click(screen.getByRole('button', { name: /Keep the long one/ })))
  expect(await screen.findByText(line("I'll leave it somewhere quiet."))).toBeInTheDocument()
  expect(await db.flags.get('u022_dm_spare')).toBeTruthy()
  expect(await db.flags.get('dm-iris-022-8-r1:1')).toBeTruthy()
})

test('every voice message of every chat has its clip, every story flag of a ready reply is answered in a unit', () => {
  const units = JSON.stringify(Object.values(import.meta.glob('../../../../content/course/**/unit-*.json', { eager: true, import: 'default' })))
  for (const chat of Object.values(CHATS))
    for (const m of chat.messages) {
      if (m.type === 'voice') expect(clipUrl(m.from, voicedText(m.text!, m))).toBeTruthy()
      for (const it of m.intents ?? []) if (it.flag) expect(units).toContain(`"if": "${it.flag}"`.replace(': ', ':'))
    }
})
