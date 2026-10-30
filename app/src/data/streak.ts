import { addDays } from './dates'
import type { ActivityDay } from './db'

/**
 * Consecutive days that met their goal, ending today. Each day is held to the
 * goal in force that day (older records without one use the current goal).
 * A today that is not finished yet does not break the streak; it just is not
 * counted. Streak freezes arrive in stage 6.
 */
export function currentStreak(days: ActivityDay[], goalMinutes: number, today: string): number {
  const met = new Set(days.filter((d) => d.minutes >= (d.goal ?? goalMinutes)).map((d) => d.date))
  let cursor = met.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (met.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}
