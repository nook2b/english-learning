import { useState } from 'react'
import { logLookup } from '../data/db'
import { keyOf, lookup, WORD } from './dictionary'
import { splitGloss, useGlossary } from './glossary'

interface Note {
  /** What was tapped, to toggle the note on a second tap. */
  key: string
  en: string
  base?: string
  ru?: string
  /** One of the expressions this unit teaches. */
  target?: boolean
}

/** Plain text with every word tappable. */
function Words({ text, onTap }: { text: string; onTap: (word: string) => void }) {
  const parts: (string | { word: string })[] = []
  let last = 0
  for (const m of text.matchAll(WORD)) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push({ word: m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      p
    ) : (
      <button key={i} className="word" onClick={() => onTap(p.word)}>
        {p.word}
      </button>
    ),
  )
}

/**
 * English text where any word can be tapped for its translation, shown right
 * below the text. Only the expressions the unit teaches are underlined, and
 * their note says so. Set phrases from the unit glossary ("dining hall") are
 * not marked but translate as a whole.
 */
export function Gloss({ text }: { text: string }) {
  const entries = useGlossary()
  const [open, setOpen] = useState<Note>()
  const show = (note: Note) => {
    if (open?.key === note.key) return setOpen(undefined)
    setOpen(note)
    void logLookup(keyOf(note.base ?? note.en)).catch(() => {})
  }
  const tapWord = (word: string) => show({ key: keyOf(word), en: word, ...lookup(word) })
  const parts = splitGloss(text, entries)
  return (
    <>
      <span lang="en">
        {parts.map((p, i) =>
          typeof p === 'string' ? (
            <Words key={i} text={p} onTap={tapWord} />
          ) : (
            <button key={i} className={p.entry.target ? 'word gloss-target' : 'word'} onClick={() => show({ key: keyOf(p.entry.en), en: p.entry.en, ru: p.entry.ru, target: p.entry.target })}>
              {p.text}
            </button>
          ),
        )}
      </span>
      {open && (
        <span className="gloss-note" role="note">
          {open.target && <span className="gloss-label">Учим в этом юните</span>}
          <span lang="en">{open.en}</span>
          {open.base && (
            <>
              {' '}
              → <span lang="en">{open.base}</span>
            </>
          )}
          {open.ru ? ` — ${open.ru}` : ' — нет в словаре, посмотри перевод реплики'}
        </span>
      )}
    </>
  )
}

/** A line's translation behind a button, or always shown when the setting says so. */
export function Translation({ ru, always }: { ru?: string; always: boolean }) {
  const [shown, setShown] = useState(always)
  if (!ru) return null
  return shown ? (
    <span className="translation">{ru}</span>
  ) : (
    <button className="link translation-toggle" onClick={() => setShown(true)}>
      Перевод
    </button>
  )
}
