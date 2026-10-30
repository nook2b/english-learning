import type { Exercise } from './schema'
import { PROLOGUE, PROLOGUE_FLAG } from './story'
import { CHARACTERS, isOpen } from './characters'
import { UNITS } from './course'
import { parseExpr, resolveSprite } from '../story/sprites'

const all = Object.values(CHARACTERS)

test('all three heroines have a page with six personal quests', () => {
  expect(Object.keys(CHARACTERS).sort()).toEqual(['iris', 'mika', 'rei'])
  for (const c of all) expect(c.quests).toHaveLength(6)
})

test('chat lines use drawn sprites', () => {
  for (const c of all) for (const l of c.lines) expect(resolveSprite(parseExpr(c.id, l.expr))?.exact).toBe(true)
})

test('unlocks point at existing units and scene flags', () => {
  const sceneFlags = (sessions: readonly { exercises: readonly Exercise[] }[]) => sessions.flatMap((s) => s.exercises.flatMap((e) => (e.type === 'scene' ? e.intents.map((i) => i.flag) : [])))
  // Old saves may still hold flags of rewritten branches; their memories stay readable (docs/21-story-script.md, appendix A).
  const LEGACY = ['u001_intro_looking_for_room']
  const flags = new Set([...Object.values(UNITS).flatMap((u) => sceneFlags(u.sessions)), ...sceneFlags([PROLOGUE]), PROLOGUE_FLAG, ...LEGACY])
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
