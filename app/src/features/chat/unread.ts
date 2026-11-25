import { useMemo } from 'react'
import { type Chat, chatMessages, openChats } from '../../content/chats'
import { useClub } from '../../data/store'

/** Unread messages: arrived and not seen yet, in one chat or in all of them. */
export function useChatUnread(chat?: Chat): number {
  const { sessions, flags, settings } = useClub()
  return useMemo(() => {
    const seen = new Set(settings.chatSeen ?? [])
    const chats = chat ? [chat] : openChats(sessions, flags, settings.unlockAll)
    return chats.flatMap((c) => chatMessages(sessions, flags, settings.unlockAll, c)).filter((m) => !seen.has(m.id)).length
  }, [chat, sessions, flags, settings.chatSeen, settings.unlockAll])
}
