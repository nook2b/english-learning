import { createContext, useContext } from 'react'
import type { Unit } from '../content/schema'
import { phraseRu } from './dictionary'

export interface GlossEntry {
  en: string
  ru: string
  /** A unit target expression rather than a helper word. */
  target: boolean
}

/** A unit's underlined expressions and whole-phrase glossary, translated from the course dictionary. */
export function unitGlossary(unit: Pick<Unit, 'expressions' | 'glossary'>): GlossEntry[] {
  const entry = (en: string, target: boolean) => ({ en, ru: phraseRu(en) ?? '', target })
  return [...unit.expressions.map((en) => entry(en, true)), ...unit.glossary.map((en) => entry(en, false))]
}

export const GlossaryContext = createContext<GlossEntry[]>([])
export const useGlossary = () => useContext(GlossaryContext)

export type GlossPart = string | { text: string; entry: GlossEntry }

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Splits text into plain parts and glossary hits; longer phrases win over single words. */
export function splitGloss(text: string, entries: readonly GlossEntry[]): GlossPart[] {
  if (entries.length === 0) return [text]
  const sorted = [...entries].sort((a, b) => b.en.length - a.en.length)
  const re = new RegExp(`(?<![\\w'])(${sorted.map((e) => escape(e.en)).join('|')})(?![\\w'])`, 'gi')
  const parts: GlossPart[] = []
  let last = 0
  for (const m of text.matchAll(re)) {
    const entry = sorted.find((e) => e.en.toLowerCase() === m[0].toLowerCase())!
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push({ text: m[0], entry })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}
