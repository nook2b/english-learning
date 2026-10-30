import { z } from 'zod'
import data from '../../../content/tags.json'

// Tag registry: every exercise tag is either a topic (grammar or a speech
// function, with a cheat sheet) or a skill (speaking, listening...). Mistakes
// are grouped by these tags for review and the mistakes drill (stage 4).

const Tag = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('topic'), ru: z.string(), cheatsheet: z.string() }),
  z.object({ kind: z.literal('skill'), ru: z.string() }),
])

export const TAGS: Record<string, z.infer<typeof Tag>> = z.record(z.string(), Tag).parse(data)
