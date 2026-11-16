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
  return streakRun(days, goalMinutes, today, frozen).length
}

/** The current streak and the day it started on (its first day that met the goal). */
export function streakRun(days: readonly ActivityDay[], goalMinutes: number, today: string, frozen: readonly string[] = []): { length: number; start?: string } {
  const met = new Set(days.filter((d) => d.minutes >= (d.goal ?? goalMinutes)).map((d) => d.date))
  const held = new Set(frozen)
  let cursor = met.has(today) ? today : addDays(today, -1)
  let length = 0
  let start: string | undefined
  while (met.has(cursor) || held.has(cursor)) {
    if (met.has(cursor)) {
      length += 1
      start = cursor
    }
    cursor = addDays(cursor, -1)
  }
  return { length, start }
}
