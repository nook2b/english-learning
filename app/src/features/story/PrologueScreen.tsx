import { useMemo, useRef, useState } from 'react'
import { navigate } from '../../app/router'
import type { Exercise } from '../../content/schema'
import { PLACEMENT_FLAG, PROLOGUE, PROLOGUE_FLAG } from '../../content/story'
import { useClub } from '../../data/store'
import { ExerciseRun } from '../../lesson/ExerciseRun'
import type { Outcome } from '../../lesson/model'
import { castAt } from '../../story/cast'
import { Beat } from '../../story/Stage'
import { Button, Card, LearnPanel } from '../../ui/kit'
import { PLACES, PlaceContext } from '../../story/places'
import { PlacementCheck } from './PlacementCheck'
import { SurveyStep } from './SurveyStep'

type Phase = 'survey' | 'frame' | 'scenes' | 'wrap' | 'room70' | 'check' | 'back'

/**
 * The prologue "Не тот кабинет" (docs/21-story-script.md): the wrong door
 * (heard "seventeen", not "seventy"), asking for the way again, the first
 * introductions, then the placement check in Room 70 and the way back to
 * Room 17, which opens unit 001. A newcomer answers the survey first. The meeting is never played again on return:
 * after the prologue, this screen resumes at the check.
 */
/** The prologue happens in Room 17 (its place in content/story/prologue.json). */
export function PrologueScreen() {
  return (
    <PlaceContext.Provider value={PROLOGUE.place}>
      <PrologueSteps />
    </PlaceContext.Provider>
  )
}

function PrologueSteps() {
  const { flags, remember, settings } = useClub()
  const remembered = useRef(new Set<string>())
  const resumeAt: Phase = flags[PLACEMENT_FLAG] ? 'back' : flags[PROLOGUE_FLAG] ? 'room70' : settings.survey ? 'frame' : 'survey'
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
    setPhase('back')
  }
  const exit = (
    <div className="session-head">
      <button className="close" aria-label="Выйти из пролога" onClick={() => navigate({ name: 'path' })}>
        ✕
      </button>
    </div>
  )

  if (phase === 'survey') return <SurveyStep onDone={() => setPhase('frame')} />
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
        {PLACES.room70 && <img className="place-banner" src={PLACES.room70} alt="" />}
        <Card title="Кабинет 70, новый корпус">
          <p>Ты дошёл по маршруту Айрис. В кабинете тихо, на экране — приветствие International Office. Вступительная проверка: не экзамен, а способ понять, с чего начать.</p>
        </Card>
        <Button onClick={() => setPhase('check')}>Начать проверку</Button>
      </div>
    )
  if (phase === 'check') return <PlacementCheck onExit={() => navigate({ name: 'path' })} onClose={finishCheck} closeLabel="Выйти из кабинета 70" />
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
