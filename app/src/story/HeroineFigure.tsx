import { lazy, Suspense } from 'react'
import { useMouth } from '../speech/mouth'
import { useReducedMotion } from './motion'
import type { HeroineId } from './sprites'

// Rive heroines (docs/22-rive-brief.md), laid over a sprite frame (story/Stage.tsx).
// The sprite shows until the animation is ready and stays when it fails to
// load or the pose has no such face. With "reduce motion" she does not breathe or blink, but her
// face and mouth still change.

const RiveHeroine = lazy(() => import('./RiveHeroine'))

/** The Rive canvas over a sprite frame or a figure box; `visible` hides it while the pose has no such face. */
export function RiveFigure({
  heroine,
  pose,
  expression,
  visible = true,
  lean = 0,
  mark,
  onReady,
  onFail,
}: {
  heroine: HeroineId
  pose: string
  expression: string
  visible?: boolean
  lean?: number
  mark?: string
  onReady: () => void
  onFail: () => void
}) {
  const reduced = useReducedMotion()
  const talking = !!useMouth(heroine)
  return (
    <Suspense fallback={null}>
      <div className="rive-layer" style={visible ? undefined : { visibility: 'hidden' }}>
        <RiveHeroine key={`${heroine}:${pose}`} heroine={heroine} pose={pose} expression={expression} talking={talking} motion={!reduced} lean={lean} mark={mark} onReady={onReady} onFail={onFail} />
      </div>
    </Suspense>
  )
}
