import { Sprite } from '../../story/Stage'
import type { HeroineId } from '../../story/sprites'

// Full-length route poses live in /assets/map/{heroine}/{pose}.webp. Until a
// pose is drawn, the heroine's regular standing sprite takes its place.
const files = import.meta.glob<string>('../../../../assets/map/**/*.webp', { eager: true, query: '?url', import: 'default' })
const POSES: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace(/^.*assets\/map\//, '').replace(/\.webp$/, ''), url]),
)

/** `fallback`: a close drawn pose to show until this one is drawn. */
export function MapFigure({ heroine, pose, fallback }: { heroine: HeroineId; pose: string; fallback?: string }) {
  const url = POSES[`${heroine}/${pose}`] ?? (fallback ? POSES[`${heroine}/${fallback}`] : undefined)
  return url ? <img className="map-figure" src={url} alt="" draggable={false} /> : <Sprite heroine={heroine} expr="happy" />
}
