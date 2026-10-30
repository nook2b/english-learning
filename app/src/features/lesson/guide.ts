import type { Speaker, Unit } from '../../content/schema'
import { phraseRu } from '../../lesson/dictionary'

export interface Example {
  text: string
  ru?: string
  /** Who says it: a heroine's clip plays when there is one, browser speech otherwise. */
  speaker: Speaker
  expr?: string
  delivery?: string
}

export interface KeyPhrase {
  en: string
  ru: string
  /** A sentence of this unit that uses the phrase. */
  example?: Example
}

/**
 * Sentences of a unit in order of preference: heroine story lines (voiced),
 * then audio of listening and dictation tasks, then the player's own correct
 * answers (translations keep their Russian).
 */
function sentences(unit: Unit): Example[][] {
  const lines: Example[] = []
  const audio: Example[] = []
  const answers: Example[] = []
  const walk = (o: unknown): void => {
    if (Array.isArray(o)) return o.forEach(walk)
    if (!o || typeof o !== 'object') return
    const r = o as Record<string, unknown>
    if (typeof r.speaker === 'string' && r.speaker !== 'narrator' && typeof r.text === 'string') lines.push(r as unknown as Example)
    if ((r.type === 'listening' || r.type === 'dictation') && typeof r.audio === 'string')
      audio.push({ text: r.audio, speaker: r.speaker as Speaker, delivery: r.delivery as string | undefined })
    if (Array.isArray(r.answers) && typeof r.answers[0] === 'string' && r.type !== 'choice')
      answers.push({ text: r.answers[0], ru: r.type === 'translate' ? (r.ru as string) : undefined, speaker: 'narrator' })
    Object.values(r).forEach(walk)
  }
  walk(unit.sessions)
  return [lines, audio, answers]
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** The unit's expressions, each with the best short sentence of the unit that uses it. */
export function keyPhrases(unit: Unit): KeyPhrase[] {
  const groups = sentences(unit)
  return unit.expressions.map((en) => {
    const phrase = { en, ru: phraseRu(en) ?? '' }
    const re = new RegExp(`(?<![\\w'])${escape(en.replace(/[?.!]$/, ''))}(?![\\w'])`, 'i')
    for (const group of groups) {
      const found = group.filter((s) => re.test(s.text.replace(/’/g, "'"))).sort((a, b) => a.text.length - b.text.length)[0]
      if (found) return { ...phrase, example: found }
    }
    return phrase
  })
}
