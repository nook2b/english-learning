import { z } from 'zod'
import data from '../../../content/chats/room17.json'
import { sessionId } from '../data/db'
import type { SessionResult } from '../data/db'
import { HEROINES, shownWith } from './schema'

// The team chat "Room 17" (docs/31-messenger-ui-brief.md): voice messages, texts and
// photos the team sends along the course. Built by scripts/build_chat.py from the units.

const Message = z.object({
  id: z.string(),
  /** Opens once this session is done. */
  unlock: z.object({ unit: z.string().regex(/^\d{3}$/), session: z.number().int().min(1).max(8) }),
  /** Day divider shown above the first message of a day. */
  day: z.string(),
  from: z.enum([...HEROINES, 'me', 'system']),
  type: z.enum(['text', 'voice', 'photo', 'system']),
  text: z.string().optional(),
  ru: z.string().optional(),
  delivery: z.string().optional(),
  /** Photo: assets/chat/{image}.webp; until drawn, `about` describes it. */
  image: z.string().optional(),
  about: z.string().optional(),
  caption: z.string().optional(),
  captionRu: z.string().optional(),
  if: z.string().optional(),
  ifNot: z.string().optional(),
})
export type ChatMessage = z.infer<typeof Message>

export const ROOM17 = z.object({ id: z.string(), title: z.string(), members: z.array(z.enum(HEROINES)), messages: z.array(Message) }).parse(data)

const files = import.meta.glob<string>('../../../assets/chat/*.webp', { eager: true, query: '?url', import: 'default' })
/** Drawn chat photos by name. */
export const CHAT_PHOTOS: Record<string, string> = Object.fromEntries(Object.entries(files).map(([p, url]) => [p.replace(/^.*\//, '').replace(/\.webp$/, ''), url]))

/** Messages that have arrived: their session is done (or every session is open for testing) and the story choice matches. */
export function chatMessages(sessions: Record<string, SessionResult>, flags: Record<string, unknown>, unlockAll = false): ChatMessage[] {
  return ROOM17.messages.filter((m) => (unlockAll || !!sessions[sessionId(m.unlock.unit, m.unlock.session)]) && shownWith(m, flags))
}
