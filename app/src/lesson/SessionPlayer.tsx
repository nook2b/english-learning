import { useMemo, useRef, useState } from 'react'
import { nextSession } from '../content/course'
import type { Unit } from '../content/schema'
import { addMistake } from '../data/db'
import { useClub } from '../data/store'
import { navigate } from '../app/router'
import { Button, Card, LearnPanel, ProgressBar } from '../ui/kit'
import { ExerciseView, SceneLines } from './ExerciseView'
import { GlossaryContext } from './glossary'
import { type Outcome, toSteps } from './model'

const KIND_LABELS = { comprehension: 'Понимание', form: 'Форма', production: 'Продукция', fluency: 'Беглость и миссия' } as const

interface Summary {
  correct: number
  total: number
  skipped: number
  minutes: number
  xp: number
  mistakes: { given: string; expected: string }[]
}

export function SessionPlayer({ unit, index }: { unit: Unit; index: number }) {
  const session = unit.sessions[index - 1]!
  const steps = useMemo(() => toSteps(session.exercises), [session])
  const finishSession = useClub((s) => s.finishSession)
  const glossary = useMemo(
    () => [...unit.expressions.map((e) => ({ ...e, target: true })), ...unit.glossary.map((e) => ({ ...e, target: false }))],
    [unit],
  )
  const startedAt = useRef(Date.now())
  const [i, setI] = useState(0)
  const [outcome, setOutcome] = useState<Outcome>()
  const [results, setResults] = useState<Outcome[]>([])
  const [summary, setSummary] = useState<Summary>()
  const [saving, setSaving] = useState(false)

  const step = steps[i]!
  const isLast = i === steps.length - 1

  const answer = (o: Outcome) => {
    setOutcome(o)
    setResults((r) => [...r, o])
    if (o.correct === false) {
      void addMistake({ exerciseId: step.exercise.id, tags: step.exercise.tags, given: o.given, expected: o.expected, at: Date.now() })
    }
  }

  const next = async () => {
    if (!isLast) {
      setOutcome(undefined)
      setI(i + 1)
      return
    }
    setSaving(true)
    const answered = results.filter((r) => r.correct !== null)
    const correct = answered.filter((r) => r.correct).length
    const seconds = Math.round((Date.now() - startedAt.current) / 1000)
    const { minutes, xp } = await finishSession({ unitId: unit.id, index, correct, total: answered.length, seconds })
    setSummary({
      correct,
      total: answered.length,
      skipped: results.length - answered.length,
      minutes,
      xp,
      mistakes: results.filter((r) => r.correct === false).map(({ given, expected }) => ({ given, expected })),
    })
    setSaving(false)
  }

  if (summary) return <SessionSummary unit={unit} index={index} summary={summary} />

  return (
    <GlossaryContext.Provider value={glossary}>
      <div className="screen">
        <div className="session-head">
          <button className="close" aria-label="Выйти из занятия" onClick={() => navigate({ name: 'unit', unitId: unit.id })}>
            ✕
          </button>
          <ProgressBar value={i + (outcome ? 1 : 0)} max={steps.length} label="Прогресс занятия" />
        </div>
        <p className="muted">
          Юнит {unit.id} · Занятие {index}. {KIND_LABELS[session.kind]}: {session.title}
        </p>

        {i === 0 && !outcome && session.intro && <LearnPanel title="Перед началом">{session.intro}</LearnPanel>}

        <ExerciseView key={step.key} step={step} locked={!!outcome} onAnswer={answer} />

        {outcome && (
          <div className={`feedback ${outcome.correct === false ? 'bad' : 'good'}`} role="status">
            {outcome.lines && <SceneLines lines={outcome.lines} />}
            {outcome.correct === true && <p className="verdict">Верно</p>}
            {outcome.correct === null && <p className="verdict">Пропущено, вернёмся к этому позже</p>}
            {outcome.correct === false && (
              <LearnPanel title="Правильно так">
                <p lang="en">{outcome.expected}</p>
                {outcome.given && <p className="muted">Твой ответ: {outcome.given}</p>}
                {step.exercise.explain && <p>{step.exercise.explain}</p>}
              </LearnPanel>
            )}
            {outcome.correct === true && step.exercise.explain && step.exercise.type !== 'scene' && <p className="muted">{step.exercise.explain}</p>}
            <Button onClick={next} disabled={saving}>
              {isLast ? 'Завершить занятие' : 'Дальше'}
            </Button>
          </div>
        )}
      </div>
    </GlossaryContext.Provider>
  )
}

function SessionSummary({ unit, index, summary }: { unit: Unit; index: number; summary: Summary }) {
  const { sessions, units } = useClub()
  const upcoming = nextSession(sessions, units)
  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : 100
  return (
    <div className="screen">
      <Card title={`Занятие ${index} пройдено`}>
        <p>
          Точность: {pct}% ({summary.correct} из {summary.total})
        </p>
        {summary.skipped > 0 && <p className="muted">Пропущено: {summary.skipped}</p>}
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
      {units[unit.id] && <Card title="Юнит пройден">{unit.outcome}</Card>}
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
    </div>
  )
}
