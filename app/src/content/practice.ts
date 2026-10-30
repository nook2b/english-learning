import { z } from 'zod'
import { Exercise } from './schema'

// Practice bank for the after-class review: close variations of the course
// tasks, by topic (content/practice/{tag}.json). Each item names the unit
// whose words it uses, so review only picks what the learner has met.

const PracticeFile = z.object({
  tag: z.string(),
  items: z.array(z.object({ unit: z.string().regex(/^\d{3}$/), exercise: Exercise })),
})

export type PracticeItem = z.infer<typeof PracticeFile>['items'][number]

const files = import.meta.glob<unknown>('../../../content/practice/*.json', { eager: true, import: 'default' })

export const PRACTICE: Record<string, PracticeItem[]> = Object.fromEntries(
  Object.entries(files).map(([path, data]) => {
    const parsed = PracticeFile.safeParse(data)
    if (!parsed.success) throw new Error(`${path}: ${parsed.error.message}`)
    return [parsed.data.tag, parsed.data.items]
  }),
)
