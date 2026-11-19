import { fireEvent, render, screen } from '@testing-library/react'
import { ARC_CHECKS, scoreArcCheck } from '../../content/arcChecks'
import { db } from '../../data/db'
import { useClub } from '../../data/store'
import { ArcCheckScreen } from './ArcCheck'

beforeEach(async () => {
  await db.delete()
  await db.open()
  await useClub.getState().init()
})

test('the arc 1 check has five blocks of five tasks on every skill of the arc', () => {
  const check = ARC_CHECKS.arc1!
  expect(check.blocks.map((b) => b.exercises.length)).toEqual([5, 5, 5, 5, 5])
  expect(new Set(check.blocks.flatMap((b) => b.exercises.map((e) => e.id))).size).toBe(25)
})

test('the result counts right answers per block and leaves put-off tasks out', () => {
  const check = ARC_CHECKS.arc1!
  const [a1, a2] = check.blocks[0]!.exercises
  const [b1] = check.blocks[1]!.exercises
  const outcome = (correct: boolean | null) => ({ correct, given: '', expected: '' })
  const score = scoreArcCheck(check, [
    { exercise: a1!, outcome: outcome(true) },
    { exercise: a2!, outcome: outcome(false) },
    { exercise: b1!, outcome: outcome(null) },
  ] as never)
  expect(score.A).toEqual({ correct: 1, total: 2 })
  expect(score.B).toEqual({ correct: 0, total: 0 })
})

test('the check opens with its setting and starts on demand', () => {
  render(<ArcCheckScreen id="arc1" />)
  expect(screen.getByText(/Harbour Film Club/)).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Начать' }))
  expect(screen.getByText(/What's your name/)).toBeInTheDocument()
})
