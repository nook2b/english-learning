import { UNITS } from './course'
import { ARC1_UNITS } from './outline'
import type { Exercise } from './schema'

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

test('exercise ids are unique across the course', () => {
  const ids = exercises.map((e) => e.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test.each(exercises.map((e) => [e.id, e] as [string, Exercise]))('%s is answerable', (_, e) => {
  switch (e.type) {
    case 'choice':
      expect(e.options).toContain(e.answer)
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
