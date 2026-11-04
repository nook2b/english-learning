import { useMemo } from 'react'
import { chatMessages } from '../../content/chats'
import { useClub } from '../../data/store'

/** Unread team chat messages: arrived and not seen yet. */
export function useChatUnread(): number {
  const { sessions, flags, settings } = useClub()
  return useMemo(() => {
    const seen = new Set(settings.chatSeen ?? [])
    return chatMessages(sessions, flags, settings.unlockAll).filter((m) => !seen.has(m.id)).length
  }, [sessions, flags, settings.chatSeen, settings.unlockAll])
}
