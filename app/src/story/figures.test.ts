import { riveCanTurn } from './figures'

test('a heroine turns to the speaker only in poses and faces drawn turned', () => {
  expect(riveCanTurn('mika', 'stand', 'happy', 'left')).toBe(true)
  expect(riveCanTurn('mika', 'stand', 'pout', 'right')).toBe(true)
  // Not drawn turned yet: she leans instead.
  expect(riveCanTurn('mika', 'stand', 'sad', 'left')).toBe(false)
  expect(riveCanTurn('mika', 'phone', 'happy', 'left')).toBe(false)
  // Rei stands on the left: she turns right only, from her own turned artboards.
  expect(riveCanTurn('rei', 'recorder', 'neutral', 'right')).toBe(true)
  expect(riveCanTurn('rei', 'recorder', 'neutral', 'left')).toBe(false)
  expect(riveCanTurn('rei', 'arms_crossed', 'deadpan', 'right')).toBe(false)
})
