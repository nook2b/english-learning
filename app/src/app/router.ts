import { useEffect, useState } from 'react'

export type Route =
  | { name: 'path' | 'review' | 'story' | 'heroines' | 'profile' }
  | { name: 'unit'; unitId: string }
  | { name: 'heroine'; id: 'mika' | 'rei' | 'iris' }
  | { name: 'session'; unitId: string; index: number }

export type TabName = 'path' | 'review' | 'story' | 'heroines' | 'profile'
const TABS: readonly string[] = ['path', 'review', 'story', 'heroines', 'profile']

// Hash routing keeps deep links working on GitHub Pages without server rewrites.
export function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/')
  const [name, a, b] = parts
  if (name === 'unit' && a && /^\d{3}$/.test(a)) return { name: 'unit', unitId: a }
  if (name === 'session' && a && /^\d{3}$/.test(a) && b && /^[1-8]$/.test(b)) return { name: 'session', unitId: a, index: Number(b) }
  if (name === 'heroine' && (a === 'mika' || a === 'rei' || a === 'iris')) return { name: 'heroine', id: a }
  if (name && TABS.includes(name)) return { name: name as TabName }
  return { name: 'path' }
}

export function href(route: Route): string {
  if (route.name === 'unit') return `#/unit/${route.unitId}`
  if (route.name === 'heroine') return `#/heroine/${route.id}`
  if (route.name === 'session') return `#/session/${route.unitId}/${route.index}`
  return `#/${route.name}`
}

export function navigate(route: Route) {
  window.location.hash = href(route).slice(1)
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
