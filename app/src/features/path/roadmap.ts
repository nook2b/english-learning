import { UNITS } from '../../content/course'
import { ARC1_UNITS } from '../../content/outline'
import type { Session, Unit } from '../../content/schema'
import { HEROINE_IDS, type HeroineId } from '../../story/sprites'

// Path route helpers: what each station looks like and who stands by the unit.

export function stopIcon(s: Session): string {
  if (s.role === 'mission') return '★'
  if (s.role === 'check') return '🏆'
  return { comprehension: '📖', form: '✏️', production: '💬', fluency: '⚡' }[s.kind]
}

/** The heroine who speaks most in a unit's story beats stands by it on the route. */
export function unitHeroine(unit: Unit): HeroineId {
  const count: Record<string, number> = {}
  const walk = (o: unknown): void => {
    if (Array.isArray(o)) return o.forEach(walk)
    if (!o || typeof o !== 'object') return
    const r = o as Record<string, unknown>
    if (typeof r.speaker === 'string' && typeof r.text === 'string') count[r.speaker] = (count[r.speaker] ?? 0) + 1
    Object.values(r).forEach(walk)
  }
  walk(unit.sessions)
  return [...HEROINE_IDS].sort((a, b) => (count[b] ?? 0) - (count[a] ?? 0))[0]!
}

/** Full-length route poses, see docs/18-map-sprites-brief.md. */
export const MAP_POSES: Record<HeroineId, readonly string[]> = {
  mika: ['wave_mic', 'clipboard_run', 'phone_show', 'lunch_bags'],
  rei: ['recorder_crouch', 'headphones_listen', 'cable_coil', 'mic_stand'],
  iris: ['book_walk', 'timetable_point', 'notebook_write', 'books_sit'],
}

/** Each unit's heroine takes her poses in turn along the course, so neighbours differ. */
export function mapFigure(unit: Unit): { heroine: HeroineId; pose: string } {
  const heroine = unitHeroine(unit)
  const before = ARC1_UNITS.findIndex((u) => u.id === unit.id)
  const turn = ARC1_UNITS.slice(0, Math.max(before, 0)).filter((u) => UNITS[u.id] && unitHeroine(UNITS[u.id]!) === heroine).length
  const poses = MAP_POSES[heroine]
  return { heroine, pose: poses[turn % poses.length]! }
}
