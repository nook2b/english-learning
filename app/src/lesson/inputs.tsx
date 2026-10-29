import { type ReactNode, useMemo, useState } from 'react'
import { Button } from '../ui/kit'
import { shuffled } from './model'

export function TextAnswer({ initial = '', locked, onSubmit, placeholder = 'Ответ по-английски' }: { initial?: string; locked: boolean; onSubmit: (text: string) => void; placeholder?: string }) {
  const [text, setText] = useState(initial)
  return (
    <form
      className="answer"
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim() && !locked) onSubmit(text)
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={locked}
        placeholder={placeholder}
        rows={2}
        autoCapitalize="sentences"
        autoCorrect="off"
        spellCheck={false}
        lang="en"
        aria-label="Ответ"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
          }
        }}
      />
      {!locked && (
        <Button type="submit" disabled={!text.trim()}>
          Проверить
        </Button>
      )}
    </form>
  )
}

/** Word bank: tap tiles to build the sentence, tap a placed tile to return it. */
export function TileAnswer({ tiles, seed, locked, onSubmit }: { tiles: readonly string[]; seed: string; locked: boolean; onSubmit: (text: string) => void }) {
  const bank = useMemo(() => shuffled(tiles.map((t, i) => ({ t, i })), seed), [tiles, seed])
  const [picked, setPicked] = useState<number[]>([])
  const sentence = picked.map((i) => tiles[i]).join(' ')

  return (
    <div className="answer">
      <div className="tiles-line" aria-label="Собранная фраза">
        {picked.length === 0 && <span className="muted">Нажимай на слова ниже</span>}
        {picked.map((i, pos) => (
          <button key={`${i}-${pos}`} className="tile" disabled={locked} onClick={() => setPicked(picked.filter((_, p) => p !== pos))}>
            {tiles[i]}
          </button>
        ))}
      </div>
      <div className="tiles-bank">
        {bank.map(({ t, i }) => (
          <button key={i} className="tile" disabled={locked || picked.includes(i)} onClick={() => setPicked([...picked, i])}>
            {t}
          </button>
        ))}
      </div>
      {!locked && (
        <Button onClick={() => onSubmit(sentence)} disabled={picked.length === 0}>
          Проверить
        </Button>
      )}
    </div>
  )
}

export function Options<T extends string>({
  options,
  locked,
  picked,
  answer,
  onPick,
  render = (o) => o,
}: {
  options: readonly T[]
  locked: boolean
  picked?: string
  answer: string
  onPick: (option: T) => void
  render?: (option: T) => ReactNode
}) {
  return (
    <div className="options">
      {options.map((o) => {
        const state = !locked ? '' : o === answer ? 'right' : o === picked ? 'wrong' : ''
        return (
          <button key={o} className={`option ${state}`} disabled={locked} onClick={() => onPick(o)}>
            {render(o)}
          </button>
        )
      })}
    </div>
  )
}
