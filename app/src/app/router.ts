import { useEffect, useState } from 'react'

export const ROUTES = ['path', 'lesson', 'review', 'story', 'heroines', 'profile'] as const
export type Route = (typeof ROUTES)[number]

// Hash routing keeps deep links working on GitHub Pages without server rewrites.
function parse(hash: string): Route {
  const name = hash.replace(/^#\/?/, '')
  return (ROUTES as readonly string[]).includes(name) ? (name as Route) : 'path'
}

export function navigate(route: Route) {
  window.location.hash = `/${route}`
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
