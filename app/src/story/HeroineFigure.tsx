import { lazy, Suspense, useEffect, useState } from 'react'
import { STILL } from './figures'
import type { HeroineId } from './sprites'

// A heroine at full length with her Rive idle animation (docs/22-rive-brief.md).
// The still picture shows first and stays when motion is reduced, the
// animation fails to load or there is no Rive file for her.

const RiveHeroine = lazy(() => import('./RiveHeroine'))


function useReducedMotion(): boolean {
  const query = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : undefined
  const [reduced, setReduced] = useState(query ? query.matches : true)
  useEffect(() => {
    if (!query) return
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [query])
  return reduced
}

export function HeroineFigure({ heroine, label }: { heroine: HeroineId; label: string }) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const animate = !reduced && !failed
  return (
    <div className="heroine-figure" role="img" aria-label={label}>
      {!ready && <img className="heroine-still" src={STILL[heroine]} alt="" draggable={false} />}
      {animate && (
        <Suspense fallback={null}>
          <RiveHeroine key={heroine} heroine={heroine} onReady={() => setReady(true)} onFail={() => setFailed(true)} />
        </Suspense>
      )}
    </div>
  )
}
