import { fireEvent, render, screen } from '@testing-library/react'
import { db } from '../../data/db'
import { dayKey } from '../../data/dates'
import { noteTopics } from '../../data/review'
import { useClub } from '../../data/store'
import { ReviewSession } from './ReviewSession'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('a round ends with what moved on, and the topic waits for its next day', async () => {
  await db.mistakes.add({ exerciseId: 'u002-s3-e1', tags: ['questions_do'], given: 'Do', expected: 'Does', at: 1 })
  await noteTopics(['questions_do'], 1, dayKey())
  render(<ReviewSession />)
  // Answer every task with its first option or the expected text until the round ends.
  for (let i = 0; i < 30 && !screen.queryByText('Разбор окончен'); i++) {
    const next = screen.queryByRole('button', { name: /^(Дальше|Завершить занятие)$/ })
    if (next) {
      fireEvent.click(next)
      await screen.findByRole('progressbar').catch(() => undefined)
      continue
    }
    const option = document.querySelector<HTMLButtonElement>('.option:not([disabled])')
    if (option) fireEvent.click(option)
    else {
      const box = screen.queryByRole('textbox')
      const tile = document.querySelector<HTMLButtonElement>('.tile:not([disabled])')
      if (box) fireEvent.change(box, { target: { value: 'x' } })
      else if (tile) fireEvent.click(tile)
      const check = screen.queryByRole('button', { name: 'Проверить' })
      if (check && !check.hasAttribute('disabled')) fireEvent.click(check)
    }
    await new Promise((r) => setTimeout(r, 0))
  }
  expect(await screen.findByText('Разбор окончен')).toBeInTheDocument()
  expect(screen.getByText('Вопросы и отрицания с do / does')).toBeInTheDocument()
  const topic = await db.topics.get('questions_do')
  expect(topic && topic.due > dayKey()).toBe(true)
})
