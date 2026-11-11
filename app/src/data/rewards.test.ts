import type { ActivityDay } from './db'
import { challengeTarget, dailyQuests, daysToFreeze, isBackAfterBreak, newMilestone, questDone, weekStart } from './rewards'
import { currentStreak } from './streak'

const day = (date: string, minutes: number, extra: Partial<ActivityDay> = {}): ActivityDay => ({ date, minutes, xp: 0, goal: 10, ...extra })

test('three daily quests, the same all day, one about sessions and two different others', () => {
  const q = dailyQuests('2026-11-08')
  expect(q).toHaveLength(3)
  expect(q[0]!.counter).toBe('sessions')
  expect(new Set(q.map((x) => x.counter)).size).toBe(3)
  expect(dailyQuests('2026-11-08')).toEqual(q)
})

test('a quest is done when its counter reaches the need', () => {
  const quest = { id: 'cards20', title: '', counter: 'cards' as const, need: 20, crystals: 15 }
  expect(questDone(day('2026-11-08', 5, { cards: 19 }), quest)).toBe(false)
  expect(questDone(day('2026-11-08', 5, { cards: 20 }), quest)).toBe(true)
  expect(questDone(undefined, quest)).toBe(false)
})

test("Rei's goal: last week plus 10%, at least three days of the daily goal", () => {
  expect(weekStart('2026-11-08')).toBe('2026-11-02') // Sunday → Monday
  expect(weekStart('2026-11-02')).toBe('2026-11-02')
  const days = [day('2026-10-27', 40), day('2026-10-29', 60)] // last week: 100
  expect(challengeTarget(days, '2026-11-04', 10)).toBe(110)
  expect(challengeTarget([], '2026-11-04', 10)).toBe(30)
})

test('a freeze bridges a missed day and keeps the streak without adding to it', () => {
  const days = [day('2026-11-05', 10), day('2026-11-06', 10)]
  // 07 missed, today is 08
  expect(daysToFreeze(days, 10, '2026-11-08', [], 0)).toEqual([])
  expect(daysToFreeze(days, 10, '2026-11-08', [], 1)).toEqual(['2026-11-07'])
  expect(currentStreak(days, 10, '2026-11-08')).toBe(0)
  expect(currentStreak(days, 10, '2026-11-08', ['2026-11-07'])).toBe(2)
  // two missed days and one freeze: nothing to save
  expect(daysToFreeze(days, 10, '2026-11-09', [], 1)).toEqual([])
  expect(daysToFreeze(days, 10, '2026-11-09', [], 2)).toEqual(['2026-11-07', '2026-11-08'])
  // no streak behind the gap
  expect(daysToFreeze([], 10, '2026-11-08', [], 2)).toEqual([])
})

test('a streak milestone shows once per streak', () => {
  expect(newMilestone(2, '2026-11-08', [])).toBeUndefined()
  const m = newMilestone(7, '2026-11-08', [])!
  expect(m.milestone).toBe(7)
  expect(newMilestone(7, '2026-11-08', [m.mark])).toBeUndefined()
  expect(newMilestone(8, '2026-11-09', [m.mark])).toBeUndefined()
})

test('welcome back after more than three days away', () => {
  expect(isBackAfterBreak([day('2026-11-04', 10)], '2026-11-08')).toBe(true)
  expect(isBackAfterBreak([day('2026-11-05', 10)], '2026-11-08')).toBe(false)
  expect(isBackAfterBreak([], '2026-11-08')).toBe(false)
})
