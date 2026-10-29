import { useState } from 'react'
import { splitGloss, useGlossary } from './glossary'

/**
 * English text with unit expressions and helper words underlined.
 * Tapping one shows its translation right below the text.
 */
export function Gloss({ text }: { text: string }) {
  const entries = useGlossary()
  const [open, setOpen] = useState<{ en: string; ru: string }>()
  const parts = splitGloss(text, entries)
  return (
    <>
      <span lang="en">
        {parts.map((p, i) =>
          typeof p === 'string' ? (
            p
          ) : (
            <button key={i} className={`gloss ${p.entry.target ? 'gloss-target' : ''}`} onClick={() => setOpen(open?.en === p.entry.en ? undefined : p.entry)}>
              {p.text}
            </button>
          ),
        )}
      </span>
      {open && (
        <span className="gloss-note" role="note">
          <span lang="en">{open.en}</span> — {open.ru}
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
