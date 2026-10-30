import { TAGS } from '../content/tags'
import { addDays } from './dates'
import { type ClubDB, type Deferred, type Mistake, type TopicReview, db } from './db'

// After-class review: mistakes pile up by topic and come back on a schedule.
// A topic is worked through when reviewed without mistakes on three separate
// days: right away, a day later, three days later.

/** Days until the next review after a clean one at step 0 and step 1; after step 2 the topic is done. */
export const NEXT_DAYS = [1, 3] as const

/** The topic tags of a task (skills like "speaking" are not reviewed as topics). */
export const topicTags = (tags: readonly string[]) => tags.filter((t) => TAGS[t]?.kind === 'topic')

/** A new mistake (re)opens its topics for review today. */
export function reopen(current: TopicReview | undefined, tag: string, at: number, today: string): TopicReview {
  const open = current && !current.clearedAt
  return { tag, step: 0, due: today, since: open ? current.since : at }
}

/**
 * After a review round: a clean one moves the topic a step on (or clears it),
 * a slip starts it over from tomorrow. A round before the due day (early) does
 * not move it on, so repetition stays spaced.
 */
export function afterRound(t: TopicReview, clean: boolean, today: string, at: number, early = false): TopicReview {
  if (!clean) return { ...t, step: 0, due: addDays(today, 1) }
  if (early) return t
  if (t.step === 2) return { ...t, clearedAt: at }
  return { ...t, step: (t.step + 1) as 1 | 2, due: addDays(today, NEXT_DAYS[t.step]) }
}

export async function noteTopics(tags: readonly string[], at: number, today: string, database: ClubDB = db): Promise<void> {
  const tt = topicTags(tags)
  if (tt.length === 0) return
  await database.transaction('rw', database.topics, async () => {
    for (const tag of tt) await database.topics.put(reopen(await database.topics.get(tag), tag, at, today))
  })
}

export interface ReviewState {
  /** Topics not worked through yet, with how many mistakes each has in the current run. */
  topics: (TopicReview & { mistakes: Mistake[] })[]
  /** Speaking tasks put off and not done since. */
  deferred: Deferred[]
}

export async function loadReview(database: ClubDB = db): Promise<ReviewState> {
  const [topics, mistakes, deferred] = await Promise.all([database.topics.toArray(), database.mistakes.toArray(), database.deferred.toArray()])
  return {
    topics: topics
      .filter((t) => !t.clearedAt)
      .map((t) => ({ ...t, mistakes: mistakes.filter((m) => m.tags.includes(t.tag) && m.at >= t.since) })),
    deferred: deferred.filter((d) => !d.doneAt),
  }
}

/** What the review tab badge counts: topics due today and put-off speaking tasks. */
export function dueCount(state: ReviewState, today: string): number {
  return state.topics.filter((t) => t.due <= today).length + state.deferred.length
}

export interface RoundResult {
  exerciseId: string
  /** The topic the task worked on, or none for a put-off speaking task. */
  tag?: string
  deferred?: boolean
  /** First attempt: right, wrong, or put off again. */
  correct: boolean | null
}

/** Moves each topic of the round on (or back) and marks speaking tasks that were finally done. */
export async function saveRound(results: readonly RoundResult[], today: string, early: boolean, database: ClubDB = db): Promise<TopicReview[]> {
  const tags = [...new Set(results.flatMap((r) => (r.tag ? [r.tag] : [])))]
  const at = Date.now()
  return database.transaction('rw', [database.topics, database.deferred], async () => {
    const moved: TopicReview[] = []
    for (const tag of tags) {
      const t = await database.topics.get(tag)
      if (!t || t.clearedAt) continue
      const clean = results.filter((r) => r.tag === tag).every((r) => r.correct === true)
      const next = afterRound(t, clean, today, at, early)
      await database.topics.put(next)
      moved.push(next)
    }
    for (const r of results) if (r.deferred && r.correct === true) await database.deferred.update(r.exerciseId, { doneAt: at })
    return moved
  })
}
