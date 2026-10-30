import { currentStreak } from './streak'

const day = (date: string, minutes: number) => ({ date, minutes, xp: 0 })

test('counts consecutive days that met the goal', () => {
  const days = [day('2026-10-27', 10), day('2026-10-28', 12), day('2026-10-29', 10)]
  expect(currentStreak(days, 10, '2026-10-29')).toBe(3)
})

test('unfinished today does not break the streak', () => {
  const days = [day('2026-10-27', 10), day('2026-10-28', 10), day('2026-10-29', 3)]
  expect(currentStreak(days, 10, '2026-10-29')).toBe(2)
})

test('a missed day ends the streak', () => {
  const days = [day('2026-10-26', 10), day('2026-10-28', 10)]
  expect(currentStreak(days, 10, '2026-10-29')).toBe(1)
})

test('crosses month boundaries', () => {
  const days = [day('2026-10-31', 5), day('2026-11-01', 5)]
  expect(currentStreak(days, 5, '2026-11-01')).toBe(2)
})

test('each day is held to the goal it had; raising the goal later does not break the streak', () => {
  const days = [
    { date: '2026-10-27', minutes: 10, xp: 0, goal: 10 },
    { date: '2026-10-28', minutes: 10, xp: 0, goal: 10 },
    { date: '2026-10-29', minutes: 30, xp: 0, goal: 30 },
  ]
  expect(currentStreak(days, 30, '2026-10-29')).toBe(3)
})
