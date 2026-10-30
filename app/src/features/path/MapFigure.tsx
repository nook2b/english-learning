import { Sprite } from '../../story/Stage'
import type { HeroineId } from '../../story/sprites'

// Full-length route poses live in /assets/map/{heroine}/{pose}.webp. Until a
// pose is drawn, the heroine's regular standing sprite takes its place.
const files = import.meta.glob<string>('../../../../assets/map/**/*.webp', { eager: true, query: '?url', import: 'default' })
const POSES: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace(/^.*assets\/map\//, '').replace(/\.webp$/, ''), url]),
)

export function MapFigure({ heroine, pose }: { heroine: HeroineId; pose: string }) {
  const url = POSES[`${heroine}/${pose}`]
  return url ? <img className="map-figure" src={url} alt="" draggable={false} /> : <Sprite heroine={heroine} expr="happy" />
}
