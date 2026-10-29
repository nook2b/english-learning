import type { SessionResult } from '../data/db'
import { sessionId } from '../data/db'
import { ARC1_UNITS } from './outline'
import { Unit } from './schema'

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
