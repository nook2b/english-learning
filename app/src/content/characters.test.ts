import { CHARACTERS, isOpen } from './characters'
import { UNITS } from './course'
import { parseExpr, resolveSprite } from '../story/sprites'

const all = Object.values(CHARACTERS)

test('all three heroines have a page with six personal quests', () => {
  expect(Object.keys(CHARACTERS).sort()).toEqual(['iris', 'mika', 'rei'])
  for (const c of all) expect(c.quests).toHaveLength(6)
})

test('chat lines use drawn sprites', () => {
  for (const c of all) for (const l of [...c.lines, c.greeting]) expect(resolveSprite(parseExpr(c.id, l.expr))?.exact).toBe(true)
})

test('unlocks point at existing units and scene flags', () => {
  const flags = new Set(Object.values(UNITS).flatMap((u) => u.sessions.flatMap((s) => s.exercises.flatMap((e) => (e.type === 'scene' ? e.intents.map((i) => i.flag) : [])))))
  for (const c of all)
    for (const item of [...c.facts, ...c.memories, ...c.lines]) {
      if (item.unlock.unit) expect(Object.keys(UNITS).concat(['001'])).toContain(item.unlock.unit)
      if (item.unlock.flag) expect(flags).toContain(item.unlock.flag)
    }
})

test('opens by finished unit or by flag', () => {
  expect(isOpen({ unit: '001' }, { '001': {} }, {})).toBe(true)
  expect(isOpen({ flag: 'x' }, {}, { x: true })).toBe(true)
  expect(isOpen({ unit: '002' }, { '001': {} }, {})).toBe(false)
})
