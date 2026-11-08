import { addDays } from './dates'
import type { ActivityDay } from './db'

/**
 * Consecutive days that met their goal, ending today. Each day is held to the
 * goal in force that day (older records without one use the current goal).
 * A today that is not finished yet does not break the streak; it just is not
 * counted. A frozen day (a streak freeze spent on it) keeps the streak going
 * but does not add to it.
 */
export function currentStreak(days: readonly ActivityDay[], goalMinutes: number, today: string, frozen: readonly string[] = []): number {
  const met = new Set(days.filter((d) => d.minutes >= (d.goal ?? goalMinutes)).map((d) => d.date))
  const held = new Set(frozen)
  let cursor = met.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (met.has(cursor) || held.has(cursor)) {
    if (met.has(cursor)) streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}
