import data from '../../../content/dictionary.json'

// Course dictionary: every word that appears in story lines and texts, with
// the meaning it has in this course. Tapping any word shows it. Regular forms
// (asks, asked, asking, studies, slower) are found by their base word;
// irregular forms and contractions have their own entries.

export const DICTIONARY: Readonly<Record<string, string>> = data

/** Words in a text; "a.m." and contractions like "I'm" stay whole. */
export const WORD = /[ap]\.m\.|[A-Za-z]+(?:['’][A-Za-z]+)*/gi

export const keyOf = (word: string) => word.toLowerCase().replace(/’/g, "'")

/** Possible base words for a form, most likely first. */
export function bases(word: string): string[] {
  const w = keyOf(word)
  const out = [w]
  const add = (s: string) => s.length > 1 && out.push(s)
  if (w.endsWith("'s")) add(w.slice(0, -2))
  const undouble = (s: string) => (/([b-df-hj-np-tv-z])\1$/.test(s) ? s.slice(0, -1) : s)
  for (const [end, ...repl] of [
    // "notes" is note + s before not + es; "noted" is note + d before not + ed.
    ['ies', 'y'],
    ['s', ''],
    ['es', ''],
    ['ied', 'y'],
    ['ed', 'e', ''],
    ['ing', 'e', ''],
    ['ier', 'y'],
    ['er', 'e', ''],
    ['est', 'e', ''],
  ] as const) {
    if (!w.endsWith(end)) continue
    const stem = w.slice(0, -end.length)
    for (const r of repl) add(stem + r)
    if (end === 'ed' || end === 'ing' || end === 'er' || end === 'est') add(undouble(stem))
  }
  return out
}

export interface Lookup {
  /** The dictionary headword when it differs from the tapped form. */
  base?: string
  ru: string
}

export function lookup(word: string, dict: Readonly<Record<string, string>> = DICTIONARY): Lookup | undefined {
  const w = keyOf(word)
  for (const b of bases(word)) {
    const ru = dict[b]
    if (ru) return b === w ? { ru } : { base: b, ru }
  }
  return undefined
}
