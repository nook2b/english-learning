import { useEffect, useState } from 'react'
import { LineVoice } from '../speech/AudioControls'
import { play, stop } from '../speech/voice'
import type { Line } from '../content/schema'
import { useClub } from '../data/store'
import { Gloss, Translation } from '../lesson/Gloss'
import { SPEAKER_NAMES } from '../lesson/model'
import { Button, DialogueBox } from '../ui/kit'
import { castAt } from './cast'
import { useMouth } from '../speech/mouth'
import { type HeroineId, HEROINE_IDS, SPRITES, isHeroine, parseExpr, resolveSprite } from './sprites'

type SpriteSize = 'stage' | 'knee' | 'avatar'

/**
 * A heroine sprite. 'stage' shows her full figure, 'knee' crops just above
 * the knees so she reads larger on a phone, 'avatar' is a round face crop.
 * While she speaks, her face alternates with the "{expr}_talk" frame
 * (mouth open) when one is drawn; otherwise she gently bobs.
 */
export function Sprite({ heroine, expr, dim = false, size = 'stage' }: { heroine: HeroineId; expr?: string; dim?: boolean; size?: SpriteSize }) {
  const ref = parseExpr(heroine, expr)
  const found = resolveSprite(ref)
  const talk = found ? SPRITES[`${found.key}_talk`] : undefined
  const mouth = useMouth(heroine)
  useEffect(() => {
    // Preload the talking frame so the first swap does not flicker.
    if (talk) new Image().src = talk
  }, [talk])
  const label = `${heroine} ${ref.pose}/${ref.expr}`
  if (!found) return <div className={`sprite sprite-missing sprite-${size}`} aria-label={label} />
  if (size === 'avatar') return <div className="sprite sprite-avatar" role="img" aria-label={label} style={{ backgroundImage: `url(${found.url})` }} />
  const src = mouth === 'open' && talk ? talk : found.url
  const img = <img className={`sprite sprite-${size} ${dim ? 'dim' : ''} ${mouth ? 'talking' : ''}`} src={src} alt={label} title={found.exact ? undefined : `замена: ${found.key}`} draggable={false} />
  return size === 'knee' ? <div className={`sprite-knee ${dim ? 'dim' : ''}`}>{img}</div> : img
}

/** Heroines on screen, ordered as on the references: Rei left, Mika centre, Iris right. */
export function Stage({ cast, speaking, compact = false }: { cast: Partial<Record<HeroineId, string>>; speaking?: string; compact?: boolean }) {
  const present = HEROINE_IDS.filter((h) => h in cast)
  if (present.length === 0) return null
  const order: HeroineId[] = ['rei', 'mika', 'iris']
  return (
    <div className={`stage stage-${present.length} ${compact ? 'stage-compact' : ''}`}>
      {order
        .filter((h) => present.includes(h))
        .map((h) => (
          <Sprite key={h} heroine={h} size="knee" expr={cast[h]} dim={!!speaking && isHeroine(speaking as HeroineId) && speaking !== h} />
        ))}
    </div>
  )
}

/** A short story beat: tap through the lines, then continue. */
export function Beat({ setting, lines, doneLabel, onDone }: { setting?: string; lines: readonly Line[]; doneLabel: string; onDone: () => void }) {
  const [i, setI] = useState(0)
  const always = useClub((s) => s.settings.translation === 'always')
  const voiceOn = useClub((s) => s.settings.voice)
  const line = lines[i]!
  // Read each line aloud as it appears when voice is on; stop when leaving the beat.
  useEffect(() => {
    if (voiceOn) play(line.text, line.speaker, false, line)
  }, [voiceOn, line])
  useEffect(() => () => stop(), [])
  const last = i === lines.length - 1
  return (
    <div className="beat">
      {setting && <p className="muted">{setting}</p>}
      <Stage cast={castAt(lines, i)} speaking={line.speaker} />
      <DialogueBox speaker={SPEAKER_NAMES[line.speaker] || undefined}>
        <LineVoice text={line.text} speaker={line.speaker} expr={line.expr} delivery={line.delivery} />
        <Gloss key={i} text={line.text} />
        <Translation key={`t${i}`} ru={line.ru} always={always} />
      </DialogueBox>
      <Button onClick={() => (last ? onDone() : setI(i + 1))}>{last ? doneLabel : 'Дальше'}</Button>
    </div>
  )
}
