import { onReaction, react } from './motion'

test('a reaction reaches the heroine, and a figure that loads right after still gets it', () => {
  const seen: string[] = []
  const off = onReaction((who, r) => seen.push(`${who}:${r}`))
  react('iris', 'nod')
  expect(seen).toEqual(['iris:nod'])
  off()
  // The reaction screen mounts a new stage: its figure subscribes after the answer.
  const late: string[] = []
  const off2 = onReaction((who, r) => late.push(`${who}:${r}`))
  expect(late).toEqual(['iris:nod'])
  off2()
})
