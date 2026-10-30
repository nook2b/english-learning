import { supportTiles } from './model'

test('support tiles: the words of the answer plus two distractors it does not use', () => {
  const tiles = supportTiles("I'm new here, and I don't understand everything yet.", 'k')
  expect(tiles.slice(0, 9)).toEqual(["I'm", 'new', 'here,', 'and', 'I', "don't", 'understand', 'everything', 'yet.'])
  expect(tiles).toHaveLength(11)
  expect(supportTiles('Where is the library?', 'k').slice(4)).not.toEqual(expect.arrayContaining(['is', 'the']))
})
