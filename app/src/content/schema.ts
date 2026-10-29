import { z } from 'zod'

// Course content lives in /content as JSON and is validated against these
// schemas at build time (content.test.ts) and at load time.

const id = z.string().min(1)
const tags = z.array(z.string()).default([])
/** Accepted answers; checking ignores case, punctuation and contractions. */
const answers = z.array(z.string().min(1)).min(1)

export const HEROINES = ['mika', 'rei', 'iris'] as const
export const Speaker = z.enum([...HEROINES, 'newcomer', 'narrator'])

export const TIMELINE_KINDS = ['now', 'habit', 'state', 'schedule', 'past_point', 'past_to_now', 'future_plan'] as const
export const TimelineKind = z.enum(TIMELINE_KINDS)

const base = {
  id,
  explain: z.string().optional(),
  tags,
  /** In-story label of what this is: "Карточка из заметок Айрис", "Вопрос из списка Мики". */
  context: z.string().optional(),
}

/** T1: pick the right form in context. */
const Choice = z.object({
  ...base,
  type: z.literal('choice'),
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.string(),
})

/** T2: type the missing form, hint in brackets. */
const Fill = z.object({
  ...base,
  type: z.literal('fill'),
  prompt: z.string().includes('___'),
  hint: z.string().optional(),
  answers,
})

/** T3: match a sentence to its timeline. */
const Timeline = z.object({
  ...base,
  type: z.literal('timeline'),
  sentence: z.string(),
  options: z.array(TimelineKind).min(2),
  answer: TimelineKind,
})

/** T4: translate from Russian, with optional word tiles. */
const Translate = z.object({
  ...base,
  type: z.literal('translate'),
  ru: z.string(),
  answers,
  tiles: z.array(z.string()).optional(),
})

/** T5: correct the sentence. */
const Fix = z.object({
  ...base,
  type: z.literal('fix'),
  sentence: z.string(),
  answers,
})

/** T6: transform by instruction (question, negative, other tense). */
const Transform = z.object({
  ...base,
  type: z.literal('transform'),
  instruction: z.string(),
  sentence: z.string(),
  answers,
})

/** T7: sort items (signal words) into categories. */
const Sort = z.object({
  ...base,
  type: z.literal('sort'),
  instruction: z.string(),
  categories: z.array(z.object({ id, label: z.string() })).min(2),
  items: z.array(z.object({ text: z.string(), category: id })).min(2),
})

const Question = z.object({
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.string(),
})

/** T11: read a text, answer questions. */
const Reading = z.object({
  ...base,
  type: z.literal('reading'),
  title: z.string(),
  text: z.string(),
  /** Shown after the last question, never before: it would give the answers away. */
  ru: z.string().optional(),
  questions: z.array(Question).min(1),
})

/** T12: listen without a transcript (TTS for now), answer questions. */
const Listening = z.object({
  ...base,
  type: z.literal('listening'),
  speaker: Speaker,
  audio: z.string(),
  delivery: z.string().optional(),
  ru: z.string().optional(),
  questions: z.array(Question).min(1),
})

/** T8: dictation — hear a phrase, type it or build it from tiles. */
const Dictation = z.object({
  ...base,
  type: z.literal('dictation'),
  speaker: Speaker,
  audio: z.string(),
  delivery: z.string().optional(),
  answers,
  tiles: z.array(z.string()).optional(),
})

/** T17: match pairs — words or phrases with their translations. */
const Pairs = z.object({
  ...base,
  type: z.literal('pairs'),
  pairs: z.array(z.object({ en: z.string(), ru: z.string() })).min(3).max(6),
})

/** T13: type your own short answer to a situation. */
const Write = z.object({
  ...base,
  type: z.literal('write'),
  situation: z.string(),
  answers,
})

/** T14: say a phrase into the microphone. */
const Speak = z.object({
  ...base,
  type: z.literal('speak'),
  /** What the learner sees: a Russian meaning to express, or English to read aloud. */
  show: z.enum(['ru', 'en']),
  text: z.string(),
  /** Whose voice reads the English sample aloud. */
  voice: Speaker.optional(),
  delivery: z.string().optional(),
  answers,
})

/** A spoken line; `ru` is the translation behind the "Перевод" button. */
const Line = z.object({
  speaker: Speaker,
  text: z.string(),
  ru: z.string().optional(),
  expr: z.string().optional(),
  /** Audio tags for the voice when the story context needs them: "[whispers]", "[out of breath]". See docs/14-voice.md. */
  delivery: z.string().optional(),
})

/** T9: a line in a scene — pick an intent, then build the English reply. */
const Scene = z.object({
  ...base,
  type: z.literal('scene'),
  setting: z.string(),
  lines: z.array(Line).min(1),
  intents: z
    .array(
      z.object({
        label: z.string(),
        answers,
        tiles: z.array(z.string()).optional(),
        reaction: Line,
        /** Remembered story choice, used by later scenes. */
        flag: z.string().optional(),
      }),
    )
    .min(1),
  /** Said when the reply is not understood; a language slip never reads as annoyance. */
  clarify: Line,
})

export const Exercise = z.discriminatedUnion('type', [Choice, Fill, Timeline, Translate, Fix, Transform, Sort, Reading, Listening, Dictation, Pairs, Write, Speak, Scene])

export const SESSION_KINDS = ['comprehension', 'form', 'production', 'fluency'] as const

export const Session = z.object({
  kind: z.enum(SESSION_KINDS),
  title: z.string(),
  /** Short note for the learning panel before the first exercise. */
  intro: z.string().optional(),
  /** Story beat before the exercises: where we are and why this practice matters. */
  frame: z.object({ setting: z.string(), lines: z.array(Line).min(1) }).optional(),
  /** Story beat after the session: what changed. */
  wrap: z.array(Line).min(1).optional(),
  exercises: z.array(Exercise).min(1),
})

export const Unit = z.object({
  id: z.string().regex(/^\d{3}$/),
  title: z.string(),
  goal: z.string(),
  focus: z.string(),
  /** Target words, collocations and functions (10–12 per unit), highlighted in texts. */
  expressions: z.array(z.object({ en: z.string(), ru: z.string() })),
  /** Other words in this unit's texts a learner may not know; tap to see the translation. */
  glossary: z.array(z.object({ en: z.string(), ru: z.string() })).default([]),
  /** The visible change in the story when the unit is done. */
  outcome: z.string(),
  sessions: z.array(Session).length(8),
})

export type Exercise = z.infer<typeof Exercise>
export type ExerciseOf<T extends Exercise['type']> = Extract<Exercise, { type: T }>
export type Session = z.infer<typeof Session>
export type Unit = z.infer<typeof Unit>
export type TimelineKind = z.infer<typeof TimelineKind>
export type Speaker = z.infer<typeof Speaker>
export type Line = z.infer<typeof Line>
