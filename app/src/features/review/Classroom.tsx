import type { AfterClassState } from '../../content/afterClass'
import { AFTER_CLASS } from '../../content/afterClass'
import { useClub, alwaysTranslate } from '../../data/store'
import { Gloss, Translation } from '../../lesson/Gloss'
import { SPEAKER_NAMES } from '../../lesson/model'
import { LineVoice } from '../../speech/AudioControls'
import { Sprite } from '../../story/Stage'
import type { HeroineId } from '../../story/sprites'
import { DialogueBox } from '../../ui/kit'

// The empty classroom after class: a background and two heroines at their
// desks, each in her own way (docs/19-after-class-brief.md). Until the art is
// drawn, a plain backdrop and the regular sprites stand in.

const files = import.meta.glob<string>('../../../../assets/after-class/*.webp', { eager: true, query: '?url', import: 'default' })
const ART: Record<string, string> = Object.fromEntries(Object.entries(files).map(([p, url]) => [p.replace(/^.*\//, '').replace(/\.webp$/, ''), url]))

/** Each heroine's way of sitting after class, and her look when a round is done. */
const POSE: Record<HeroineId, { idle: string; done: string; expr: string }> = {
  iris: { idle: 'iris_attentive', done: 'iris_done', expr: 'happy' },
  rei: { idle: 'rei_sprawled', done: 'rei_done', expr: 'smirk' },
  mika: { idle: 'mika_phone', done: 'mika_done', expr: 'phone/neutral' },
}

function Desk({ heroine, done }: { heroine: HeroineId; done: boolean }) {
  const pose = POSE[heroine]
  const url = (done && ART[pose.done]) || ART[pose.idle]
  return <div className="desk">{url ? <img src={url} alt="" draggable={false} /> : <Sprite heroine={heroine} expr={pose.expr} size="knee" />}</div>
}

export function Classroom({ pair, state }: { pair: readonly [HeroineId, HeroineId]; state: AfterClassState }) {
  const always = useClub((s) => alwaysTranslate(s.settings))
  // The first of the pair speaks; the line fits what is waiting for the learner.
  const speaker = pair[0]
  const line = AFTER_CLASS[speaker][state]
  return (
    <div className="classroom">
      <div className="classroom-scene" style={ART.classroom ? { backgroundImage: `url(${ART.classroom})` } : undefined}>
        <Desk heroine={pair[0]} done={state === 'done'} />
        <Desk heroine={pair[1]} done={state === 'done'} />
      </div>
      <DialogueBox speaker={SPEAKER_NAMES[speaker]}>
        <LineVoice text={line.text} speaker={speaker} expr={line.expr} delivery={line.delivery} />
        <Gloss key={state} text={line.text} />
        <Translation key={`t${state}`} ru={line.ru} always={always} />
      </DialogueBox>
    </div>
  )
}
