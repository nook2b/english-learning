import { act, fireEvent, render, screen } from '@testing-library/react'
import { CHAT_PHOTOS, ROOM17, chatMessages } from '../../content/chats'
import { sessionId } from '../../data/db'
import type { SessionResult } from '../../data/db'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { clipUrl } from '../../speech/clips'
import { voicedText } from '../../speech/delivery'
import { ChatScreen } from './ChatScreen'
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

test('every photo in the chat has its picture', () => {
  const missing = ROOM17.messages.filter((m) => m.type === 'photo' && !(m.image && CHAT_PHOTOS[m.image])).map((m) => m.image)
  expect(missing).toEqual([])
})
