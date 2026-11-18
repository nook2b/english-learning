import { REWARD_LINES, rewardLine, streakLines } from './rewards'

test('every reward screen has lines from its heroines', () => {
  for (const h of ['mika', 'rei', 'iris'] as const) {
    expect(rewardLine('quest', h, 0)).toBeTruthy()
    expect(rewardLine('welcome', h, 3)).toBeTruthy()
  }
  expect(rewardLine('challenge_win', 'rei', 5)).toBeTruthy()
  expect(rewardLine('challenge_next', 'rei', 1)).toBeTruthy()
})

test('each streak milestone has one line from each heroine, the same variant', () => {
  for (const days of [3, 7, 14, 30, 100]) {
    const lines = streakLines(days, 2)
    expect(lines.map((l) => l.heroine)).toEqual(['mika', 'rei', 'iris'])
    expect(lines[0]!.said).toEqual(REWARD_LINES.streak[String(days)]!.mika![2])
  }
  expect(streakLines(5, 0)).toEqual([])
})
