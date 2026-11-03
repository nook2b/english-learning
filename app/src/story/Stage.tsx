import { useEffect, useMemo, useState } from 'react'
import { LineVoice } from '../speech/AudioControls'
import { play, preload, stop } from '../speech/voice'
import { type Line, shownWith } from '../content/schema'
import { useClub, alwaysTranslate } from '../data/store'
import { Gloss, Translation } from '../lesson/Gloss'
import { SPEAKER_NAMES } from '../lesson/model'
import { Button, DialogueBox } from '../ui/kit'
import { castAt } from './cast'
import { PLACES, usePlace } from './places'
import { hasFigure, riveCanTurn, riveHasFace, turnedPose } from './figures'
import { RiveFigure } from './HeroineFigure'
import { useMouth } from '../speech/mouth'
import { type HeroineId, HEROINE_IDS, SIMILAR, SPRITE_H, SPRITE_W, TALK, isHeroine, parseExpr, resolveSprite } from './sprites'

type SpriteSize = 'stage' | 'knee' | 'avatar'

/** A face every pose has, kept on a hidden Rive figure while the scene asks for a face it lacks. */
const FIRST_FACE: Record<string, string> = { stand: 'neutral', phone: 'focused', recorder: 'focused', notebook: 'focused', cheer: 'happy', arms_crossed: 'guarded', turn: 'dry_smile' }

/**
 * A heroine sprite. 'stage' shows her full figure, 'knee' crops just above
 * the knees so she reads larger on a phone, 'avatar' is a round face crop.
 * While she speaks, a mouth patch ("{expr}_talk") is laid over the face on
 * each syllable when one is drawn; otherwise she gently bobs.
 */
export function Sprite({
  heroine,
  expr,
  dim = false,
  size = 'stage',
  animate = false,
  lean = 0,
  look,
  mark,
}: {
  heroine: HeroineId
  expr?: string
  dim?: boolean
  size?: SpriteSize
  animate?: boolean
  lean?: number
  /** Turned to a side of the screen (Rive only; the sprite underneath stays front). */
  look?: 'left' | 'right'
  mark?: string
}) {
  const front = parseExpr(heroine, expr)
  // Turned to a side: a pose drawn turned as its own artboard and sprites ("stand_left"), or Mika's `look`.
  const turned = look ? turnedPose(heroine, front.pose, look) : undefined
  const ref = turned ? { ...front, pose: turned } : front
  const found = resolveSprite(ref)
  const mouth = useMouth(heroine)
  // In scenes she is a Rive figure when her pose has this face; other faces stay sprites.
  const [readyPose, setReadyPose] = useState<string>()
  const [failed, setFailed] = useState(false)
  const rive = animate && size !== 'avatar' && !failed && hasFigure(heroine, ref.pose)
  const face = riveHasFace(heroine, ref.pose, ref.expr)
  // A newly chosen artboard loads under the sprite of the same pose, so the switch does not flash.
  const live = rive && readyPose === ref.pose && face
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
      {rive && <RiveFigure heroine={heroine} pose={ref.pose} expression={face ? ref.expr : (FIRST_FACE[ref.pose] ?? 'neutral')} visible={face} lean={lean} look={turned ? undefined : look} mark={mark} onReady={() => setReadyPose(ref.pose)} onFail={() => setFailed(true)} />}
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

/**
 * Listeners face the heroine who speaks: they turn to her side of the screen.
 * A pose without a drawn turn (Mika with her phone) or a face without one
 * (focused) turns from the standing pose with the closest drawn face while
 * she listens, and goes back when she speaks. Only when nothing turned is
 * drawn does she lean instead (−1 left, 1 right).
 */
function attention(h: HeroineId, expr: string | undefined, speaking: string | undefined, order: HeroineId[]): { look?: 'left' | 'right'; lean: number; expr?: string } {
  if (!speaking || speaking === h || !isHeroine(speaking as HeroineId)) return { lean: 0 }
  const lean = Math.sign(order.indexOf(speaking as HeroineId) - order.indexOf(h))
  const side = lean < 0 ? 'left' : 'right'
  const ref = parseExpr(h, expr)
  if (riveCanTurn(h, ref.pose, ref.expr, side)) return { look: side, lean: 0 }
  // Changing pose only pays off when the Rive figure can actually turn.
  const face = hasFigure(h, 'stand') ? [ref.expr, ...similarFaces(ref.expr)].find((e) => riveCanTurn(h, 'stand', e, side)) : undefined
  return face ? { look: side, lean: 0, expr: face } : { lean }
}

/** Sprite props of a listener: her face (the turned stand face when it replaces her pose), turn and lean. */
function withAttention(h: HeroineId, expr: string | undefined, speaking: string | undefined, order: HeroineId[]) {
  const { expr: turned, ...rest } = attention(h, expr, speaking, order)
  return { expr: turned ?? expr, ...rest }
}

/** The closest drawn faces of an emotion, in the order sprites fall back to them. */
function similarFaces(expr: string): string[] {
  const out: string[] = []
  for (let e = SIMILAR[expr]; e && !out.includes(e); e = SIMILAR[e]) out.push(e)
  return [...out, 'neutral']
}

/** Heroines on screen, ordered as on the references: Rei left, Mika centre, Iris right. */
export function Stage({
  cast,
  speaking,
  marks = {},
}: {
  cast: Partial<Record<HeroineId, string>>
  speaking?: string
  /** Manga marks of the current line's speaker. */
  marks?: Partial<Record<string, string>>
}) {
  const place = usePlace()
  const present = HEROINE_IDS.filter((h) => h in cast)
  if (present.length === 0) return null
  const order: HeroineId[] = ['rei', 'mika', 'iris']
  const bg = place ? PLACES[place] : undefined
  return (
    <div className={`stage stage-${present.length} ${bg ? 'stage-bg' : ''}`} style={bg ? { backgroundImage: `url(${bg})` } : undefined}>
      {order
        .filter((h) => present.includes(h))
        .map((h) => (
          <Sprite
            key={h}
            heroine={h}
            size="knee"
            animate
            dim={!!speaking && isHeroine(speaking as HeroineId) && speaking !== h}
            {...withAttention(h, cast[h], speaking, order)}
            mark={marks[h]}
          />
        ))}
    </div>
  )
}

/** A short story beat: tap through the lines, then continue. */
export function Beat({ setting, lines: all, doneLabel, onDone }: { setting?: string; lines: readonly Line[]; doneLabel: string; onDone: () => void }) {
  // Lines that depend on an earlier story choice show only when it was made.
  const flags = useClub((s) => s.flags)
  const lines = useMemo(() => all.filter((l) => shownWith(l, flags)), [all, flags])
  const [i, setI] = useState(0)
  const always = useClub((s) => alwaysTranslate(s.settings))
  const voiceOn = useClub((s) => s.settings.voice)
  const line = lines[i]!
  // Read each line aloud as it appears when voice is on; stop when leaving the beat.
  useEffect(() => {
    // Narrator text (a card, a note) is read, not voiced.
    if (voiceOn && line.speaker !== 'narrator') play(line.text, line.speaker, false, line)
  }, [voiceOn, line])
  // Fetch the whole beat's clips now, so lines start without a loading pause.
  useEffect(() => preload(lines), [lines])
  useEffect(() => () => stop(), [])
  const last = i === lines.length - 1
  return (
    <div className="beat">
      {setting && <p className="muted">{setting}</p>}
      <Stage cast={castAt(lines, i)} speaking={line.speaker} marks={line.mark ? { [line.speaker]: line.mark } : undefined} />
      <DialogueBox speaker={SPEAKER_NAMES[line.speaker] || undefined}>
        <LineVoice text={line.text} speaker={line.speaker} expr={line.expr} delivery={line.delivery} />
        <Gloss key={i} text={line.text} />
        <Translation key={`t${i}`} ru={line.ru} always={always} />
      </DialogueBox>
      <Button onClick={() => (last ? onDone() : setI(i + 1))}>{last ? doneLabel : 'Дальше'}</Button>
    </div>
  )
}
