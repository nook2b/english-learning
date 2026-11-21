import { z } from 'zod'
import { sessionId } from '../data/db'
import type { SessionResult } from '../data/db'
import { HEROINES, shownWith } from './schema'

// The chats (docs/31-messenger-ui-brief.md): the team chat "Room 17" with voice messages,
// texts and photos the team sends along the course, and from unit 021 a personal chat with
// each heroine (docs/30-messenger-story.md). Built by scripts/build_chat.py from the units.

const ChatLine = z.object({ from: z.enum(HEROINES), text: z.string(), ru: z.string(), expr: z.string().optional() })
export type ChatLine = z.infer<typeof ChatLine>

/** The flag that keeps the player's chosen reply: "{message id}:{intent}". */
export const replyFlag = (id: string, intent: number) => `${id}:${intent}`

const Message = z.object({
  id: z.string(),
  /** Opens once this session is done. */
  unlock: z.object({ unit: z.string().regex(/^\d{3}$/), session: z.number().int().min(1).max(8) }),
  /** Day divider shown above the first message of a day. */
  day: z.string(),
  from: z.enum([...HEROINES, 'me', 'system']),
  type: z.enum(['text', 'voice', 'photo', 'system', 'reply']),
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
  /** Reply: the player picks an intent and writes it in English; the heroines react (docs/55). */
  intents: z.array(z.object({ label: z.string(), answers: z.array(z.string()).min(1), reaction: z.array(ChatLine).min(1), flag: z.string().optional() })).optional(),
  clarify: ChatLine.optional(),
  /** A ready reply: the player taps one of the written answers instead of typing (personal chats). */
  tap: z.boolean().optional(),
})
export type ChatMessage = z.infer<typeof Message>

const Chat = z.object({
  id: z.string(),
  title: z.string(),
  members: z.array(z.enum(HEROINES)),
  /** A personal chat: the heroine it is with. */
  with: z.enum(HEROINES).optional(),
  messages: z.array(Message),
})
export type Chat = z.infer<typeof Chat>

const chatFiles = import.meta.glob<unknown>('../../../content/chats/*.json', { eager: true, import: 'default' })
/** Every chat by id: "room17" and the personal ones ("dm-iris"…). */
export const CHATS: Record<string, Chat> = Object.fromEntries(Object.values(chatFiles).map((d) => Chat.parse(d)).map((c) => [c.id, c]))
export const ROOM17 = CHATS.room17!

const files = import.meta.glob<string>('../../../assets/chat/*.webp', { eager: true, query: '?url', import: 'default' })
/** Drawn chat photos by name. */
export const CHAT_PHOTOS: Record<string, string> = Object.fromEntries(Object.entries(files).map(([p, url]) => [p.replace(/^.*\//, '').replace(/\.webp$/, ''), url]))

/** Messages that have arrived: their session is done (or every session is open for testing) and the story choice matches. */
export function chatMessages(sessions: Record<string, SessionResult>, flags: Record<string, unknown>, unlockAll = false, chat: Chat = ROOM17): ChatMessage[] {
  return chat.messages.filter((m) => (unlockAll || !!sessions[sessionId(m.unlock.unit, m.unlock.session)]) && shownWith(m, flags))
}

/** The chats with something in them, the team chat first. */
export function openChats(sessions: Record<string, SessionResult>, flags: Record<string, unknown>, unlockAll = false): Chat[] {
  return Object.values(CHATS)
    .filter((c) => c.id === ROOM17.id || chatMessages(sessions, flags, unlockAll, c).length > 0)
    .sort((a, b) => (a.id === ROOM17.id ? -1 : b.id === ROOM17.id ? 1 : a.id.localeCompare(b.id)))
}
