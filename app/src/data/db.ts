import Dexie, { type Table } from 'dexie'

export const DAILY_GOALS = [5, 10, 15, 30, 60] as const
export type DailyGoal = (typeof DAILY_GOALS)[number]

export interface Settings {
  id: 'settings'
  name: string
  dailyGoalMinutes: DailyGoal
  translation: 'tap' | 'always'
  voice: boolean
  /** Testing aid: every session of every written unit is open. */
  unlockAll: boolean
  /** Short sounds for right and wrong answers. */
  sounds: boolean
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
  /** The daily goal in force that day, so a later change of goal does not rewrite past days. */
  goal?: number
}

/** One finished session of a unit; id is `${unitId}-${index}`, index 1–8. */
export interface SessionResult {
  id: string
  unitId: string
  index: number
  correct: number
  total: number
  seconds: number
  completedAt: number
}

/** A wrong answer, kept for the review deck (stage 4) and error stats by tag. */
export interface Mistake {
  id?: number
  exerciseId: string
  tags: string[]
  given: string
  expected: string
  at: number
}

/** A speaking task put off with "can't speak now"; it comes back in review (stage 4). */
export interface Deferred {
  exerciseId: string
  unitId: string
  index: number
  at: number
  /** Set when the task is done later. */
  doneAt?: number
}

/** A remembered story choice, e.g. which question the player asked in a scene. */
export interface StoryFlag {
  id: string
  at: number
}

/** A word the player tapped for its translation; the review deck (stage 4) starts from these. */
export interface WordLookup {
  word: string
  count: number
  lastAt: number
}

export const sessionId = (unitId: string, index: number) => `${unitId}-${index}`

export const DEFAULT_SETTINGS: Settings = {
  id: 'settings',
  name: '',
  dailyGoalMinutes: 10,
  translation: 'tap',
  voice: true,
  unlockAll: false,
  sounds: true,
}

export class ClubDB extends Dexie {
  settings!: Table<Settings, 'settings'>
  units!: Table<UnitProgress, string>
  days!: Table<ActivityDay, string>
  sessions!: Table<SessionResult, string>
  mistakes!: Table<Mistake, number>
  flags!: Table<StoryFlag, string>
  lookups!: Table<WordLookup, string>
  deferred!: Table<Deferred, string>

  constructor(name = 'english-club') {
    super(name)
    this.version(1).stores({
      settings: 'id',
      units: 'unitId, status',
      days: 'date',
    })
    this.version(2).stores({
      sessions: 'id, unitId',
      mistakes: '++id, exerciseId, *tags, at',
    })
    this.version(3).stores({ flags: 'id' })
    this.version(4).stores({ lookups: 'word, lastAt' })
    this.version(5).stores({ deferred: 'exerciseId, at' })
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

export async function addActivity(date: string, minutes: number, xp: number, goal: number, database: ClubDB = db): Promise<ActivityDay> {
  return database.transaction('rw', database.days, async () => {
    const day = (await database.days.get(date)) ?? { date, minutes: 0, xp: 0 }
    const next = { date, minutes: day.minutes + minutes, xp: day.xp + xp, goal }
    await database.days.put(next)
    return next
  })
}

export async function saveSessionResult(result: SessionResult, database: ClubDB = db): Promise<void> {
  await database.sessions.put(result)
}

/** Today's record follows a change of goal; past days keep theirs. */
export async function setDayGoal(date: string, goal: number, database: ClubDB = db): Promise<ActivityDay | undefined> {
  const day = await database.days.get(date)
  if (!day) return undefined
  const next = { ...day, goal }
  await database.days.put(next)
  return next
}

export async function addDeferred(d: Omit<Deferred, 'at'>, database: ClubDB = db): Promise<void> {
  await database.deferred.put({ ...d, at: Date.now() })
}

export async function addMistake(mistake: Omit<Mistake, 'id'>, database: ClubDB = db): Promise<void> {
  await database.mistakes.add(mistake)
}

/** Clears progress but keeps settings, so the name and goal survive a reset. */
export async function resetProgress(database: ClubDB = db): Promise<void> {
  await database.transaction('rw', [database.units, database.days, database.sessions, database.mistakes, database.flags, database.lookups, database.deferred], async () => {
    await Promise.all([database.units.clear(), database.days.clear(), database.sessions.clear(), database.mistakes.clear(), database.flags.clear(), database.lookups.clear(), database.deferred.clear()])
  })
}

/** Full reset for testing: progress and settings. */
export async function resetEverything(database: ClubDB = db): Promise<void> {
  await resetProgress(database)
  await database.settings.clear()
}

export async function logLookup(word: string, database: ClubDB = db): Promise<void> {
  await database.transaction('rw', database.lookups, async () => {
    const row = await database.lookups.get(word)
    await database.lookups.put({ word, count: (row?.count ?? 0) + 1, lastAt: Date.now() })
  })
}
