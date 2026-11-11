import { z } from 'zod'
import data from '../../../content/rewards.json'
import { HEROINES } from './schema'

// Heroine lines on the reward screens (content/rewards.json, docs/55 section 3).

const Said = z.object({ en: z.string(), ru: z.string() })
export type Said = z.infer<typeof Said>
const PerHeroine = z.object(Object.fromEntries(HEROINES.map((h) => [h, z.array(Said).optional()])) as Record<(typeof HEROINES)[number], z.ZodOptional<z.ZodArray<typeof Said>>>)

export const REWARD_MOMENTS = ['quest', 'welcome', 'streak', 'challenge_win', 'challenge_next'] as const
export type RewardLineMoment = (typeof REWARD_MOMENTS)[number]

const RewardLines = z.object(Object.fromEntries(REWARD_MOMENTS.map((m) => [m, PerHeroine])) as Record<RewardLineMoment, typeof PerHeroine>)
export const REWARD_LINES = RewardLines.parse(data)

/** A line for this moment and heroine, chosen by a number that changes from time to time (a day, a count). */
export function rewardLine(moment: RewardLineMoment, heroine: (typeof HEROINES)[number], pick: number, lines = REWARD_LINES): Said | undefined {
  const list = lines[moment][heroine] ?? []
  return list.length ? list[Math.abs(pick) % list.length] : undefined
}
