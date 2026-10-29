import type { Speaker } from '../content/schema'

// Sprite lookup and fallbacks, as specified in docs/10-sprites.md.
// Files live in /assets/characters/{heroine}/{outfit}/{pose}/{expr}.webp.

const files = import.meta.glob<string>('../../../assets/characters/**/*.webp', { eager: true, query: '?url', import: 'default' })

/** "rei/base/recorder/smirk" → URL */
export const SPRITES: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace(/^.*assets\/characters\//, '').replace(/\.webp$/, ''), url]),
)

export const HEROINE_IDS = ['mika', 'rei', 'iris'] as const
export type HeroineId = (typeof HEROINE_IDS)[number]

export const isHeroine = (s: Speaker): s is HeroineId => (HEROINE_IDS as readonly string[]).includes(s)

/** Closest drawn emotion when the requested one is missing (docs/10-sprites.md, section 7). */
export const SIMILAR: Record<string, string> = {
  listening: 'neutral',
  focused: 'thinking',
  worried: 'thinking',
  excited: 'happy',
  laugh: 'happy',
  sad: 'thinking',
  blush: 'embarrassed',
  tender: 'happy',
  teary: 'sad',
  forced_smile: 'happy',
  pout: 'annoyed',
  smirk: 'happy',
  deadpan: 'neutral',
  guarded: 'annoyed',
  dry_smile: 'happy',
  skeptical: 'thinking',
  guilty: 'embarrassed',
  playful: 'laugh',
}

export interface SpriteRef {
  heroine: HeroineId
  outfit: string
  pose: string
  expr: string
}

/** Content writes "smirk" or "recorder/smirk"; the pose defaults to stand. */
export function parseExpr(heroine: HeroineId, value = 'neutral', outfit = 'base'): SpriteRef {
  const [a, b] = value.split('/')
  return b ? { heroine, outfit, pose: a!, expr: b } : { heroine, outfit, pose: 'stand', expr: a! }
}

/** Never switches outfit while the outfit has any sprite: first a similar face, then the stand pose. */
export function resolveSprite(ref: SpriteRef, sprites: Record<string, string> = SPRITES): { key: string; url: string; exact: boolean } | undefined {
  const { heroine, pose, expr } = ref
  const similar = (e: string) => {
    const chain = [e]
    let next = SIMILAR[e]
    while (next && !chain.includes(next)) {
      chain.push(next)
      next = SIMILAR[next]
    }
    return chain
  }
  const outfits = [ref.outfit, ...(ref.outfit === 'base' ? [] : ['base'])]
  for (const outfit of outfits) {
    const tries = [...similar(expr).map((e) => [pose, e]), ...similar(expr).map((e) => ['stand', e]), ['stand', 'neutral']]
    for (const [p, e] of tries) {
      const key = `${heroine}/${outfit}/${p}/${e}`
      if (sprites[key]) return { key, url: sprites[key]!, exact: p === pose && e === expr && outfit === ref.outfit }
    }
  }
  return undefined
}
