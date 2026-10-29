import { create } from 'zustand'
import {
  type ActivityDay,
  type Settings,
  type UnitProgress,
  type UnitStatus,
  DEFAULT_SETTINGS,
  addActivity,
  db,
  loadSettings,
  resetProgress,
  saveSettings,
  setUnitStatus,
} from './db'
import { dayKey } from './dates'

interface ClubState {
  ready: boolean
  settings: Settings
  units: Record<string, UnitProgress>
  days: ActivityDay[]
  init: () => Promise<void>
  updateSettings: (patch: Partial<Omit<Settings, 'id'>>) => Promise<void>
  recordSession: (minutes: number, xp: number) => Promise<void>
  markUnit: (unitId: string, status: UnitStatus) => Promise<void>
  reset: () => Promise<void>
}

export const useClub = create<ClubState>((set) => ({
  ready: false,
  settings: DEFAULT_SETTINGS,
  units: {},
  days: [],

  init: async () => {
    const [settings, units, days] = await Promise.all([loadSettings(), db.units.toArray(), db.days.toArray()])
    set({
      ready: true,
      settings,
      units: Object.fromEntries(units.map((u) => [u.unitId, u])),
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

  markUnit: async (unitId, status) => {
    await setUnitStatus(unitId, status)
    set((s) => ({ units: { ...s.units, [unitId]: { unitId, status, updatedAt: Date.now() } } }))
  },

  reset: async () => {
    await resetProgress()
    set({ units: {}, days: [] })
  },
}))
