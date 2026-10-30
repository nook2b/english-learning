import type { ReviewState } from '../../data/review'
import { buildRound, ROUND } from './build'

const mistake = (exerciseId: string, tag: string, at: number) => ({ exerciseId, tags: [tag], given: '', expected: '', at })

const state: ReviewState = {
  topics: [
    { tag: 'questions_do', step: 0, due: '2026-10-30', since: 1, mistakes: [mistake('u002-s3-e1', 'questions_do', 5), mistake('u002-s3-e2', 'questions_do', 6)] },
    { tag: 'frequency', step: 1, due: '2026-11-05', since: 1, mistakes: [mistake('u004-s3-e1', 'frequency', 7)] },
  ],
  deferred: [],
}

test('a round works on due topics: variations from the bank first, then the sentence that was wrong', () => {
  const round = buildRound(state, '2026-10-30', { maxUnit: '004' })
  expect(round.every((i) => i.tag === 'questions_do')).toBe(true)
  expect(round.filter((i) => i.exercise.id.startsWith('p-'))).toHaveLength(ROUND.variations)
  expect(round.at(-1)!.exercise.id.startsWith('u002-')).toBe(true)
})

test('variations only use units the learner has reached', () => {
  const round = buildRound(
    { ...state, topics: [{ ...state.topics[0]!, tag: 'frequency', mistakes: [] }] },
    '2026-10-30',
    { maxUnit: '001' },
  )
  expect(round).toEqual([])
})

test('an early round takes topics that wait for their day too', () => {
  const round = buildRound(state, '2026-10-30', { maxUnit: '004', early: true })
  expect(new Set(round.map((i) => i.tag))).toEqual(new Set(['questions_do', 'frequency']))
})

test('put-off speaking tasks come at the end', () => {
  const round = buildRound({ topics: [], deferred: [{ exerciseId: 'u001-s6-e1', unitId: '001', index: 6, at: 1 }] }, '2026-10-30', { maxUnit: '001' })
  expect(round.map((i) => [i.exercise.id, i.deferred])).toEqual([['u001-s6-e1', true]])
})
