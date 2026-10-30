import { z } from 'zod'
import data from '../../../content/placement.json'
import type { PlacementResult, SurveyAnswers } from '../data/db'
import type { Attempt } from '../lesson/ExerciseRun'
import { Exercise } from './schema'

// The placement check in Room 70 (plan 3.1): grammar from A2 to B2, a short
// reading, a listening (the International Office announcement) and three
// sentences to write. It gives a skill profile and turns support mode on when
// needed; it never skips units (test-out keeps the story, plan 3.2.2).

export const PARTS = ['grammar', 'reading', 'listening', 'writing'] as const
export type Part = (typeof PARTS)[number]
const LEVELS = ['A2', 'B1', 'B2'] as const

const Placement = z.object({
  intro: z.string(),
  parts: z.array(
    z.object({
      id: z.enum(PARTS),
      title: z.string(),
      intro: z.string(),
      items: z.array(z.object({ level: z.enum(LEVELS).optional(), exercise: Exercise })).min(1),
    }),
  ),
})

export const PLACEMENT = Placement.parse(data)

/** Answers counted per part: a reading or listening task counts each question. */
function questions(e: Exercise): number {
  return e.type === 'reading' || e.type === 'listening' ? e.questions.length : 1
}

/** A level is reached when at least 4 of its 5 items are right and every level below it is reached too. */
function grammarLevel(right: Record<(typeof LEVELS)[number], number>, total: Record<(typeof LEVELS)[number], number>): PlacementResult['grammarLevel'] {
  let level: PlacementResult['grammarLevel'] = 'below A2'
  for (const l of LEVELS) {
    if (total[l] === 0 || right[l] < Math.ceil(total[l] * 0.7)) break
    level = l
  }
  return level
}

export function scorePlacement(attempts: readonly Attempt[], at = Date.now()): PlacementResult {
  const parts = Object.fromEntries(PARTS.map((p) => [p, { correct: 0, total: 0 }])) as PlacementResult['parts']
  const right = { A2: 0, B1: 0, B2: 0 }
  const total = { A2: 0, B1: 0, B2: 0 }
  const weak = new Set<string>()
  for (const part of PLACEMENT.parts)
    for (const { level, exercise } of part.items) {
      const mine = attempts.filter((a) => a.exercise.id === exercise.id)
      const ok = mine.filter((a) => a.outcome.correct === true).length
      parts[part.id].total += questions(exercise)
      parts[part.id].correct += ok
      if (level) {
        total[level] += 1
        right[level] += ok
      }
      if (part.id === 'grammar' || part.id === 'writing') if (ok < questions(exercise)) for (const t of exercise.tags) weak.add(t)
    }
  return { at, parts, grammarLevel: grammarLevel(right, total), weak: [...weak] }
}

/** Share of right answers over the whole check. */
export function overall(r: PlacementResult): number {
  const all = PARTS.reduce((n, p) => n + r.parts[p].total, 0)
  return all ? PARTS.reduce((n, p) => n + r.parts[p].correct, 0) / all : 0
}

/** Support mode is offered when the check went below half, or the player said "can't yet" about two skills or more. */
export function needsSupport(r: PlacementResult, survey?: SurveyAnswers): boolean {
  const cannot = Object.values(survey?.self ?? {}).filter((s) => s === 'cannot').length
  return overall(r) < 0.5 || cannot >= 2
}

export const LEVEL_TEXT: Record<PlacementResult['grammarLevel'], string> = {
  'below A2': 'основы стоит повторить — курс начнёт с поддержкой',
  A2: 'база уверенная, B1 — как раз твой следующий шаг',
  B1: 'B1 в основном знаком, курс закрепит его и поведёт к B2',
  B2: 'грамматика уверенная — первые юниты будут лёгкими',
}
