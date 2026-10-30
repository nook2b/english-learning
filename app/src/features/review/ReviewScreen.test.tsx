import { render, screen } from '@testing-library/react'
import { db } from '../../data/db'
import { dayKey } from '../../data/dates'
import { noteTopics } from '../../data/review'
import { useClub } from '../../data/store'
import { ReviewScreen } from './ReviewScreen'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('with nothing piled up the classroom just waits', async () => {
  render(<ReviewScreen />)
  expect(await screen.findByText(/Ошибки из занятий будут собираться здесь/)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Разобрать' })).toBeNull()
})

test('mistakes show by topic with a button to work through them', async () => {
  await db.mistakes.add({ exerciseId: 'u002-s3-e1', tags: ['questions_do'], given: 'Do', expected: 'Does', at: 1 })
  await noteTopics(['questions_do'], 1, dayKey())
  render(<ReviewScreen />)
  expect(await screen.findByText('Вопросы и отрицания с do / does')).toBeInTheDocument()
  expect(screen.getByText('· 1 ошибка')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Разобрать' })).toBeInTheDocument()
})
