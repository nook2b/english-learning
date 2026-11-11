import { create } from 'zustand'
import {
  type ActivityDay,
  type Mistake,
  type SessionResult,
  type Settings,
  type UnitProgress,
  type UnitStatus,
  type Wallet,
  DEFAULT_SETTINGS,
  EMPTY_WALLET,
  bumpDay,
  loadWallet,
  saveWallet,
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
import { addDays, dayKey } from './dates'
import { AWAY_DAYS, CRYSTALS, FREEZE_PRICE, MAX_FREEZES, type Quest, challengeProgress, challengeTarget, dailyQuests, daysToFreeze, isBackAfterBreak, newMilestone, questDone, questKey, weekStart } from './rewards'
import { currentStreak } from './streak'
import { HEROINES } from '../content/schema'
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

/** A reward screen waiting to be shown (features/rewards/RewardScreen.tsx). */
export type Reward =
  | { kind: 'quest'; heroine: (typeof HEROINES)[number]; quest: Quest }
  | { kind: 'streak'; days: number }
  | { kind: 'welcome'; heroine: (typeof HEROINES)[number]; away: number }
  | { kind: 'challenge_win'; minutes: number; target: number }
  | { kind: 'challenge_next'; minutes: number; target: number }

interface ClubState {
  ready: boolean
  settings: Settings
  units: Record<string, UnitProgress>
  sessions: Record<string, SessionResult>
  days: ActivityDay[]
  flags: Record<string, true>
  /** Topics due for review today plus put-off speaking tasks: the review tab badge. */
  reviewDue: number
  wallet: Wallet
  /** Reward screens to show, oldest first. */
  rewards: Reward[]
  /** Adds to today's quest counters (sessions, cards, phrases said aloud). */
  bump: (counts: Partial<Record<'sessions' | 'perfect' | 'cards' | 'spoken', number>>) => Promise<void>
  /** Pays what today's activity has earned: the goal, quests, a streak milestone, Rei's challenge. */
  settle: () => Promise<void>
  buyFreeze: () => Promise<boolean>
  dismissReward: () => void
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

/** Translations shown at once: the setting, or support mode. */
export const alwaysTranslate = (s: Settings) => s.translation === 'always' || s.support

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
  wallet: EMPTY_WALLET,
  rewards: [],

  init: async () => {
    const [settings, units, sessions, days, flags, wallet] = await Promise.all([loadSettings(), db.units.toArray(), db.sessions.toArray(), db.days.toArray(), db.flags.toArray(), loadWallet()])
    set({
      flags: Object.fromEntries(flags.map((f) => [f.id, true as const])),
      ready: true,
      settings,
      units: Object.fromEntries(units.map((u) => [u.unitId, u])),
      sessions: Object.fromEntries(sessions.map((s) => [s.id, s])),
      days,
      wallet,
      rewards: [],
    })
    // Rewards are extras: a failed write (the database closing) must not break the start.
    await startDay(get, set).catch(() => {})
    await get().refreshReview()
  },

  bump: async (counts) => {
    const day = await bumpDay(dayKey(), counts, get().settings.dailyGoalMinutes)
    set((s) => ({ days: [...s.days.filter((d) => d.date !== day.date), day] }))
  },

  settle: async () => {
    const { days, settings } = get()
    const w = structuredClone(get().wallet)
    const today = dayKey()
    const day = days.find((d) => d.date === today)
    const rewards: Reward[] = []
    if (day && day.minutes >= (day.goal ?? settings.dailyGoalMinutes) && !w.goals.includes(today)) {
      w.goals.push(today)
      w.crystals += CRYSTALS.goal
    }
    dailyQuests(today).forEach((quest, k) => {
      const key = questKey(today, quest)
      if (!questDone(day, quest) || w.quests.includes(key)) return
      w.quests.push(key)
      w.crystals += quest.crystals
      rewards.push({ kind: 'quest', heroine: HEROINES[k % HEROINES.length]!, quest })
    })
    const streak = currentStreak(days, settings.dailyGoalMinutes, today, w.frozen)
    const milestone = newMilestone(streak, today, w.milestones)
    if (milestone) {
      w.milestones.push(milestone.mark)
      rewards.push({ kind: 'streak', days: milestone.milestone })
    }
    if (settings.challenge !== false) {
      const week = weekStart(today)
      const target = challengeTarget(days, today, settings.dailyGoalMinutes)
      const minutes = challengeProgress(days, today)
      if (minutes >= target && !w.challengeWon.includes(week)) {
        w.challengeWon.push(week)
        w.crystals += CRYSTALS.challenge
        rewards.push({ kind: 'challenge_win', minutes, target })
      }
    }
    await saveWallet(w)
    set((s) => ({ wallet: w, rewards: [...s.rewards, ...rewards] }))
  },

  buyFreeze: async () => {
    const w = get().wallet
    if (w.crystals < FREEZE_PRICE || w.freezes >= MAX_FREEZES) return false
    const next = { ...w, crystals: w.crystals - FREEZE_PRICE, freezes: w.freezes + 1 }
    await saveWallet(next)
    set({ wallet: next })
    return true
  },

  dismissReward: () => set((s) => ({ rewards: s.rewards.slice(1) })),

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
    const perfect = total > 0 && correct === total
    await get().bump({ sessions: 1, perfect: perfect ? 1 : 0 })
    const w = { ...get().wallet, crystals: get().wallet.crystals + CRYSTALS.session + (perfect ? CRYSTALS.perfect : 0) }
    await saveWallet(w)
    set({ wallet: w })
    await get().settle()
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
    set({ units: {}, sessions: {}, days: [], flags: {}, reviewDue: 0, wallet: EMPTY_WALLET, rewards: [] })
  },

  resetAll: async () => {
    await resetEverything()
    set({ units: {}, sessions: {}, days: [], flags: {}, settings: DEFAULT_SETTINGS, reviewDue: 0, wallet: EMPTY_WALLET, rewards: [] })
  },

  remember: async (flag) => {
    await db.flags.put({ id: flag, at: Date.now() })
    set((s) => ({ flags: { ...s.flags, [flag]: true } }))
  },
}))

/**
 * Once per app start: spend freezes on missed days, say "welcome back" after a
 * break, show Rei's "next time" for a lost last week, then pay what is due.
 */
async function startDay(get: () => ClubState, set: (p: Partial<ClubState>) => void) {
  const { days, settings } = get()
  const w = structuredClone(get().wallet)
  const today = dayKey()
  const rewards: Reward[] = []
  const freeze = daysToFreeze(days, settings.dailyGoalMinutes, today, w.frozen, w.freezes)
  if (freeze.length) {
    w.frozen.push(...freeze)
    w.freezes -= freeze.length
  }
  if (isBackAfterBreak(days, today) && w.welcomed !== today) {
    w.welcomed = today
    const last = days.filter((d) => d.date < today && d.minutes > 0).map((d) => d.date).sort().pop()!
    const away = Math.round((Date.parse(today) - Date.parse(last)) / 86_400_000)
    rewards.push({ kind: 'welcome', heroine: HEROINES[today.charCodeAt(today.length - 1) % HEROINES.length]!, away: Math.max(away, AWAY_DAYS + 1) })
  }
  if (settings.challenge !== false) {
    const lastWeek = addDays(weekStart(today), -7)
    const minutes = challengeProgress(days, lastWeek)
    const target = challengeTarget(days, lastWeek, settings.dailyGoalMinutes)
    // Only a week the player was around in, and only once.
    if (minutes > 0 && minutes < target && !w.challengeWon.includes(lastWeek) && !w.challengeLost.includes(lastWeek)) {
      w.challengeLost.push(lastWeek)
      rewards.push({ kind: 'challenge_next', minutes, target })
    }
  }
  await saveWallet(w)
  set({ wallet: w, rewards: [...get().rewards, ...rewards] })
  await get().settle()
}
