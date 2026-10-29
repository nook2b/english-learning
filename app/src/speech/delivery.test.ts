import { clipKey } from './clips'
import { voicedText } from './delivery'

test('explicit delivery wins, otherwise the sprite emotion picks the tag', () => {
  expect(voicedText('Hi!', { expr: 'recorder/smirk' })).toBe('[dryly amused] Hi!')
  expect(voicedText('Hi!', { expr: 'smirk', delivery: '[whispers]' })).toBe('[whispers] Hi!')
  expect(voicedText('Hi!', { expr: 'neutral' })).toBe('Hi!')
})

test('same voiced text and keys as scripts/generate_audio.py', () => {
  expect(clipKey('rei', voicedText('Hi!', { expr: 'recorder/smirk' }))).toBe('9e29d63c')
  expect(clipKey('rei', voicedText('Hi!', { delivery: '[whispers]' }))).toBe('46d8c266')
  expect(clipKey('rei', voicedText('Hi!', { expr: 'neutral' }))).toBe('6cc61681')
})
