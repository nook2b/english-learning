import { z } from 'zod'

// Heroine pages: what the player has learned about her, shared memories,
// chat lines and personal quests (docs/12-personal-quests.md). Everything
// opens by a finished unit or by a remembered story choice (flag).

const Unlock = z.object({ unit: z.string().regex(/^\d{3}$/).optional(), flag: z.string().optional() }).refine((u) => u.unit || u.flag, 'unit or flag')

export const Character = z.object({
  id: z.enum(['mika', 'rei', 'iris']),
  name: z.string(),
  about: z.string(),
  facts: z.array(z.object({ unlock: Unlock, ru: z.string() })),
  memories: z.array(z.object({ unlock: Unlock, en: z.string(), ru: z.string() })),
  lines: z.array(z.object({ unlock: Unlock, text: z.string(), ru: z.string(), expr: z.string() })),
  quests: z.array(z.object({ id: z.string(), title: z.string(), window: z.string(), change: z.string(), flag: z.string() })),
})
export type Character = z.infer<typeof Character>
export type Unlock = z.infer<typeof Unlock>

const files = import.meta.glob<unknown>('../../../content/characters/*.json', { eager: true, import: 'default' })

export const CHARACTERS: Record<string, Character> = Object.fromEntries(
  Object.entries(files).map(([path, data]) => {
    const parsed = Character.safeParse(data)
    if (!parsed.success) throw new Error(`${path}: ${parsed.error.message}`)
    return [parsed.data.id, parsed.data]
  }),
)

export function isOpen(unlock: Unlock, units: Record<string, unknown>, flags: Record<string, unknown>): boolean {
  return (!!unlock.unit && !!units[unlock.unit]) || (!!unlock.flag && !!flags[unlock.flag])
}

/** Relationship stage by story progress (docs/00-full-plan.md, 3.8). Romance stages need the route, added later. */
export function stageOf(unitsDone: number): string {
  if (unitsDone < 20) return 'Знакомые'
  if (unitsDone < 40) return 'Свои в компании'
  if (unitsDone < 60) return 'Друзья'
  return 'Близкие друзья'
}
