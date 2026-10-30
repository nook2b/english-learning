import { UNITS } from '../../content/course'
import { keyPhrases } from './guide'

test('key phrases come with a sentence of the unit that uses them', () => {
  for (const unit of Object.values(UNITS)) {
    const phrases = keyPhrases(unit)
    expect(phrases).toHaveLength(unit.expressions.length)
    for (const p of phrases) if (p.example) expect(p.example.text.toLowerCase().replace(/’/g, "'")).toContain(p.en.toLowerCase().replace(/[?.!]$/, ''))
    // Most phrases of a unit have an example sentence.
    expect(phrases.filter((p) => p.example).length).toBeGreaterThanOrEqual(Math.ceil(phrases.length / 2))
  }
})
