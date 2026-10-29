import { SPRITES, TALK, parseExpr, resolveSprite } from './sprites'

const fake = {
  'rei/base/stand/neutral': 'n.webp',
  'rei/base/stand/annoyed': 'a.webp',
  'rei/base/recorder/focused': 'rf.webp',
  'rei/street/stand/neutral': 'sn.webp',
}

test('pose and emotion come from "pose/expr", stand by default', () => {
  expect(parseExpr('rei', 'recorder/focused')).toMatchObject({ pose: 'recorder', expr: 'focused' })
  expect(parseExpr('rei', 'smirk')).toMatchObject({ pose: 'stand', expr: 'smirk' })
})

test('exact sprite when it exists', () => {
  expect(resolveSprite(parseExpr('rei', 'recorder/focused'), fake)).toMatchObject({ url: 'rf.webp', exact: true })
})

test('missing emotion falls back to a similar one before the neutral face', () => {
  expect(resolveSprite(parseExpr('rei', 'guarded'), fake)?.url).toBe('a.webp')
  expect(resolveSprite(parseExpr('rei', 'recorder/smirk'), fake)?.url).toBe('n.webp')
})

test('never switches outfit while the outfit has a sprite', () => {
  expect(resolveSprite(parseExpr('rei', 'annoyed', 'street'), fake)?.url).toBe('sn.webp')
})

test('an undrawn outfit falls back to base', () => {
  expect(resolveSprite(parseExpr('rei', 'annoyed', 'winter'), fake)?.url).toBe('a.webp')
})

test('talk frames load as mouth patches and are not sprites of their own', () => {
  expect(TALK['mika/base/stand/neutral']).toMatchObject({ x: expect.any(Number), y: expect.any(Number), w: expect.any(Number) })
  expect(Object.keys(SPRITES).some((k) => k.includes('_talk'))).toBe(false)
})
