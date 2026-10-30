import type { SessionResult } from '../data/db'
import { sessionId } from '../data/db'
import { ARC1_UNITS } from './outline'
import { Unit } from './schema'
import { PLACEMENT_FLAG, PROLOGUE_FLAG } from './story'

const files = import.meta.glob<unknown>('../../../content/course/**/unit-*.json', { eager: true, import: 'default' })

/** Parses every unit file; a broken file fails loudly here and in content.test.ts. */
export function parseUnits(raw: Record<string, unknown>): Record<string, Unit> {
  const units: Record<string, Unit> = {}
  for (const [path, data] of Object.entries(raw)) {
    const parsed = Unit.safeParse(data)
    if (!parsed.success) throw new Error(`${path}: ${parsed.error.message}`)
    units[parsed.data.id] = parsed.data
  }
  return units
}

export const UNITS = parseUnits(files)

export function getUnit(id: string): Unit | undefined {
  return UNITS[id]
}

export interface SessionRef {
  unitId: string
  index: number
}

/** The first unfinished session, in course order, among units that have content. */
export function nextSession(sessions: Record<string, SessionResult>, done: Record<string, unknown>): SessionRef | undefined {
  for (const outline of ARC1_UNITS) {
    const unit = UNITS[outline.id]
    if (!unit || done[unit.id]) continue
    for (let i = 1; i <= unit.sessions.length; i++) {
      if (!sessions[sessionId(unit.id, i)]) return { unitId: unit.id, index: i }
    }
  }
  return undefined
}

/**
 * A session can be played when it is the next one, was played before, or the
 * testing switch "open everything" is on. A locked unit stays locked from the
 * route, the unit page and a direct link alike. Story gates: a new player
 * meets the heroines (prologue) and takes the placement check before unit
 * 001; a session after a story invitation waits until it is accepted.
 */
export function isSessionOpen(
  ref: SessionRef,
  sessions: Record<string, SessionResult>,
  done: Record<string, unknown>,
  unlockAll: boolean,
  flags: Record<string, unknown> = {},
): boolean {
  if (unlockAll || sessions[sessionId(ref.unitId, ref.index)]) return true
  const next = nextSession(sessions, done)
  if (next?.unitId !== ref.unitId || next.index !== ref.index) return false
  // Progress from before the prologue existed is kept as it is (no forced introduction over it).
  const newPlayer = Object.keys(sessions).length === 0
  if (newPlayer && !(flags[PROLOGUE_FLAG] && flags[PLACEMENT_FLAG])) return false
  const invite = UNITS[ref.unitId]?.sessions[ref.index - 2]?.invite
  return !invite || !!flags[invite.flag]
}
