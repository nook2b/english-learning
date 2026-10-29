import { clipKey, clipUrl } from './clips'

test('clip key is stable and depends on speaker and text', () => {
  expect(clipKey('mika', 'Hi!')).toBe(clipKey('mika', ' Hi! '))
  expect(clipKey('mika', 'Hi!')).not.toBe(clipKey('rei', 'Hi!'))
  expect(clipKey('mika', 'Hi!')).toMatch(/^[0-9a-f]{8}$/)
})

test('finds a clip by speaker and text', () => {
  const key = clipKey('rei', 'Ten seconds.')
  expect(clipUrl('rei', 'Ten seconds.', { [`rei/${key}`]: 'x.mp3' })).toBe('x.mp3')
  expect(clipUrl('rei', 'Other.', { [`rei/${key}`]: 'x.mp3' })).toBeUndefined()
})

test('matches the key computed by scripts/generate_audio.py', () => {
  expect(clipKey('mika', 'Hi!')).toBe('83aab0e1')
  expect(clipKey('iris', "Мика — I'm new here.")).toBe('ad5c510f')
})
