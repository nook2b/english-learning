import { useEffect, useState } from 'react'
import { HEROINES, SESSIONS_PER_UNIT } from '../content/schema'

/** Bottom menu tabs, in order; one list for the router and the menu. */
export const TABS = [
  { route: 'path', label: 'Путь' },
  { route: 'review', label: 'Повторение' },
  { route: 'quests', label: 'Задания' },
  { route: 'heroines', label: 'Героини' },
  { route: 'profile', label: 'Профиль' },
] as const

export type TabName = (typeof TABS)[number]['route']

export type Route =
  | { name: TabName }
  | { name: 'unit'; unitId: string }
  | { name: 'heroine'; id: (typeof HEROINES)[number] }
  | { name: 'session'; unitId: string; index: number }
  /** An after-class review round. */
  | { name: 'practice' }
  /** The prologue scene before unit 001. */
  | { name: 'prologue' }
  /** The placement check taken again from the profile. */
  | { name: 'placement' }

// Hash routing keeps deep links working on GitHub Pages without server rewrites.
export function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/')
  const [name, a, b] = parts
  if (name === 'unit' && a && /^\d{3}$/.test(a)) return { name: 'unit', unitId: a }
  const index = Number(b)
  if (name === 'session' && a && /^\d{3}$/.test(a) && Number.isInteger(index) && index >= 1 && index <= SESSIONS_PER_UNIT) return { name: 'session', unitId: a, index }
  const heroine = HEROINES.find((h) => h === a)
  if (name === 'heroine' && heroine) return { name: 'heroine', id: heroine }
  if (name === 'practice') return { name: 'practice' }
  if (name === 'prologue') return { name: 'prologue' }
  if (name === 'placement') return { name: 'placement' }
  const tab = TABS.find((t) => t.route === name)
  if (tab) return { name: tab.route }
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
