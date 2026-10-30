import { ClubDB } from './db'
import { afterRound, loadReview, noteTopics, reopen, saveRound } from './review'

let database: ClubDB
beforeEach(async () => {
  database = new ClubDB(`review-${Math.random()}`)
  await database.open()
})

test('a topic is worked through on three separate days: now, a day later, three days later', () => {
  let t = reopen(undefined, 'questions_do', 1, '2026-10-30')
  expect(t).toMatchObject({ step: 0, due: '2026-10-30' })
  t = afterRound(t, true, '2026-10-30', 2)
  expect(t).toMatchObject({ step: 1, due: '2026-10-31' })
  t = afterRound(t, true, '2026-10-31', 3)
  expect(t).toMatchObject({ step: 2, due: '2026-11-03' })
  t = afterRound(t, true, '2026-11-03', 4)
  expect(t.clearedAt).toBe(4)
})

test('a slip starts the topic over from tomorrow; an early clean round does not move it on', () => {
  const t = { tag: 'frequency', step: 1 as const, due: '2026-11-02', since: 1 }
  expect(afterRound(t, false, '2026-10-30', 5)).toMatchObject({ step: 0, due: '2026-10-31' })
  expect(afterRound(t, true, '2026-10-30', 5, true)).toEqual(t)
})

test('mistakes reopen their topics (not skills) and are counted per topic', async () => {
  await database.mistakes.add({ exerciseId: 'a', tags: ['questions_do', 'speaking'], given: '', expected: 'x', at: 10 })
  await noteTopics(['questions_do', 'speaking'], 10, '2026-10-30', database)
  await database.mistakes.add({ exerciseId: 'b', tags: ['questions_do'], given: '', expected: 'y', at: 20 })
  await noteTopics(['questions_do'], 20, '2026-10-30', database)
  const state = await loadReview(database)
  expect(state.topics.map((t) => [t.tag, t.mistakes.length])).toEqual([['questions_do', 2]])
})

test('a round moves clean topics on, sends slipped ones back, and marks spoken tasks done', async () => {
  await noteTopics(['questions_do', 'frequency'], 1, '2026-10-30', database)
  await database.deferred.put({ exerciseId: 's1', unitId: '001', index: 6, at: 1 })
  await saveRound(
    [
      { exerciseId: 'p1', tag: 'questions_do', correct: true },
      { exerciseId: 'p2', tag: 'frequency', correct: false },
      { exerciseId: 's1', deferred: true, correct: true },
    ],
    '2026-10-30',
    false,
    database,
  )
  expect(await database.topics.get('questions_do')).toMatchObject({ step: 1, due: '2026-10-31' })
  expect(await database.topics.get('frequency')).toMatchObject({ step: 0, due: '2026-10-31' })
  expect((await database.deferred.get('s1'))?.doneAt).toBeTruthy()
})
