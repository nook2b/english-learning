import type { HeroineId } from '../../story/sprites'

/** A different pair of heroines stays after class each day. */
export const PAIRS: readonly [HeroineId, HeroineId][] = [
  ['iris', 'rei'],
  ['rei', 'mika'],
  ['mika', 'iris'],
]

/** The pair of heroines staying after class today. */
export const todaysPair = (today: string) => PAIRS[Number(today.replaceAll('-', '')) % PAIRS.length]!

/** Russian plural: 1 ошибка, 2 ошибки, 5 ошибок. */
export function plural(n: number, one: string, few: string, many: string): string {
  const d = n % 10
  const h = n % 100
  if (d === 1 && h !== 11) return one
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few
  return many
}
