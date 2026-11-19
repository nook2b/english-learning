import { z } from 'zod'
import arc1 from '../../../content/arc-checks/arc1.json'
import type { Attempt } from '../lesson/ExerciseRun'
import { Exercise, Line } from './schema'

// The check at the end of an arc (arc 1: after 020/8): new material on every
// skill of the arc, in five blocks. It marks answers as usual, gives a result
// per block and never holds the story back.

const ArcCheck = z.object({
  id: z.string(),
  title: z.string(),
  setting: z.string(),
  blocks: z.array(z.object({ id: z.string(), title: z.string(), exercises: z.array(Exercise).min(1) })).min(1),
  outro: Line,
})
export type ArcCheck = z.infer<typeof ArcCheck>

export const ARC_CHECKS: Record<string, ArcCheck> = { arc1: ArcCheck.parse(arc1) }

/** The unit whose mission opens the check. */
export const ARC_CHECK_AFTER: Record<string, string> = { arc1: '020' }

export type BlockScore = { correct: number; total: number }

/** Right answers per block, a listening task counting each question; put-off tasks are left out. */
export function scoreArcCheck(check: ArcCheck, attempts: readonly Attempt[]): Record<string, BlockScore> {
  const blockOf = new Map(check.blocks.flatMap((b) => b.exercises.map((e) => [e.id, b.id] as const)))
  const out: Record<string, BlockScore> = Object.fromEntries(check.blocks.map((b) => [b.id, { correct: 0, total: 0 }]))
  for (const a of attempts) {
    const block = blockOf.get(a.exercise.id)
    if (!block || a.outcome.correct === null) continue
    out[block]!.total += 1
    if (a.outcome.correct) out[block]!.correct += 1
  }
  return out
}
