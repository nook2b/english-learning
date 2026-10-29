import type { TimelineKind } from '../content/schema'

const NOW = 150
const cross = (x: number) => `M${x - 4} 16 L${x + 4} 24 M${x + 4} 16 L${x - 4} 24`

/** Past — now — future line with the action marked on it. */
export function Timeline({ kind }: { kind: TimelineKind }) {
  return (
    <svg className="timeline" viewBox="0 0 240 44" width="240" height="44" aria-hidden="true">
      <line x1="10" y1="20" x2="230" y2="20" className="tl-axis" />
      <line x1={NOW} y1="10" x2={NOW} y2="30" className="tl-now" />
      <text x={NOW} y="42" textAnchor="middle" className="tl-label">
        сейчас
      </text>
      {kind === 'now' && <circle cx={NOW} cy="20" r="6" className="tl-mark" />}
      {kind === 'habit' && <path d={[40, 75, 110, 185, 220].map(cross).join(' ')} className="tl-cross" />}
      {kind === 'schedule' && <path d={[180, 200, 220].map(cross).join(' ')} className="tl-cross" />}
      {kind === 'state' && <rect x="20" y="16" width="200" height="8" rx="4" className="tl-mark" />}
      {kind === 'past_point' && <circle cx="70" cy="20" r="6" className="tl-mark" />}
      {kind === 'past_to_now' && <rect x="60" y="16" width={NOW - 60} height="8" rx="4" className="tl-mark" />}
      {kind === 'future_plan' && <circle cx="205" cy="20" r="6" className="tl-mark" />}
    </svg>
  )
}
