import type { Line } from '../content/schema'
import { type HeroineId, isHeroine, secondarySprite } from './sprites'

/** Emotions carry over from line to line until a heroine's next line changes them. */
export function castAt(lines: readonly Line[], upTo: number): Partial<Record<HeroineId, string>> {
  const cast: Partial<Record<HeroineId, string>> = {}
  lines.forEach((l, i) => {
    if (!isHeroine(l.speaker)) return
    if (i <= upTo) cast[l.speaker] = l.expr ?? cast[l.speaker] ?? 'neutral'
    else if (!(l.speaker in cast)) cast[l.speaker] = 'neutral'
  })
  return cast
}

/**
 * The secondary character on screen with the heroines: the one who speaks in
 * these lines (the latest by `upTo`, else the first), with the face of their
 * last line so far. Only when their sprite is drawn.
 */
export function extraAt(lines: readonly Line[], upTo: number): { id: string; expr: string } | undefined {
  const others = lines.map((l, i) => ({ l, i })).filter(({ l }) => !isHeroine(l.speaker) && l.speaker !== 'narrator' && secondarySprite(l.speaker))
  if (others.length === 0) return undefined
  const past = others.filter(({ i }) => i <= upTo)
  const who = (past[past.length - 1] ?? others[0]!).l.speaker
  const mine = past.filter(({ l }) => l.speaker === who)
  return { id: who, expr: mine[mine.length - 1]?.l.expr ?? 'neutral' }
}
