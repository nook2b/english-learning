import { useState } from 'react'
import type { Line } from '../content/schema'
import { useClub } from '../data/store'
import { Gloss, Translation } from '../lesson/Gloss'
import { SPEAKER_NAMES } from '../lesson/model'
import { Button, DialogueBox } from '../ui/kit'
import { castAt } from './cast'
import { type HeroineId, HEROINE_IDS, parseExpr, resolveSprite } from './sprites'

export function Sprite({ heroine, expr, dim = false, size = 'stage' }: { heroine: HeroineId; expr?: string; dim?: boolean; size?: 'stage' | 'avatar' }) {
  const ref = parseExpr(heroine, expr)
  const found = resolveSprite(ref)
  const label = `${heroine} ${ref.pose}/${ref.expr}`
  if (!found) return <div className={`sprite sprite-missing sprite-${size}`} aria-label={label} />
  // Avatars crop the face out of the full-body sprite.
  if (size === 'avatar') return <div className="sprite sprite-avatar" role="img" aria-label={label} style={{ backgroundImage: `url(${found.url})` }} />
  return <img className={`sprite sprite-${size} ${dim ? 'dim' : ''}`} src={found.url} alt={label} title={found.exact ? undefined : `замена: ${found.key}`} draggable={false} />
}

/** Heroines on screen, ordered as on the references: Rei left, Mika centre, Iris right. */
export function Stage({ cast, speaking }: { cast: Partial<Record<HeroineId, string>>; speaking?: string }) {
  const present = HEROINE_IDS.filter((h) => h in cast)
  if (present.length === 0) return null
  const order: HeroineId[] = ['rei', 'mika', 'iris']
  return (
    <div className={`stage stage-${present.length}`}>
      {order
        .filter((h) => present.includes(h))
        .map((h) => (
          <Sprite key={h} heroine={h} expr={cast[h]} dim={!!speaking && speaking !== h} />
        ))}
    </div>
  )
}

/** A short story beat: tap through the lines, then continue. */
export function Beat({ setting, lines, doneLabel, onDone }: { setting?: string; lines: readonly Line[]; doneLabel: string; onDone: () => void }) {
  const [i, setI] = useState(0)
  const always = useClub((s) => s.settings.translation === 'always')
  const line = lines[i]!
  const last = i === lines.length - 1
  return (
    <div className="beat">
      {setting && <p className="muted">{setting}</p>}
      <Stage cast={castAt(lines, i)} speaking={line.speaker} />
      <DialogueBox speaker={SPEAKER_NAMES[line.speaker] || undefined}>
        <Gloss key={i} text={line.text} />
        <Translation key={`t${i}`} ru={line.ru} always={always} />
      </DialogueBox>
      <Button onClick={() => (last ? onDone() : setI(i + 1))}>{last ? doneLabel : 'Дальше'}</Button>
    </div>
  )
}
