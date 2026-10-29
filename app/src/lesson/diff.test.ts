import { wordDiff } from './diff'

const marked = (ws: { text: string; changed: boolean }[]) => ws.filter((w) => w.changed).map((w) => w.text)

test('marks the wrong word on both sides', () => {
  const d = wordDiff('He live here', 'He lives here.')
  expect(marked(d.given)).toEqual(['live'])
  expect(marked(d.expected)).toEqual(['lives'])
})

test('marks a missing word in the right answer only', () => {
  const d = wordDiff('What you study?', 'What do you study?')
  expect(marked(d.given)).toEqual([])
  expect(marked(d.expected)).toEqual(['do'])
})

test('case, punctuation and apostrophes are not differences', () => {
  const d = wordDiff('im looking for room 70', "I'm looking for Room 70.")
  expect(marked(d.given)).toEqual([])
  expect(marked(d.expected)).toEqual([])
})
