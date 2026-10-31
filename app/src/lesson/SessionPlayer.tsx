import { useMemo, useRef, useState } from 'react'
import { nextSession } from '../content/course'
import type { Exercise, Unit } from '../content/schema'
import { addDeferred } from '../data/db'
import { useClub } from '../data/store'
import { navigate } from '../app/router'
import { Button, Card, LearnPanel } from '../ui/kit'
import { playSfx } from '../speech/sfx'
import { castAt } from '../story/cast'
import { Beat } from '../story/Stage'
import { type Attempt, ExerciseRun } from './ExerciseRun'
import { GlossaryContext, unitGlossary } from './glossary'
import { PlaceContext } from '../story/places'
import { KIND_LABELS, type Outcome } from './model'

interface Summary {
  correct: number
  total: number
  skipped: number
  /** This session finished the unit: show what changed in the story. */
  unitCompleted: boolean
  minutes: number
  xp: number
  mistakes: { given: string; expected: string }[]
}

export function SessionPlayer({ unit, index }: { unit: Unit; index: number }) {
  const session = unit.sessions[index - 1]!
  const remembered = useRef(new Set<string>())
  const cast = useMemo(() => (session.frame ? castAt(session.frame.lines, session.frame.lines.length - 1) : {}), [session])
  const finishSession = useClub((s) => s.finishSession)
  const remember = useClub((s) => s.remember)
  const noteMistake = useClub((s) => s.noteMistake)
  const refreshReview = useClub((s) => s.refreshReview)
  const sounds = useClub((s) => s.settings.sounds)
  const glossary = useMemo(() => unitGlossary(unit), [unit])
  const [summary, setSummary] = useState<Summary>()
  // A session is a small story beat: frame → exercises → wrap → summary.
  const [phase, setPhase] = useState<'frame' | 'exercises' | 'wrap' | 'done'>(session.frame ? 'frame' : 'exercises')

  const onAnswer = (exercise: Exercise, o: Outcome, retry: boolean) => {
    // A story choice is remembered once its answer is accepted (a slip brings a clarification and a retry).
    if (o.correct !== false && o.flag && !remembered.current.has(o.flag)) {
      remembered.current.add(o.flag)
      void remember(o.flag)
    }
    if (retry) return
    // "Can't speak now" is kept, so the task really comes back in review.
    if (o.correct === null) void addDeferred({ exerciseId: exercise.id, unitId: unit.id, index }).then(refreshReview, () => {})
    if (o.correct === false) void noteMistake({ exerciseId: exercise.id, tags: exercise.tags, given: o.given, expected: o.shown ?? o.expected, at: Date.now() }).catch(() => {})
  }

  const onFinish = async (attempts: Attempt[], seconds: number) => {
    const answered = attempts.filter((a) => a.outcome.correct !== null)
    const correct = answered.filter((a) => a.outcome.correct).length
    const { minutes, xp, unitCompleted } = await finishSession({ unitId: unit.id, index, correct, total: answered.length, seconds })
    setSummary({
      correct,
      total: answered.length,
      skipped: attempts.length - answered.length,
      unitCompleted,
      minutes,
      xp,
      // One line per distinct sentence: two tasks with the same answer should not look like a duplicate.
      mistakes: [...new Set(attempts.filter((a) => a.outcome.correct === false).map((a) => a.outcome.shown ?? a.outcome.expected))].map((expected) => ({ given: '', expected })),
    })
    if (sounds) playSfx('done')
    setPhase(session.wrap ? 'wrap' : 'done')
  }

  const exit = (
    <button className="close" aria-label="Выйти из занятия" onClick={() => navigate({ name: 'path' })}>
      ✕
    </button>
  )

  if (phase === 'frame' && session.frame) {
    return (
      <GlossaryContext.Provider value={glossary}>
        <PlaceContext.Provider value={session.place}>
          <div className="screen">
            <div className="session-head">{exit}</div>
            <Beat setting={session.frame.setting} lines={session.frame.lines} doneLabel="Начать" onDone={() => setPhase('exercises')} />
          </div>
        </PlaceContext.Provider>
      </GlossaryContext.Provider>
    )
  }

  if (phase === 'wrap' && session.wrap && summary) {
    return (
      <GlossaryContext.Provider value={glossary}>
        <PlaceContext.Provider value={session.place}>
          <div className="screen">
            <Beat lines={session.wrap} doneLabel="Итоги занятия" onDone={() => setPhase('done')} />
          </div>
        </PlaceContext.Provider>
      </GlossaryContext.Provider>
    )
  }

  if (summary) return <SessionSummary unit={unit} index={index} summary={summary} />

  return (
    <GlossaryContext.Provider value={glossary}>
      <PlaceContext.Provider value={session.place}>
        <ExerciseRun
          exercises={session.exercises}
          heading={`Юнит ${unit.id} · Занятие ${index}. ${KIND_LABELS[session.kind]}: ${session.title}`}
          intro={session.intro}
          cast={cast}
          onAnswer={onAnswer}
          onFinish={onFinish}
          onExit={() => navigate({ name: 'path' })}
        />
      </PlaceContext.Provider>
    </GlossaryContext.Provider>
  )
}

function SessionSummary({ unit, index, summary }: { unit: Unit; index: number; summary: Summary }) {
  const { sessions, units, flags, remember } = useClub()
  const upcoming = nextSession(sessions, units)
  // A story invitation waits for the player's answer; "later" keeps it and the current step.
  const invite = unit.sessions[index - 1]?.invite
  const pendingInvite = invite && !flags[invite.flag] ? invite : undefined
  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : undefined
  return (
    <div className="screen">
      <Card title={`Занятие ${index} пройдено`}>
        {pct === undefined ? (
          <p>Все задания отложены — точность не считается.</p>
        ) : (
          <p>
            Точность: {pct}% ({summary.correct} из {summary.total})
          </p>
        )}
        {summary.skipped > 0 && <p className="muted">Отложено: {summary.skipped}. Эти задания вернутся в повторении.</p>}
        <p>
          +{summary.xp} XP · {summary.minutes} мин
        </p>
      </Card>
      {summary.mistakes.length > 0 && (
        <LearnPanel title="Ошибки уйдут в повторение">
          <ul className="mistakes">
            {summary.mistakes.map((m, k) => (
              <li key={k} lang="en">
                {m.expected}
              </li>
            ))}
          </ul>
        </LearnPanel>
      )}
      {summary.unitCompleted && <Card title="Юнит пройден">{unit.outcome}</Card>}
      {pendingInvite ? (
        <Card title="Приглашение">
          <p>{pendingInvite.text}</p>
          <div className="actions">
            <Button
              onClick={async () => {
                await remember(pendingInvite.flag)
                if (upcoming) navigate({ name: 'session', ...upcoming })
              }}
            >
              {pendingInvite.accept}
            </Button>
            <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
              {pendingInvite.later}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="actions">
          {upcoming && (
            <Button onClick={() => navigate({ name: 'session', ...upcoming })}>
              Дальше: юнит {upcoming.unitId}, занятие {upcoming.index}
            </Button>
          )}
          <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
            На путь
          </Button>
        </div>
      )}
    </div>
  )
}
