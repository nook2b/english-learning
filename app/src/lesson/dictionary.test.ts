import { AFTER_CLASS } from '../content/afterClass'
import { CHARACTERS } from '../content/characters'
import { UNITS } from '../content/course'
import { PROLOGUE } from '../content/story'
import { bases, lookup, phraseRu, WORD } from './dictionary'

/** Every English text the app shows with tappable words (<Gloss>). */
function glossedTexts(): string[] {
  const texts: string[] = []
  const walk = (o: unknown): void => {
    if (Array.isArray(o)) return o.forEach(walk)
    if (!o || typeof o !== 'object') return
    const r = o as Record<string, unknown>
    if (typeof r.speaker === 'string' && typeof r.text === 'string') texts.push(r.text)
    if (r.type === 'reading') texts.push(r.text as string)
    if (r.type === 'listening') texts.push(r.audio as string)
    if (r.type === 'speak' && r.show === 'en') texts.push(r.text as string)
    Object.values(r).forEach(walk)
  }
  walk([...Object.values(UNITS), PROLOGUE])
  for (const states of Object.values(AFTER_CLASS)) texts.push(...Object.values(states).map((l) => l.text))
  for (const c of Object.values(CHARACTERS)) texts.push(...c.lines.map((l) => l.text), ...c.memories.map((m) => m.en))
  return texts
}

test('every word in story lines and texts is in the dictionary', () => {
  const missing = new Set<string>()
  for (const t of glossedTexts()) for (const [w] of t.matchAll(WORD)) if (!lookup(w)) missing.add(w.toLowerCase())
  // Add these to content/dictionary.json with the meaning they have in the course.
  expect([...missing].sort()).toEqual([])
})

test('every unit expression and set phrase has its translation in the dictionary (one source)', () => {
  const missing = Object.values(UNITS).flatMap((u) => [...u.expressions, ...u.glossary].filter((en) => !phraseRu(en)).map((en) => `${u.id}: ${en}`))
  expect(missing).toEqual([])
})

test('regular forms find their base word', () => {
  const dict = { note: 'заметка', not: 'не', class: 'занятие', study: 'изучать', drop: 'уронить', close: 'закрываться', slow: 'медленный', mika: 'Мика' }
  expect(lookup('studies', dict)).toEqual({ base: 'study', ru: 'изучать' })
  expect(lookup('Dropped', dict)?.base).toBe('drop')
  expect(lookup('closes', dict)?.base).toBe('close')
  expect(lookup('slower', dict)?.base).toBe('slow')
  expect(lookup('Mika’s', dict)?.base).toBe('mika')
  expect(lookup('notes', dict)?.base).toBe('note')
  expect(lookup('noting', dict)?.base).toBe('note')
  expect(lookup('classes', dict)?.base).toBe('class')
  expect(lookup('slow', dict)).toEqual({ ru: 'медленный' })
  expect(lookup('zebra', dict)).toBeUndefined()
})

test('a.m. and contractions are single words', () => {
  expect([...'at 10 a.m. I’m here'.matchAll(WORD)].map((m) => m[0])).toEqual(['at', 'a.m.', 'I’m', 'here'])
  expect(bases("it's")[0]).toBe("it's")
})
