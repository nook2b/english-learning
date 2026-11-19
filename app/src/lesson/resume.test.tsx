import { fireEvent, render, screen } from '@testing-library/react'
import { Exercise } from '../content/schema'
import { db } from '../data/db'
import { useClub } from '../data/store'
import { ExerciseRun } from './ExerciseRun'
import { loadRun } from './resume'

const tasks = [
  Exercise.parse({ id: 'r-1', type: 'choice', prompt: 'one ___', options: ['a', 'b'], answer: 'a' }),
  Exercise.parse({ id: 'r-2', type: 'choice', prompt: 'two ___', options: ['c', 'd'], answer: 'c' }),
]

beforeEach(async () => {
  localStorage.clear()
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('an unfinished run picks up at the same task after a reload, and finishing clears it', async () => {
  const first = render(<ExerciseRun exercises={tasks} heading="x" resumeKey="t" onFinish={() => {}} onExit={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: 'b' }))
  expect(loadRun('t')?.at).toBe(1)
  first.unmount()
  // Reloaded: the second task, with the first (wrong) answer still counted and its retry still queued.
  let finished: unknown[] = []
  render(<ExerciseRun exercises={tasks} heading="x" resumeKey="t" onFinish={(a) => void (finished = a)} onExit={() => {}} />)
  expect(screen.getByText(/two/)).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'c' }))
  fireEvent.click(screen.getByRole('button', { name: 'Дальше' }))
  fireEvent.click(screen.getByRole('button', { name: 'a' }))
  fireEvent.click(await screen.findByRole('button', { name: 'Завершить занятие' }))
  await new Promise((r) => setTimeout(r, 20))
  expect(finished).toHaveLength(2)
  expect(loadRun('t')).toBeUndefined()
})
