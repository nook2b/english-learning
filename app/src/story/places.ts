import { createContext, useContext } from 'react'

// Location backgrounds behind the heroines (docs/25-backgrounds-brief.md):
// assets/backgrounds/{place}.webp, 1920x1080, drawn for the stage scale (eye
// level at 25% from the top). A session names its place; a scene can name
// its own. The stage shows it when the file exists.
const files = import.meta.glob<string>('../../../assets/backgrounds/*.webp', { eager: true, query: '?url', import: 'default' })
export const PLACES: Record<string, string> = Object.fromEntries(Object.entries(files).map(([p, url]) => [p.replace(/^.*\//, '').replace(/\.webp$/, ''), url]))

/** The place of the current session or scene. */
export const PlaceContext = createContext<string | undefined>(undefined)

export const usePlace = () => useContext(PlaceContext)
