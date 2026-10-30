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
