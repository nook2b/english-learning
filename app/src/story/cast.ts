import type { Line } from '../content/schema'
import { type HeroineId, isHeroine } from './sprites'

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
