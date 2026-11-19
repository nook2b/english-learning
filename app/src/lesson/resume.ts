import type { Step } from './model'
import type { Attempt } from './ExerciseRun'

// An unfinished run of tasks (a session, a review round, a check) survives a
// page reload: after each answer its queue, position and first attempts are
// kept in this browser, and the run picks up from the same task. Finishing
// the run clears it. A convenience only: if storage is unavailable, the run
// simply starts over.

export interface SavedRun {
  steps: Step[]
  /** The task the player is on (its answer not given yet). */
  at: number
  attempts: Attempt[]
  /** Seconds already spent, so time keeps counting from where it stopped. */
  seconds: number
  retries: number
  /** Anything else the caller needs to resume (a review round's plan). */
  extra?: unknown
  savedAt: number
}

const PREFIX = 'english-club:run:'
/** An old unfinished run is not worth resuming. */
const MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000

export function loadRun(key: string): SavedRun | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return undefined
    const run = JSON.parse(raw) as SavedRun
    if (!Array.isArray(run.steps) || run.at >= run.steps.length || Date.now() - run.savedAt > MAX_AGE_MS) return undefined
    return run
  } catch {
    return undefined
  }
}

export function saveRun(key: string, run: Omit<SavedRun, 'savedAt'>): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ ...run, savedAt: Date.now() }))
  } catch {
    // storage full or blocked: the run just won't survive a reload
  }
}

export function clearRun(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // nothing to clear
  }
}

/** A small value kept with a run (a review round's plan), under its own key. */
export function keepWithRun<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key + ':extra', JSON.stringify({ value, savedAt: Date.now() }))
  } catch {
    // not kept: the round will be built again
  }
}

export function keptWithRun<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + key + ':extra')
    if (!raw) return undefined
    const { value, savedAt } = JSON.parse(raw) as { value: T; savedAt: number }
    return Date.now() - savedAt > MAX_AGE_MS ? undefined : value
  } catch {
    return undefined
  }
}

export function forgetWithRun(key: string): void {
  clearRun(key)
  try {
    localStorage.removeItem(PREFIX + key + ':extra')
  } catch {
    // nothing to clear
  }
}
