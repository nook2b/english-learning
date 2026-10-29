import type { Exercise, Line, Speaker, TimelineKind } from '../content/schema'

/** One screen of a session; reading and listening exercises give one step per question. */
export interface Step {
  key: string
  /** A repeat of a step answered wrongly earlier in the session. */
  retry?: boolean
  exercise: Exercise
  question?: number
}

export interface Outcome {
  /** null when skipped ("can't speak now"): neither right nor wrong. */
  correct: boolean | null
  given: string
  expected: string
  /** Scene lines to show with the feedback: a reaction, or a clarification first. */
  lines?: Line[]
  /** Story choice to remember. */
  flag?: string
  /** Counted as right, but the spelling differs (a missing apostrophe): the right way to write it. */
  spelling?: string
}

export function toSteps(exercises: readonly Exercise[]): Step[] {
  return exercises.flatMap<Step>((exercise) =>
    exercise.type === 'reading' || exercise.type === 'listening'
      ? exercise.questions.map((_, question) => ({ key: `${exercise.id}#${question}`, exercise, question }))
      : [{ key: exercise.id, exercise }],
  )
}

export const SPEAKER_NAMES: Record<Speaker, string> = { mika: 'Mika', rei: 'Rei', iris: 'Iris', newcomer: 'Newcomer', narrator: '' }

/** Deterministic shuffle so a step looks the same after a re-render. */
export function shuffled<T>(items: readonly T[], seed: string): T[] {
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177)
    const j = Math.abs(h) % (i + 1)
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

export const TIMELINE_LABELS: Record<TimelineKind, string> = {
  now: 'Прямо сейчас',
  habit: 'Регулярно, обычно',
  state: 'Постоянно, факт',
  schedule: 'По расписанию',
  past_point: 'Один раз в прошлом',
  past_to_now: 'С прошлого до сейчас',
  future_plan: 'План на будущее',
}
