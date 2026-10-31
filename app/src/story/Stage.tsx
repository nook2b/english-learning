import { useEffect, useState } from 'react'
import { LineVoice } from '../speech/AudioControls'
import { play, preload, stop } from '../speech/voice'
import type { Line } from '../content/schema'
import { useClub, alwaysTranslate } from '../data/store'
import { Gloss, Translation } from '../lesson/Gloss'
import { SPEAKER_NAMES } from '../lesson/model'
import { Button, DialogueBox } from '../ui/kit'
import { castAt } from './cast'
import { PLACES, usePlace } from './places'
import { hasFigure, riveHasFace } from './figures'
import { RiveFigure } from './HeroineFigure'
import { useMouth } from '../speech/mouth'
import { type HeroineId, HEROINE_IDS, SPRITE_H, SPRITE_W, TALK, isHeroine, parseExpr, resolveSprite } from './sprites'

type SpriteSize = 'stage' | 'knee' | 'avatar'

/** A face every pose has, kept on a hidden Rive figure while the scene asks for a face it lacks. */
const FIRST_FACE: Record<string, string> = { stand: 'neutral', phone: 'focused', recorder: 'focused', notebook: 'focused', cheer: 'happy', arms_crossed: 'guarded', turn: 'dry_smile' }

/**
 * A heroine sprite. 'stage' shows her full figure, 'knee' crops just above
 * the knees so she reads larger on a phone, 'avatar' is a round face crop.
 * While she speaks, a mouth patch ("{expr}_talk") is laid over the face on
 * each syllable when one is drawn; otherwise she gently bobs.
 */
export function Sprite({ heroine, expr, dim = false, size = 'stage', animate = false }: { heroine: HeroineId; expr?: string; dim?: boolean; size?: SpriteSize; animate?: boolean }) {
  const ref = parseExpr(heroine, expr)
  const found = resolveSprite(ref)
  const mouth = useMouth(heroine)
  // In scenes she is a Rive figure when her pose has this face; other faces stay sprites.
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const rive = animate && size !== 'avatar' && !failed && hasFigure(heroine, ref.pose)
  const face = riveHasFace(heroine, ref.pose, ref.expr)
  const live = rive && ready && face
  const talk = found && !live ? TALK[found.key] : undefined
  useEffect(() => {
    // Preload the mouth patch so the first syllable does not flicker.
    if (talk) new Image().src = talk.url
  }, [talk])
  const label = `${heroine} ${ref.pose}/${ref.expr}`
  if (!found) return <div className={`sprite sprite-missing sprite-${size}`} aria-label={label} />
  if (size === 'avatar') return <div className="sprite sprite-avatar" role="img" aria-label={label} style={{ backgroundImage: `url(${found.url})` }} />
  const frame = (
    <div className={`sprite-frame sprite-${size} ${dim ? 'dim' : ''} ${mouth ? 'talking' : ''} ${live ? 'rive-on' : ''}`}>
      {rive && <RiveFigure heroine={heroine} pose={ref.pose} expression={face ? ref.expr : (FIRST_FACE[ref.pose] ?? 'neutral')} visible={face} onReady={() => setReady(true)} onFail={() => setFailed(true)} />}
      <img className="sprite" style={live ? { visibility: 'hidden' } : undefined} src={found.url} alt={label} title={found.exact ? undefined : `замена: ${found.key}`} draggable={false} />
      {talk && mouth === 'open' && (
        <img
          className="sprite-mouth"
          src={talk.url}
          alt=""
          draggable={false}
          style={{
            left: `${(talk.x / SPRITE_W) * 100}%`,
            top: `${(talk.y / SPRITE_H) * 100}%`,
            width: `${(talk.w / SPRITE_W) * 100}%`,
            height: `${(talk.h / SPRITE_H) * 100}%`,
          }}
        />
      )}
    </div>
  )
  return size === 'knee' ? <div className={`sprite-knee ${dim ? 'dim' : ''}`}>{frame}</div> : frame
}

/** Heroines on screen, ordered as on the references: Rei left, Mika centre, Iris right. */
export function Stage({ cast, speaking, compact = false }: { cast: Partial<Record<HeroineId, string>>; speaking?: string; compact?: boolean }) {
  const place = usePlace()
  const present = HEROINE_IDS.filter((h) => h in cast)
  if (present.length === 0) return null
  const order: HeroineId[] = ['rei', 'mika', 'iris']
  const bg = place ? PLACES[place] : undefined
  return (
    <div className={`stage stage-${present.length} ${compact ? 'stage-compact' : ''} ${bg ? 'stage-bg' : ''}`} style={bg ? { backgroundImage: `url(${bg})` } : undefined}>
      {order
        .filter((h) => present.includes(h))
        .map((h) => (
          <Sprite key={h} heroine={h} size="knee" animate expr={cast[h]} dim={!!speaking && isHeroine(speaking as HeroineId) && speaking !== h} />
        ))}
    </div>
  )
}

/** A short story beat: tap through the lines, then continue. */
export function Beat({ setting, lines, doneLabel, onDone }: { setting?: string; lines: readonly Line[]; doneLabel: string; onDone: () => void }) {
  const [i, setI] = useState(0)
  const always = useClub((s) => alwaysTranslate(s.settings))
  const voiceOn = useClub((s) => s.settings.voice)
  const line = lines[i]!
  // Read each line aloud as it appears when voice is on; stop when leaving the beat.
  useEffect(() => {
    if (voiceOn) play(line.text, line.speaker, false, line)
  }, [voiceOn, line])
  // Fetch the whole beat's clips now, so lines start without a loading pause.
  useEffect(() => preload(lines), [lines])
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
