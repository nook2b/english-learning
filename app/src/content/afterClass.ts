import { z } from 'zod'
import data from '../../../content/after-class.json'
import { HEROINES } from './schema'

// What the heroines say in the empty classroom after class (review tab):
// something is due, everything waits for its day, nothing piled up, or a
// round was just finished.

export const AFTER_CLASS_STATES = ['due', 'waiting', 'empty', 'done'] as const
export type AfterClassState = (typeof AFTER_CLASS_STATES)[number]

const Line = z.object({ text: z.string(), ru: z.string(), expr: z.string(), delivery: z.string().optional() })

export const AFTER_CLASS = z
  .record(z.enum(HEROINES), z.record(z.enum(AFTER_CLASS_STATES), Line))
  .parse(data) as Record<(typeof HEROINES)[number], Record<AfterClassState, z.infer<typeof Line>>>
