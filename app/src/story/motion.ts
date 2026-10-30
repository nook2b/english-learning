import { useEffect, useState } from 'react'

/** The phone's "reduce motion" setting: no breathing, blinking or bobbing. */
export function useReducedMotion(): boolean {
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
