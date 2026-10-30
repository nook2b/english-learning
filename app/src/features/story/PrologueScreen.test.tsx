import { fireEvent, render, screen, within } from '@testing-library/react'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { PrologueScreen } from './PrologueScreen'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

const click = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name }))

/** Picks the first intent of a scene and builds its first answer from the tiles. */
async function answerScene(intent: string, words: string[]) {
  click(intent)
  // Tiles, not the same words in the heroines' lines above.
  for (const w of words) fireEvent.click(within(document.querySelector<HTMLElement>('.tiles-bank')!).getAllByRole('button', { name: w }).find((b) => !b.hasAttribute('disabled'))!)
  click('Проверить')
  await screen.findByRole('button', { name: /^(Дальше|Завершить занятие)$/ })
}

test('the prologue: wrong door, ask the way again, introduce yourself; choices and the end are remembered', async () => {
  render(<PrologueScreen />)
  for (let i = 0; i < 4; i++) click('Дальше')
  await answerScene('Честно переспросить', ['Could', 'you', 'say', 'that', 'again,', 'please?'])
  click('Дальше')
  await answerScene('Представиться и сказать, что ты новенький', ['Nice', 'to', 'meet', 'you.', "I'm", 'new', 'here.'])
  click('Завершить занятие')
  for (let i = 0; i < 3; i++) click('Дальше')
  expect(await screen.findByText('Пролог пройден')).toBeInTheDocument()
  expect(useClub.getState().flags).toMatchObject({ prologue_asked_again: true, prologue_intro_new: true, prologue_done: true })
})
