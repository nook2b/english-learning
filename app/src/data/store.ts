import { create } from 'zustand'
import {
  type ActivityDay,
  type SessionResult,
  type Settings,
  type UnitProgress,
  type UnitStatus,
  DEFAULT_SETTINGS,
  addActivity,
  db,
  loadSettings,
  resetProgress,
  saveSessionResult,
  saveSettings,
  sessionId,
  setUnitStatus,
} from './db'
import { dayKey } from './dates'

export const SESSIONS_PER_UNIT = 8
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
  init: () => Promise<void>
  updateSettings: (patch: Partial<Omit<Settings, 'id'>>) => Promise<void>
  recordSession: (minutes: number, xp: number) => Promise<void>
  finishSession: (s: FinishedSession) => Promise<{ minutes: number; xp: number }>
  markUnit: (unitId: string, status: UnitStatus) => Promise<void>
  reset: () => Promise<void>
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

  init: async () => {
    const [settings, units, sessions, days] = await Promise.all([loadSettings(), db.units.toArray(), db.sessions.toArray(), db.days.toArray()])
    set({
      ready: true,
      settings,
      units: Object.fromEntries(units.map((u) => [u.unitId, u])),
      sessions: Object.fromEntries(sessions.map((s) => [s.id, s])),
      days,
    })
  },

  updateSettings: async (patch) => {
    const settings = await saveSettings(patch)
    set({ settings })
  },

  recordSession: async (minutes, xp) => {
    const day = await addActivity(dayKey(), minutes, xp)
    set((s) => ({ days: [...s.days.filter((d) => d.date !== day.date), day] }))
  },

  finishSession: async ({ unitId, index, correct, total, seconds }) => {
    const capped = Math.min(seconds, MAX_SESSION_SECONDS)
    const minutes = Math.max(1, Math.round(capped / 60))
    const xp = SESSION_XP + (correct === total ? PERFECT_BONUS_XP : 0)
    const result: SessionResult = { id: sessionId(unitId, index), unitId, index, correct, total, seconds: capped, completedAt: Date.now() }
    await saveSessionResult(result)
    set((s) => ({ sessions: { ...s.sessions, [result.id]: result } }))
    await get().recordSession(minutes, xp)
    if (sessionsDone(get().sessions, unitId) === SESSIONS_PER_UNIT && !get().units[unitId]) {
      await get().markUnit(unitId, 'done')
    }
    return { minutes, xp }
  },

  markUnit: async (unitId, status) => {
    await setUnitStatus(unitId, status)
    set((s) => ({ units: { ...s.units, [unitId]: { unitId, status, updatedAt: Date.now() } } }))
  },

  reset: async () => {
    await resetProgress()
    set({ units: {}, sessions: {}, days: [] })
  },
}))
