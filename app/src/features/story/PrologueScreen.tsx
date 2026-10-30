import { useMemo, useRef, useState } from 'react'
import { navigate } from '../../app/router'
import type { Exercise } from '../../content/schema'
import { PROLOGUE, PROLOGUE_FLAG } from '../../content/story'
import { useClub } from '../../data/store'
import { ExerciseRun } from '../../lesson/ExerciseRun'
import type { Outcome } from '../../lesson/model'
import { playSfx } from '../../speech/sfx'
import { castAt } from '../../story/cast'
import { Beat } from '../../story/Stage'
import { Button, Card } from '../../ui/kit'

/**
 * The prologue "Не тот кабинет" (docs/06-story-bible.md, scene 1): the wrong
 * door, asking for the way again, the first introductions. Choices are
 * remembered like in unit scenes; at the end the path opens on unit 001.
 */
export function PrologueScreen() {
  const remember = useClub((s) => s.remember)
  const sounds = useClub((s) => s.settings.sounds)
  const remembered = useRef(new Set<string>())
  const [phase, setPhase] = useState<'frame' | 'scenes' | 'wrap' | 'done'>('frame')
  const cast = useMemo(() => castAt(PROLOGUE.frame!.lines, PROLOGUE.frame!.lines.length - 1), [])

  const onAnswer = (_: Exercise, o: Outcome) => {
    if (o.flag && !remembered.current.has(o.flag)) {
      remembered.current.add(o.flag)
      void remember(o.flag)
    }
  }
  const finish = async () => {
    await remember(PROLOGUE_FLAG)
    if (sounds) playSfx('done')
    setPhase('done')
  }

  if (phase === 'frame')
    return (
      <div className="screen">
        <div className="session-head">
          <button className="close" aria-label="Выйти из пролога" onClick={() => navigate({ name: 'path' })}>
            ✕
          </button>
        </div>
        <Beat setting={PROLOGUE.frame!.setting} lines={PROLOGUE.frame!.lines} doneLabel="Дальше" onDone={() => setPhase('scenes')} />
      </div>
    )
  if (phase === 'scenes')
    return <ExerciseRun exercises={PROLOGUE.exercises} heading={PROLOGUE.title} cast={cast} onAnswer={onAnswer} onFinish={() => setPhase('wrap')} onExit={() => navigate({ name: 'path' })} />
  if (phase === 'wrap')
    return (
      <div className="screen">
        <Beat lines={PROLOGUE.wrap!} doneLabel="Дальше" onDone={finish} />
      </div>
    )
  return (
    <div className="screen">
      <Card title="Пролог пройден">
        <p>Ты нашёл комнату 17 — хотя искал кабинет 70. Тебя позвали вернуться после проверки.</p>
        <p className="muted">В кабинете 70 ждёт вступительная проверка уровня. Она появится позже, а пока — сразу в юнит 001.</p>
      </Card>
      <Button onClick={() => navigate({ name: 'session', unitId: '001', index: 1 })}>Вернуться в комнату 17: юнит 001</Button>
      <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
        На путь
      </Button>
    </div>
  )
}
