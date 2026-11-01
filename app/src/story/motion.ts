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

/** Body reactions of a Rive heroine (docs/26-rive-motion-brief.md): triggers on her view model. */
export type Reaction = 'nod' | 'headShake' | 'hop' | 'laughShake' | 'sigh'

/** The reaction a new face starts: laughing shakes, surprise hops, sadness sighs. */
export const REACTION_FOR_FACE: Partial<Record<string, Reaction>> = { laugh: 'laughShake', surprised: 'hop', sad: 'sigh', worried: 'sigh' }

const reactionListeners = new Set<(heroine: string, reaction: Reaction) => void>()
let pending: { heroine: string; reaction: Reaction; at: number } | undefined

/**
 * Asks a heroine to react (a nod on a right answer). A figure that is still
 * loading (the reaction screen mounts a new stage) picks it up when ready.
 */
export function react(heroine: string, reaction: Reaction) {
  pending = { heroine, reaction, at: Date.now() }
  reactionListeners.forEach((l) => l(heroine, reaction))
}

/** Listens for reactions; the one asked for in the last 1.5 s is replayed to a figure that has just loaded. */
export function onReaction(listener: (heroine: string, reaction: Reaction) => void): () => void {
  if (pending && Date.now() - pending.at < 1500) listener(pending.heroine, pending.reaction)
  reactionListeners.add(listener)
  return () => reactionListeners.delete(listener)
}
