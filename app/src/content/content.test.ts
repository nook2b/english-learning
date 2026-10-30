import { UNITS } from './course'
import { ARC1_UNITS } from './outline'
import { type HeroineId, isHeroine, parseExpr, resolveSprite } from '../story/sprites'
import type { Exercise } from './schema'
import { TAGS } from './tags'
import { CHARACTERS } from './characters'
import { HEROINES } from './schema'
import { clipUrl } from '../speech/clips'
import { voicedText } from '../speech/delivery'

const units = Object.values(UNITS)
const exercises = units.flatMap((u) => u.sessions.flatMap((s) => s.exercises))

/** Can some accepted answer be built from the tiles (each tile used at most once)? */
function buildable(tiles: readonly string[], answers: readonly string[]): boolean {
  return answers.some((a) => {
    const bank = [...tiles]
    return a.split(' ').every((w) => {
      const k = bank.indexOf(w)
      if (k < 0) return false
      bank.splice(k, 1)
      return true
    })
  })
}

test('every unit file parses and belongs to the outline', () => {
  expect(units.length).toBeGreaterThan(0)
  for (const u of units) expect(ARC1_UNITS.some((o) => o.id === u.id)).toBe(true)
})

test('each unit ends with its mission, a special stop on the path map', () => {
  for (const u of units) expect(u.sessions.map((s) => s.role ?? '').lastIndexOf('mission')).toBe(u.sessions.length - 1)
})

test('every exercise tag is in the registry (content/tags.json)', () => {
  const unknown = [...new Set(exercises.flatMap((e) => e.tags).filter((t) => !TAGS[t]))]
  expect(unknown).toEqual([])
})

test('exercise ids are unique across the course', () => {
  const ids = exercises.map((e) => e.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test.each(exercises.map((e) => [e.id, e] as [string, Exercise]))('%s is answerable', (_, e) => {
  switch (e.type) {
    case 'choice':
      expect(e.options).toContain(e.answer)
      expect(e.prompt.split('___')).toHaveLength(2)
      break
    case 'fill':
      // One gap per sentence: feedback and the review deck fill exactly one.
      expect(e.prompt.split('___')).toHaveLength(2)
      break
    case 'timeline':
      expect(e.options).toContain(e.answer)
      break
    case 'reading':
    case 'listening':
      for (const q of e.questions) expect(q.options).toContain(q.answer)
      break
    case 'sort':
      for (const item of e.items) expect(e.categories.map((c) => c.id)).toContain(item.category)
      break
    case 'pairs':
      expect(new Set(e.pairs.map((p) => p.ru)).size).toBe(e.pairs.length)
      break
    case 'translate':
    case 'dictation':
      if (e.tiles) expect(buildable(e.tiles, e.answers)).toBe(true)
      break
    case 'scene':
      for (const it of e.intents) if (it.tiles) expect(buildable(it.tiles, it.answers)).toBe(true)
      break
  }
})

const linesOf = (e: Exercise) => (e.type === 'scene' ? [...e.lines, ...e.intents.map((i) => i.reaction), e.clarify] : [])
const allLines = units.flatMap((u) =>
  u.sessions.flatMap((s) => [...(s.frame?.lines ?? []), ...(s.wrap ?? []), ...s.exercises.flatMap(linesOf)].map((l) => ({ unit: u.id, line: l }))),
)

test('every heroine line points at a drawn sprite (no fallback)', () => {
  const missing = allLines
    .filter(({ line }) => isHeroine(line.speaker))
    .map(({ line }) => resolveSprite(parseExpr(line.speaker as HeroineId, line.expr)))
    .filter((r) => !r?.exact)
  expect(missing).toEqual([])
})

test('a clarification after a language slip only listens, thinks or wonders (docs/10-sprites.md, section 8)', () => {
  // A whitelist, so a new emotion cannot slip in unnoticed.
  const allowed = new Set(['listening', 'thinking', 'neutral', 'surprised'])
  const bad = units.flatMap((u) =>
    u.sessions.flatMap((s) => s.exercises.flatMap((e) => (e.type === 'scene' ? [e.clarify] : []))).filter((l) => !allowed.has((l.expr ?? 'neutral').split('/').pop()!)),
  )
  expect(bad).toEqual([])
})

test('every heroine line, listening and dictation has its voice clip (a changed line would silently fall back to browser speech)', () => {
  const missing: string[] = []
  let checked = 0
  const check = (speaker: string, text: string, d: { expr?: string; delivery?: string }) => {
    if (HEROINES.includes(speaker as (typeof HEROINES)[number])) checked++
    if (HEROINES.includes(speaker as (typeof HEROINES)[number]) && !clipUrl(speaker, voicedText(text, d))) missing.push(`${speaker}: ${text}`)
  }
  const walk = (o: unknown): void => {
    if (Array.isArray(o)) return o.forEach(walk)
    if (!o || typeof o !== 'object') return
    const r = o as Record<string, unknown>
    if (typeof r.speaker === 'string' && typeof r.text === 'string') check(r.speaker, r.text, r)
    if ((r.type === 'listening' || r.type === 'dictation') && typeof r.audio === 'string') check(r.speaker as string, r.audio, r)
    Object.values(r).forEach(walk)
  }
  walk(units)
  for (const c of Object.values(CHARACTERS)) for (const l of c.lines) check(c.id, l.text, l)
  // Generate the missing ones with scripts/generate_audio.py.
  expect(missing).toEqual([])
  expect(checked).toBeGreaterThan(100)
})

test('romantic emotions stay off screen before unit 081', () => {
  const early = allLines.filter(({ unit, line }) => Number(unit) < 81 && /blush|tender|teary/.test(line.expr ?? ''))
  expect(early).toEqual([])
})
