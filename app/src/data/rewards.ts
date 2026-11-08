import { addDays, daysBetween } from './dates'
import type { ActivityDay } from './db'

// Gamification, docs/00-full-plan.md section 3.9: crystals, daily quests,
// Rei's weekly challenge, streak freezes and milestones, "welcome back".
// Pure rules here; the store keeps the wallet and queues the reward screens.

export const CRYSTALS = { session: 5, perfect: 5, goal: 10, challenge: 50 } as const
export const FREEZE_PRICE = 50
export const MAX_FREEZES = 2
export const STREAK_MILESTONES = [3, 7, 14, 30, 100] as const
/** Days away after which the app says "welcome back". */
export const AWAY_DAYS = 3

/** What the day's quests count; kept on the day's record. */
export type DayCounter = 'sessions' | 'perfect' | 'cards' | 'spoken'

export interface Quest {
  id: string
  title: string
  counter: DayCounter
  need: number
  crystals: number
}

export const QUESTS: readonly Quest[] = [
  { id: 'sessions2', title: 'Пройди 2 занятия', counter: 'sessions', need: 2, crystals: 15 },
  { id: 'session1', title: 'Пройди занятие', counter: 'sessions', need: 1, crystals: 10 },
  { id: 'perfect1', title: 'Пройди занятие без ошибок', counter: 'perfect', need: 1, crystals: 15 },
  { id: 'cards20', title: 'Повтори 20 карточек', counter: 'cards', need: 20, crystals: 15 },
  { id: 'cards10', title: 'Повтори 10 карточек', counter: 'cards', need: 10, crystals: 10 },
  { id: 'spoken3', title: 'Скажи 3 фразы в микрофон', counter: 'spoken', need: 3, crystals: 15 },
]

/** Three quests a day, the same all day: one about sessions, the other two from the rest. */
export function dailyQuests(date: string): Quest[] {
  let h = 0
  for (const ch of date) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const sessions = QUESTS.filter((q) => q.counter === 'sessions')
  const rest = QUESTS.filter((q) => q.counter !== 'sessions')
  const first = sessions[h % sessions.length]!
  const others: Quest[] = []
  // Two different counters, so a day is not "10 cards" and "20 cards".
  for (let k = 0; others.length < 2 && k < rest.length * 2; k++) {
    const q = rest[(h + k * 7) % rest.length]!
    if (!others.some((o) => o.counter === q.counter)) others.push(q)
  }
  return [first, ...others]
}

export const questKey = (date: string, quest: Quest) => `${date}:${quest.id}`
export const questDone = (day: ActivityDay | undefined, quest: Quest) => (day?.[quest.counter] ?? 0) >= quest.need

/** Monday of the week of this date (YYYY-MM-DD). */
export function weekStart(date: string): string {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number]
  const weekday = (new Date(y, m - 1, d).getDay() + 6) % 7
  return addDays(date, -weekday)
}

const minutesIn = (days: readonly ActivityDay[], from: string, to: string) => days.filter((d) => d.date >= from && d.date <= to).reduce((n, d) => n + d.minutes, 0)

/**
 * Rei's goal for the week of `date`, in minutes: last week's total plus 10%,
 * but never below three days of the daily goal (a first week, a week off).
 */
export function challengeTarget(days: readonly ActivityDay[], date: string, dailyGoal: number): number {
  const start = weekStart(date)
  const last = minutesIn(days, addDays(start, -7), addDays(start, -1))
  return Math.max(Math.ceil((last * 11) / 10), dailyGoal * 3)
}

export function challengeProgress(days: readonly ActivityDay[], date: string): number {
  const start = weekStart(date)
  return minutesIn(days, start, addDays(start, 6))
}

const metGoal = (d: ActivityDay | undefined, goal: number) => !!d && d.minutes >= (d.goal ?? goal)

/**
 * Freezes bridge missed days right before today, oldest first, while the streak
 * behind them is alive. Returns the days to freeze now (at most `freezes`).
 * Today itself is never frozen: it is not over.
 */
export function daysToFreeze(days: readonly ActivityDay[], goal: number, today: string, frozen: readonly string[], freezes: number): string[] {
  if (freezes <= 0) return []
  const byDate = new Map(days.map((d) => [d.date, d]))
  const ok = (date: string) => metGoal(byDate.get(date), goal) || frozen.includes(date)
  const missed: string[] = []
  let cursor = addDays(today, -1)
  while (!ok(cursor) && missed.length <= freezes) {
    missed.push(cursor)
    cursor = addDays(cursor, -1)
  }
  // Nothing missed, more missed days than freezes, or no streak behind them: nothing to save.
  if (missed.length === 0 || missed.length > freezes || !ok(cursor)) return []
  return missed.reverse()
}

/** The streak milestone reached today, if any; `shown` holds "milestone:streak start" marks. */
export function newMilestone(streak: number, today: string, shown: readonly string[]): { milestone: number; mark: string } | undefined {
  const milestone = [...STREAK_MILESTONES].reverse().find((m) => streak >= m)
  if (!milestone) return undefined
  const mark = `${milestone}:${addDays(today, -(streak - 1))}`
  return shown.includes(mark) ? undefined : { milestone, mark }
}

/** Whether the player is back after a break: the last active day was `AWAY_DAYS` or more ago. */
export function isBackAfterBreak(days: readonly ActivityDay[], today: string): boolean {
  const before = days.filter((d) => d.date < today && d.minutes > 0).map((d) => d.date).sort()
  const last = before[before.length - 1]
  return !!last && daysBetween(last, today) > AWAY_DAYS
}
