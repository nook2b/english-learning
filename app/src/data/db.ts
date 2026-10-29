import Dexie, { type Table } from 'dexie'

export const DAILY_GOALS = [5, 10, 15, 30, 60] as const
export type DailyGoal = (typeof DAILY_GOALS)[number]

export interface Settings {
  id: 'settings'
  name: string
  dailyGoalMinutes: DailyGoal
  translation: 'tap' | 'always'
  voice: boolean
}

export type UnitStatus = 'done' | 'tested_out'

export interface UnitProgress {
  unitId: string
  status: UnitStatus
  updatedAt: number
}

/** One row per calendar day (local time), keyed as YYYY-MM-DD. */
export interface ActivityDay {
  date: string
  minutes: number
  xp: number
}

export const DEFAULT_SETTINGS: Settings = {
  id: 'settings',
  name: '',
  dailyGoalMinutes: 10,
  translation: 'tap',
  voice: true,
}

export class ClubDB extends Dexie {
  settings!: Table<Settings, 'settings'>
  units!: Table<UnitProgress, string>
  days!: Table<ActivityDay, string>

  constructor(name = 'english-club') {
    super(name)
    this.version(1).stores({
      settings: 'id',
      units: 'unitId, status',
      days: 'date',
    })
  }
}

export const db = new ClubDB()

export async function loadSettings(database: ClubDB = db): Promise<Settings> {
  const stored = await database.settings.get('settings')
  return { ...DEFAULT_SETTINGS, ...stored }
}

export async function saveSettings(patch: Partial<Omit<Settings, 'id'>>, database: ClubDB = db): Promise<Settings> {
  const next = { ...(await loadSettings(database)), ...patch }
  await database.settings.put(next)
  return next
}

export async function setUnitStatus(unitId: string, status: UnitStatus, database: ClubDB = db): Promise<void> {
  await database.units.put({ unitId, status, updatedAt: Date.now() })
}

export async function addActivity(date: string, minutes: number, xp: number, database: ClubDB = db): Promise<ActivityDay> {
  return database.transaction('rw', database.days, async () => {
    const day = (await database.days.get(date)) ?? { date, minutes: 0, xp: 0 }
    const next = { date, minutes: day.minutes + minutes, xp: day.xp + xp }
    await database.days.put(next)
    return next
  })
}

/** Clears progress but keeps settings, so the name and goal survive a reset. */
export async function resetProgress(database: ClubDB = db): Promise<void> {
  await database.transaction('rw', database.units, database.days, async () => {
    await database.units.clear()
    await database.days.clear()
  })
}
