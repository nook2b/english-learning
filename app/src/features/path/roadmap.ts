import type { Session, Unit } from '../../content/schema'
import { HEROINE_IDS, type HeroineId } from '../../story/sprites'

// Path map helpers: what each stop looks like and who stands by the unit.

export function stopIcon(s: Session): string {
  if (s.role === 'mission') return '★'
  if (s.role === 'check') return '🏆'
  return { comprehension: '📖', form: '✏️', production: '💬', fluency: '⚡' }[s.kind]
}

/** The snake: each stop shifts sideways, in steps of the stop width. */
const SNAKE = [0, 0.8, 1.2, 0.8, 0, -0.8, -1.2, -0.8]
export const snakeOffset = (i: number) => SNAKE[i % SNAKE.length]!

/** The heroine who speaks most in a unit's story beats stands by it on the map. */
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
