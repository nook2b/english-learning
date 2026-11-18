import { UNITS } from '../../content/course'
import { PRACTICE, type PracticeItem } from '../../content/practice'
import type { Exercise } from '../../content/schema'
import type { ReviewState } from '../../data/review'
import { shuffled } from '../../lesson/model'

// Builds an after-class review round from what has piled up: for each topic,
// a few close variations from the practice bank, then the very sentences the
// learner got wrong, then speaking tasks that were put off.

/** Topics in one round, variations per topic, put-off speaking tasks per round. */
export const ROUND = { topics: 3, variations: 3, deferred: 3 } as const

/** Short tasks worth repeating as they were; long ones (texts, sorting) are covered by variations. */
const REPEATABLE = new Set(['choice', 'fill', 'timeline', 'translate', 'fix', 'transform', 'dictation', 'write', 'scene'])

export interface RoundItem {
  exercise: Exercise
  /** The topic this task works on; absent for a put-off speaking task. */
  tag?: string
  deferred?: boolean
}

const byId = new Map<string, Exercise>([
  ...Object.values(UNITS).flatMap((u) => u.sessions.flatMap((s) => s.exercises.map((e) => [e.id, e] as const))),
  ...Object.values(PRACTICE).flatMap((items) => items.map((p) => [p.exercise.id, p.exercise] as const)),
])

export const findExercise = (id: string) => byId.get(id)

/**
 * The topics of a round, most pressing first: due ones (all open ones when
 * reviewing early), more mistakes first, then the oldest.
 */
export function roundTopics(state: ReviewState, today: string, early: boolean) {
  return state.topics
    .filter((t) => early || t.due <= today)
    .sort((a, b) => b.mistakes.length - a.mistakes.length || a.since - b.since)
    .slice(0, ROUND.topics)
}

export function buildRound(
  state: ReviewState,
  today: string,
  { maxUnit, early = false, bank = PRACTICE }: { maxUnit: string; early?: boolean; bank?: Record<string, PracticeItem[]> },
): RoundItem[] {
  const topics = roundTopics(state, today, early)
  const seen = new Set<string>()
  const take = (item: RoundItem) => {
    if (seen.has(item.exercise.id)) return []
    seen.add(item.exercise.id)
    return [item]
  }
  const originals = topics.flatMap((t) => {
    const last = [...t.mistakes].sort((a, b) => b.at - a.at).find((m) => REPEATABLE.has(findExercise(m.exerciseId)?.type ?? ''))
    const ex = last && findExercise(last.exerciseId)
    return ex ? [{ exercise: ex, tag: t.tag }] : []
  })
  const originalIds = new Set(originals.map((o) => o.exercise.id))
  // A new set of variations each day and each step, from units the learner has reached.
  const variations = topics.flatMap((t) =>
    shuffled(
      (bank[t.tag] ?? []).filter((p) => p.unit <= maxUnit && !originalIds.has(p.exercise.id)),
      `${today}|${t.tag}|${t.step}`,
    )
      .slice(0, ROUND.variations)
      .map((p) => ({ exercise: p.exercise, tag: t.tag })),
  )
  const deferred = state.deferred
    .slice(0, ROUND.deferred)
    .flatMap((d) => {
      const ex = findExercise(d.exerciseId)
      return ex ? [{ exercise: ex, deferred: true }] : []
    })
  return [...variations, ...originals, ...deferred].flatMap(take)
}

/** A warm-up when nothing has piled up: topics, tasks per topic. */
export const WARMUP = { topics: 3, perTopic: 2 } as const

/**
 * A warm-up round when there are no mistakes to work through: a few topics
 * of the sessions already finished, a new choice each day, two practice
 * tasks each, only from units the learner has reached. Empty before the
 * first finished session.
 */
export function warmupRound(finished: readonly { unitId: string; index: number }[], today: string, { maxUnit, bank = PRACTICE }: { maxUnit: string; bank?: Record<string, PracticeItem[]> }): RoundItem[] {
  const tags = new Set<string>()
  for (const f of finished) for (const e of UNITS[f.unitId]?.sessions[f.index - 1]?.exercises ?? []) for (const t of e.tags) if (bank[t]?.length) tags.add(t)
  return shuffled([...tags], `${today}|warmup`)
    .slice(0, WARMUP.topics)
    .flatMap((tag) =>
      shuffled(
        (bank[tag] ?? []).filter((p) => p.unit <= maxUnit),
        `${today}|warmup|${tag}`,
      )
        .slice(0, WARMUP.perTopic)
        .map((p) => ({ exercise: p.exercise, tag })),
    )
}
