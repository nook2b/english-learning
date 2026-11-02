import expressions from '../../../assets/rive/expressions.json'
import looks from '../../../assets/rive/looks.json'
import type { HeroineId } from './sprites'

// Rive heroines (docs/22-rive-brief.md): one .riv per heroine, an artboard per
// pose, and the faces each pose has (assets/rive/expressions.json, from the
// delivered contract). The sprite of the same pose and face shows while the
// animation loads, so nothing jumps: the frames are the same 1024×1536.

const FACES: Record<string, Record<string, readonly string[]>> = expressions

// The Rive runtime needs matchMedia (missing in test DOMs and very old browsers): sprites then.
const canRun = typeof window !== 'undefined' && typeof window.matchMedia === 'function'

/** The heroine has a Rive file with this pose, and the browser can run it. */
export const hasFigure = (heroine: HeroineId, pose = 'stand') => canRun && !!FACES[heroine]?.[pose]

/** The pose draws exactly this face in Rive; other faces stay sprites. */
export const riveHasFace = (heroine: HeroineId, pose: string, expr: string) => !!FACES[heroine]?.[pose]?.includes(expr)

/** Turned versions of a pose (kit brief 28): side of the screen -> faces drawn turned that way. */
const LOOKS: Record<string, Record<string, Partial<Record<'left' | 'right', readonly string[]>>>> = looks

/** The pose can turn to this side of the screen with this face; otherwise she leans instead. */
export const riveCanTurn = (heroine: HeroineId, pose: string, expr: string, side: 'left' | 'right') => !!LOOKS[heroine]?.[pose]?.[side]?.includes(expr)
