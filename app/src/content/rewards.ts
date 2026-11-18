import { z } from 'zod'
import data from '../../../content/rewards.json'
import { HEROINES } from './schema'

// Heroine lines on the reward screens (content/rewards.json, docs/55 section 3).

const Said = z.object({ en: z.string(), ru: z.string() })
export type Said = z.infer<typeof Said>
type HeroineId = (typeof HEROINES)[number]
const PerHeroine = z.object(Object.fromEntries(HEROINES.map((h) => [h, z.array(Said).optional()])) as Record<HeroineId, z.ZodOptional<z.ZodArray<typeof Said>>>)

const RewardLines = z.object({
  quest: PerHeroine,
  welcome: PerHeroine,
  /** By streak milestone ("3", "7", …): one line from each heroine, the same variant. */
  streak: z.record(z.string(), PerHeroine),
  challenge_win: PerHeroine,
  challenge_next: PerHeroine,
})
export type RewardLines = z.infer<typeof RewardLines>
export const REWARD_LINES = RewardLines.parse(data)

export type RewardLineMoment = 'quest' | 'welcome' | 'challenge_win' | 'challenge_next'

const pickFrom = (list: readonly Said[] | undefined, pick: number) => (list?.length ? list[Math.abs(pick) % list.length] : undefined)

/** A line for this moment and heroine, chosen by a number that changes from time to time (a day, a count). */
export function rewardLine(moment: RewardLineMoment, heroine: HeroineId, pick: number, lines: RewardLines = REWARD_LINES): Said | undefined {
  return pickFrom(lines[moment][heroine], pick)
}

/** The streak screen: each heroine's line for this milestone, the same variant for all three. */
export function streakLines(days: number, pick: number, lines: RewardLines = REWARD_LINES): { heroine: HeroineId; said: Said }[] {
  const row = lines.streak[String(days)]
  if (!row) return []
  return HEROINES.flatMap((h) => {
    const said = pickFrom(row[h], pick)
    return said ? [{ heroine: h, said }] : []
  })
}
