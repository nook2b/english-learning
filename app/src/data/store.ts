import { create } from 'zustand'
import {
  type ActivityDay,
  type Mistake,
  type SessionResult,
  type Settings,
  type UnitProgress,
  type UnitStatus,
  DEFAULT_SETTINGS,
  addActivity,
  addMistake,
  db,
  loadSettings,
  resetEverything,
  resetProgress,
  saveSessionResult,
  saveSettings,
  setDayGoal,
  sessionId,
  setUnitStatus,
} from './db'
import { dayKey } from './dates'
import { dueCount, loadReview, noteTopics } from './review'
import { SESSIONS_PER_UNIT } from '../content/schema'

export const SESSION_XP = 10
export const PERFECT_BONUS_XP = 5
/** Time spent away from the app should not count; one session never adds more than this. */
export const MAX_SESSION_SECONDS = 20 * 60

export interface FinishedSession {
  unitId: string
  index: number
  correct: number
  total: number
  seconds: number
}

interface ClubState {
  ready: boolean
  settings: Settings
  units: Record<string, UnitProgress>
  sessions: Record<string, SessionResult>
  days: ActivityDay[]
  flags: Record<string, true>
  /** Topics due for review today plus put-off speaking tasks: the review tab badge. */
  reviewDue: number
  init: () => Promise<void>
  /** Saves a wrong first answer and reopens its topics for review. */
  noteMistake: (m: Omit<Mistake, 'id'>) => Promise<void>
  refreshReview: () => Promise<void>
  updateSettings: (patch: Partial<Omit<Settings, 'id'>>) => Promise<void>
  recordSession: (minutes: number, xp: number) => Promise<void>
  finishSession: (s: FinishedSession) => Promise<{ minutes: number; xp: number; unitCompleted: boolean }>
  markUnit: (unitId: string, status: UnitStatus) => Promise<void>
  reset: () => Promise<void>
  resetAll: () => Promise<void>
  remember: (flag: string) => Promise<void>
}

export function sessionsDone(sessions: Record<string, SessionResult>, unitId: string): number {
  let n = 0
  for (let i = 1; i <= SESSIONS_PER_UNIT; i++) if (sessions[sessionId(unitId, i)]) n++
  return n
}

export const useClub = create<ClubState>((set, get) => ({
  ready: false,
  settings: DEFAULT_SETTINGS,
  units: {},
  sessions: {},
  days: [],
  flags: {},
  reviewDue: 0,

  init: async () => {
    const [settings, units, sessions, days, flags] = await Promise.all([loadSettings(), db.units.toArray(), db.sessions.toArray(), db.days.toArray(), db.flags.toArray()])
    set({
      flags: Object.fromEntries(flags.map((f) => [f.id, true as const])),
      ready: true,
      settings,
      units: Object.fromEntries(units.map((u) => [u.unitId, u])),
      sessions: Object.fromEntries(sessions.map((s) => [s.id, s])),
      days,
    })
    await get().refreshReview()
  },

  noteMistake: async (m) => {
    await addMistake(m)
    await noteTopics(m.tags, m.at, dayKey())
    await get().refreshReview()
  },

  refreshReview: async () => {
    // Only a badge: a failed read (database closing) must not break anything.
    const state = await loadReview().catch(() => undefined)
    if (state) set({ reviewDue: dueCount(state, dayKey()) })
  },

  updateSettings: async (patch) => {
    const settings = await saveSettings(patch)
    set({ settings })
    if (patch.dailyGoalMinutes) {
      const day = await setDayGoal(dayKey(), patch.dailyGoalMinutes)
      if (day) set((s) => ({ days: [...s.days.filter((d) => d.date !== day.date), day] }))
    }
  },

  recordSession: async (minutes, xp) => {
    const day = await addActivity(dayKey(), minutes, xp, get().settings.dailyGoalMinutes)
    set((s) => ({ days: [...s.days.filter((d) => d.date !== day.date), day] }))
  },

  finishSession: async ({ unitId, index, correct, total, seconds }) => {
    const capped = Math.min(seconds, MAX_SESSION_SECONDS)
    const minutes = Math.max(1, Math.round(capped / 60))
    // A session where every task was put off is not "no mistakes".
    const xp = SESSION_XP + (total > 0 && correct === total ? PERFECT_BONUS_XP : 0)
    const result: SessionResult = { id: sessionId(unitId, index), unitId, index, correct, total, seconds: capped, completedAt: Date.now() }
    await saveSessionResult(result)
    set((s) => ({ sessions: { ...s.sessions, [result.id]: result } }))
    await get().recordSession(minutes, xp)
    const unitCompleted = sessionsDone(get().sessions, unitId) === SESSIONS_PER_UNIT && !get().units[unitId]
    if (unitCompleted) await get().markUnit(unitId, 'done')
    return { minutes, xp, unitCompleted }
  },

  markUnit: async (unitId, status) => {
    await setUnitStatus(unitId, status)
    set((s) => ({ units: { ...s.units, [unitId]: { unitId, status, updatedAt: Date.now() } } }))
  },

  reset: async () => {
    await resetProgress()
    set({ units: {}, sessions: {}, days: [], flags: {}, reviewDue: 0 })
  },

  resetAll: async () => {
    await resetEverything()
    set({ units: {}, sessions: {}, days: [], flags: {}, settings: DEFAULT_SETTINGS, reviewDue: 0 })
  },

  remember: async (flag) => {
    await db.flags.put({ id: flag, at: Date.now() })
    set((s) => ({ flags: { ...s.flags, [flag]: true } }))
  },
}))
