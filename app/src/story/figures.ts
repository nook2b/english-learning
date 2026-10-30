import type { HeroineId } from './sprites'

// Still pictures of the Rive figures (assets/rive/{heroine}.webp): shown while
// the animation loads and when motion is reduced.
const files = import.meta.glob<string>('../../../assets/rive/*.webp', { eager: true, query: '?url', import: 'default' })
export const STILL: Record<string, string> = Object.fromEntries(Object.entries(files).map(([p, url]) => [p.replace(/^.*\//, '').replace(/\.webp$/, ''), url]))

export const hasFigure = (heroine: HeroineId) => !!STILL[heroine]
