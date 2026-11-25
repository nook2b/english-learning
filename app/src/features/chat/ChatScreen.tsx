import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { CHATS, CHAT_PHOTOS, type Chat, ROOM17, type ChatLine, type ChatMessage, chatMessages, openChats, replyFlag } from '../../content/chats'
import { checkTyped } from '../../lesson/check'
import { TextAnswer } from '../../lesson/inputs'
import { useClub } from '../../data/store'
import { navigate } from '../../app/router'
import { Gloss } from '../../lesson/Gloss'
import { SPEAKER_NAMES } from '../../lesson/model'
import { canVoice, clipAudio, isCurrentClip, pause, play, preload, resume, stop, useVoice } from '../../speech/voice'
import { Sprite } from '../../story/Stage'
import type { HeroineId } from '../../story/sprites'
import { Icon } from '../../ui/Icon'
import { clock, voiceTime } from './voiceTime'
import { useChatUnread } from './unread'

/** The phone: the list of chats, or "Room 17" straight away while it is the only one. */
export function ChatHome({ id }: { id?: string }) {
  const { sessions, flags, settings } = useClub()
  const chats = openChats(sessions, flags, settings.unlockAll)
  const chat = id ? CHATS[id] : undefined
  if (chat) return <ChatScreen chat={chat} />
  if (chats.length <= 1) return <ChatScreen chat={ROOM17} />
  return (
    <div className="screen chat-screen">
      <header className="chat-head">
        <button className="close" aria-label="Назад" onClick={() => (history.length > 1 ? history.back() : navigate({ name: 'path' }))}>
          ‹
        </button>
        <span className="chat-title">
          <strong>Чаты</strong>
        </span>
      </header>
      <ul className="chat-list">
        {chats.map((c) => (
          <li key={c.id}>
            <ChatListItem chat={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChatListItem({ chat }: { chat: Chat }) {
  const { sessions, flags, settings } = useClub()
  const unread = useChatUnread(chat)
  const last = chatMessages(sessions, flags, settings.unlockAll, chat).filter((m) => m.type !== 'reply' && m.type !== 'system').at(-1)
  const preview = !last ? '' : last.type === 'voice' ? 'Голосовое сообщение' : last.type === 'photo' ? 'Фото' : last.text ?? ''
  return (
    <button className="chat-list-item" onClick={() => navigate({ name: 'chat', id: chat.id })} aria-label={unread ? `${chat.title}, новых: ${unread}` : chat.title}>
      <span className="chat-avatars" aria-hidden>
        {(chat.with ? [chat.with] : chat.members).map((h) => (
          <Sprite key={h} heroine={h} expr="neutral" size="avatar" />
        ))}
      </span>
      <span className="chat-title">
        <strong>{chat.title}</strong>
        <span className="muted chat-preview">{preview}</span>
      </span>
      {unread > 0 && <span className="topbar-badge chat-list-badge">{unread}</span>}
    </button>
  )
}

/** One chat: what the team (or one heroine) sent along the course, voice messages, photos, replies. */
export function ChatScreen({ chat = ROOM17 }: { chat?: Chat }) {
  const { sessions, flags, settings, updateSettings } = useClub()
  const messages = useMemo(() => chatMessages(sessions, flags, settings.unlockAll, chat), [sessions, flags, settings.unlockAll, chat])
  // Opening a chat reads everything that has arrived in it.
  useEffect(() => {
    const seen = new Set(settings.chatSeen ?? [])
    if (messages.some((m) => !seen.has(m.id))) void updateSettings({ chatSeen: [...seen, ...messages.map((m) => m.id).filter((id) => !seen.has(id))] })
  }, [messages, settings.chatSeen, updateSettings])
  useEffect(() => () => stop(), [])
  // Like a messenger, the chat opens at the newest message.
  const end = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    end.current?.scrollIntoView?.({ block: 'end' })
  }, [])
  return (
    <div className="screen chat-screen">
      <header className="chat-head">
        <button className="close" aria-label="Назад" onClick={() => (history.length > 1 ? history.back() : navigate({ name: 'path' }))}>
          ‹
        </button>
        <span className="chat-avatars" aria-hidden>
          {(chat.with ? [chat.with] : chat.members).map((h) => (
            <Sprite key={h} heroine={h} expr="neutral" size="avatar" />
          ))}
        </span>
        <span className="chat-title">
          <strong>{chat.title}</strong>
          <span className="muted">{chat.with ? 'Личный чат' : 'Мика, Рэй, Айрис и ты'}</span>
        </span>
      </header>
      {messages.length === 0 ? (
        <p className="muted chat-empty">Здесь появятся сообщения команды. Первые придут после второго занятия юнита 003.</p>
      ) : (
        <ol className="chat-feed">
          {messages.map((m, i) => (
            <li key={m.id}>
              {(i === 0 || messages[i - 1]!.day !== m.day || messages[i - 1]!.unlock.unit !== m.unlock.unit) && <p className="chat-day">{m.day}</p>}
              <Bubble m={m} first={i === 0 || messages[i - 1]!.from !== m.from || messages[i - 1]!.day !== m.day} />
            </li>
          ))}
        </ol>
      )}
      <p className="muted chat-foot" ref={end}>
        {chat.with ? 'Ответы — кнопками прямо в ленте.' : 'Иногда можно ответить: кнопки появляются прямо в ленте.'}
      </p>
    </div>
  )
}

function Bubble({ m, first }: { m: ChatMessage; first: boolean }) {
  const always = useClub((s) => s.settings.translation === 'always' || s.settings.support)
  const [ru, setRu] = useState(false)
  if (m.type === 'system') return <p className="chat-system">{m.ru}</p>
  if (m.type === 'reply') return <Reply m={m} />
  const mine = m.from === 'me'
  const heroine = mine ? undefined : (m.from as HeroineId)
  return (
    <div className={`chat-row ${mine ? 'chat-mine' : `chat-${m.from}`}`}>
      {heroine && <span className="chat-face">{first && <Sprite heroine={heroine} expr="neutral" size="avatar" />}</span>}
      <div className="chat-bubble">
        {heroine && first && <span className="chat-name">{SPEAKER_NAMES[heroine]}</span>}
        {m.type === 'text' && <Gloss text={m.text!} />}
        {m.type === 'voice' && <Voice m={m} />}
        {m.type === 'photo' && <Photo m={m} />}
        {(m.ru || m.captionRu) && m.type !== 'voice' && (always || ru ? <span className="chat-ru">{m.type === 'photo' ? m.captionRu : m.ru}</span> : (m.type !== 'photo' || m.caption) && <button className="chat-link" onClick={() => setRu(true)}>Перевод</button>)}
      </div>
    </div>
  )
}

/** A voice message: play it (support mode: slower), then show what was said. */
function Voice({ m }: { m: ChatMessage }) {
  const speaker = m.from as HeroineId
  const state = useVoice(m.text!, speaker)
  const support = useClub((s) => s.settings.support)
  const [text, setText] = useState(false)
  useEffect(() => preload([{ text: m.text!, speaker, delivery: m.delivery }]), [m.text, speaker, m.delivery])
  const audio = clipAudio(m.text!, speaker, { delivery: m.delivery })
  const [, redraw] = useState(0)
  // The clip's length arrives with its metadata.
  useEffect(() => {
    if (!audio) return
    const on = () => redraw((n) => n + 1)
    audio.addEventListener('durationchange', on)
    return () => audio.removeEventListener('durationchange', on)
  }, [audio])
  // While it plays, the time and the wave follow the clip every frame.
  useEffect(() => {
    if (state !== 'playing' || !audio) return
    let frame = requestAnimationFrame(function step() {
      redraw((n) => n + 1)
      frame = requestAnimationFrame(step)
    })
    return () => cancelAnimationFrame(frame)
  }, [state, audio])
  const { seconds, done } = voiceTime(m.text!, audio, state !== 'idle' && !!audio && isCurrentClip(m.text!, speaker, audio), support)
  return (
    <span className="chat-voice">
      <span className="chat-voice-row">
        {canVoice() && (
          <button
            className="chat-play"
            aria-label={state === 'playing' ? 'Пауза' : 'Слушать голосовое'}
            onClick={() => (state === 'playing' ? pause() : state === 'paused' ? resume() : play(m.text!, speaker, support, { delivery: m.delivery }))}
          >
            {state === 'playing' ? '⏸' : '▶'}
          </button>
        )}
        <span
          className={`chat-wave ${state === 'playing' && !audio ? 'on' : ''}`}
          style={{ '--done': `${Math.round(done * 1000) / 10}%` } as CSSProperties}
          aria-hidden
        />
        <span className="chat-time">{clock(seconds)}</span>
      </span>
      {text ? (
        <span className="chat-transcript">
          <Gloss text={m.text!} />
          <span className="chat-ru">{m.ru}</span>
        </span>
      ) : (
        <button className="chat-link" onClick={() => setText(true)}>
          Показать текст
        </button>
      )}
    </span>
  )
}

/** A photo: the drawn picture, or what is on it until it is drawn. */
function Photo({ m }: { m: ChatMessage }) {
  const url = m.image ? CHAT_PHOTOS[m.image] : undefined
  const [big, setBig] = useState(false)
  return (
    <>
      {url ? (
        <button className="chat-photo" onClick={() => setBig(true)} aria-label={m.about}>
          <img src={url} alt={m.about ?? ''} />
        </button>
      ) : (
        <span className="chat-photo chat-photo-empty">
          <Icon name="phone" size={28} />
          <span>Фото: {m.about}</span>
        </span>
      )}
      {m.caption && <Gloss text={m.caption} />}
      {big && url && (
        <button className="chat-photo-big" onClick={() => setBig(false)} aria-label="Закрыть фото">
          <img src={url} alt={m.about ?? ''} />
        </button>
      )}
    </>
  )
}


/** A heroine's chat line in reply to the player. */
function LineBubble({ line, first }: { line: ChatLine; first: boolean }) {
  const always = useClub((s) => s.settings.translation === 'always' || s.settings.support)
  const [ru, setRu] = useState(false)
  return (
    <div className={`chat-row chat-${line.from}`}>
      <span className="chat-face">{first && <Sprite heroine={line.from} expr="neutral" size="avatar" />}</span>
      <div className="chat-bubble">
        {first && <span className="chat-name">{SPEAKER_NAMES[line.from]}</span>}
        <Gloss text={line.text} />
        {always || ru ? <span className="chat-ru">{line.ru}</span> : <button className="chat-link" onClick={() => setRu(true)}>Перевод</button>}
      </div>
    </div>
  )
}

/**
 * The player answers in the team chat: pick what to say, write it in English.
 * An answer that is not understood brings the heroine's question and another
 * try; an accepted one is kept (a flag), so the chat shows it from then on.
 */
function Reply({ m }: { m: ChatMessage }) {
  const flags = useClub((s) => s.flags)
  const remember = useClub((s) => s.remember)
  const intents = m.intents ?? []
  const done = intents.findIndex((_, i) => flags[replyFlag(m.id, i)])
  const [intent, setIntent] = useState<number>()
  const [said, setSaid] = useState<string>()
  const [missed, setMissed] = useState(false)
  if (done >= 0) {
    const chosen = intents[done]!
    return (
      <>
        <div className="chat-row chat-mine">
          <div className="chat-bubble">
            <span lang="en">{said ?? chosen.answers[0]}</span>
          </div>
        </div>
        {chosen.reaction.map((l, k) => (
          <LineBubble key={k} line={l} first={k === 0 || chosen.reaction[k - 1]!.from !== l.from} />
        ))}
      </>
    )
  }
  if (m.tap) {
    // A personal chat: the player taps a written answer; it is kept, with the story flag it carries.
    return (
      <div className="chat-reply">
        <p className="chat-reply-ask">Ответить</p>
        <div className="options">
          {intents.map((it, i) => (
            <button
              key={it.label}
              className="option chat-tap"
              onClick={() => {
                if (it.flag) void remember(it.flag)
                void remember(replyFlag(m.id, i))
              }}
            >
              <span lang="en">{it.answers[0]}</span>
              <span className="muted">{it.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }
  const chosen = intent === undefined ? undefined : intents[intent]
  const submit = (text: string) => {
    if (!chosen || intent === undefined) return
    if (!checkTyped(text, chosen.answers).correct) return setMissed(true)
    setSaid(text)
    if (chosen.flag) void remember(chosen.flag)
    void remember(replyFlag(m.id, intent))
  }
  return (
    <div className="chat-reply">
      {missed && m.clarify && <LineBubble line={m.clarify} first />}
      {!chosen ? (
        <>
          <p className="chat-reply-ask">Ответить в чат</p>
          <div className="options">
            {intents.map((it, i) => (
              <button key={it.label} className="option" onClick={() => setIntent(i)}>
                {it.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="chat-reply-ask">{chosen.label}. Напиши по-английски</p>
          <TextAnswer key={missed ? 'again' : 'first'} locked={false} onSubmit={submit} placeholder="Сообщение по-английски" />
          <button className="chat-link" onClick={() => (setIntent(undefined), setMissed(false))}>
            Выбрать другое
          </button>
        </>
      )}
    </div>
  )
}
