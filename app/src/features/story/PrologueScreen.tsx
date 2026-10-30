import { useMemo, useRef, useState } from 'react'
import { navigate } from '../../app/router'
import type { Exercise } from '../../content/schema'
import { PLACEMENT_FLAG, PROLOGUE, PROLOGUE_FLAG } from '../../content/story'
import { useClub } from '../../data/store'
import { ExerciseRun } from '../../lesson/ExerciseRun'
import type { Outcome } from '../../lesson/model'
import { playSfx } from '../../speech/sfx'
import { castAt } from '../../story/cast'
import { Beat } from '../../story/Stage'
import { Button, Card, LearnPanel } from '../../ui/kit'

type Phase = 'frame' | 'scenes' | 'wrap' | 'room70' | 'back'

/**
 * The prologue "Не тот кабинет" (docs/21-story-script.md): the wrong door
 * (heard "seventeen", not "seventy"), asking for the way again, the first
 * introductions, then the placement check in Room 70 and the way back to
 * Room 17, which opens unit 001. The meeting is never played again on return:
 * after the prologue, this screen resumes at the check.
 */
export function PrologueScreen() {
  const { flags, remember, settings } = useClub()
  const remembered = useRef(new Set<string>())
  const resumeAt: Phase = flags[PLACEMENT_FLAG] ? 'back' : flags[PROLOGUE_FLAG] ? 'room70' : 'frame'
  const [phase, setPhase] = useState<Phase>(resumeAt)
  const cast = useMemo(() => castAt(PROLOGUE.frame!.lines, PROLOGUE.frame!.lines.length - 1), [])

  const onAnswer = (_: Exercise, o: Outcome) => {
    // A choice is remembered once the answer is accepted; a slip only brings the clarification.
    if (o.correct && o.flag && !remembered.current.has(o.flag)) {
      remembered.current.add(o.flag)
      void remember(o.flag)
    }
  }
  const finishPrologue = async () => {
    await remember(PROLOGUE_FLAG)
    setPhase('room70')
  }
  const finishCheck = async () => {
    await remember(PLACEMENT_FLAG)
    if (settings.sounds) playSfx('done')
    setPhase('back')
  }
  const exit = (
    <div className="session-head">
      <button className="close" aria-label="Выйти из пролога" onClick={() => navigate({ name: 'path' })}>
        ✕
      </button>
    </div>
  )

  if (phase === 'frame')
    return (
      <div className="screen">
        {exit}
        {PROLOGUE.intro && <LearnPanel title="Пролог">{PROLOGUE.intro}</LearnPanel>}
        <Beat setting={PROLOGUE.frame!.setting} lines={PROLOGUE.frame!.lines} doneLabel="Дальше" onDone={() => setPhase('scenes')} />
      </div>
    )
  if (phase === 'scenes')
    return <ExerciseRun exercises={PROLOGUE.exercises} heading={PROLOGUE.title} cast={cast} onAnswer={onAnswer} onFinish={() => setPhase('wrap')} onExit={() => navigate({ name: 'path' })} />
  if (phase === 'wrap')
    return (
      <div className="screen">
        <Beat lines={PROLOGUE.wrap!} doneLabel="Дальше" onDone={finishPrologue} />
        <p className="muted">Ты уходишь на проверку с листком Айрис.</p>
      </div>
    )
  if (phase === 'room70')
    return (
      <div className="screen">
        {exit}
        <Card title="Кабинет 70, новый корпус">
          <p>Ты дошёл по маршруту Айрис. Вступительная проверка уровня начинается.</p>
          <p className="muted">Сам мини-тест появится в следующем обновлении приложения. Пока проверка засчитывается без заданий.</p>
        </Card>
        <Button onClick={finishCheck}>Завершить проверку</Button>
      </div>
    )
  return (
    <div className="screen">
      <Card title="Проверка закончена">
        <p>На телефоне — памятка первой недели. На обороте листка с маршрутом ты снова замечаешь схему комнаты 17. Тебя звали зайти после проверки.</p>
      </Card>
      <Button onClick={() => navigate({ name: 'session', unitId: '001', index: 1 })}>Вернуться в комнату 17</Button>
      <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
        На путь
      </Button>
    </div>
  )
}
