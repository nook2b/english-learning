import { checkTyped, matches, matchesSpeech, normalize, numberToWords } from './check'

test('ignores case, punctuation and curly apostrophes', () => {
  expect(matches('  i’m NEW here!! ', ["I'm new here."])).toBe(true)
})

test('contractions match their full forms both ways', () => {
  expect(matches('I am looking for Room 70', ["I'm looking for room seventy"])).toBe(true)
  expect(matches("She doesn't live here", ['She does not live here'])).toBe(true)
  expect(matches("He's from Spain", ['He is from Spain'])).toBe(true)
})

test('grammar errors do not match', () => {
  expect(matches('He live here', ['He lives here'])).toBe(false)
  expect(matches('I am agree', ['I agree'])).toBe(false)
  expect(matches('Where you are from?', ['Where are you from?'])).toBe(false)
})

test('any accepted variant is enough', () => {
  expect(matches('Could you repeat that?', ['Could you say that again?', 'Could you repeat that?'])).toBe(true)
})

test('numbers become words', () => {
  expect(numberToWords(17)).toBe('seventeen')
  expect(numberToWords(70)).toBe('seventy')
  expect(numberToWords(105)).toBe('one hundred five')
  expect(normalize('Room 17')).toBe('room seventeen')
})

test('speech allows one misheard word in five', () => {
  expect(matchesSpeech(["i'm looking for the room seventy"], ["I'm looking for Room 70"])).toBe(true)
  expect(matchesSpeech(['nice to meet', 'nice to meet you'], ['Nice to meet you'])).toBe(true)
  expect(matchesSpeech(['i like pizza'], ["I'm looking for Room 70"])).toBe(false)
})

test('a missing apostrophe still counts, with a spelling note', () => {
  expect(checkTyped('please dont touch the cables', ["Please don't touch the cables."])).toEqual({ correct: true, spelling: "Please don't touch the cables." })
  expect(checkTyped('im new here', ["I'm new here."])).toMatchObject({ correct: true })
  expect(checkTyped("Please don't touch the cables", ["Please don't touch the cables."])).toEqual({ correct: true })
})

test('missing commas and full stops need no note at all', () => {
  expect(checkTyped('By the way I live in the East Dorm', ['By the way, I live in the East Dorm.'])).toEqual({ correct: true })
})

test('grammar is still checked', () => {
  expect(checkTyped('please dont touches the cables', ["Please don't touch the cables."])).toEqual({ correct: false })
  expect(checkTyped('he dont like it', ["He doesn't like it."])).toEqual({ correct: false })
})
