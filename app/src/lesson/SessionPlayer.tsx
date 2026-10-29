import { useMemo, useRef, useState } from 'react'
import { nextSession } from '../content/course'
import type { Unit } from '../content/schema'
import { addMistake } from '../data/db'
import { useClub } from '../data/store'
import { navigate } from '../app/router'
import { Button, Card, LearnPanel, ProgressBar } from '../ui/kit'
import { playSfx } from '../speech/sfx'
import { stop as stopVoice } from '../speech/voice'
import { castAt } from '../story/cast'
import { isHeroine } from '../story/sprites'
import { Beat, Stage } from '../story/Stage'
import { ExerciseView, SceneLines } from './ExerciseView'
import { wordDiff } from './diff'
import { GlossaryContext } from './glossary'
import { type Outcome, mistakeText, toSteps } from './model'

/** Tasks with a typed or spoken sentence, where a word-by-word comparison helps. */
const TYPED = new Set(['fill', 'translate', 'fix', 'transform', 'write', 'dictation', 'scene', 'speak'])

/** The right answer with the needed words highlighted, and the learner's answer with wrong words struck out. */
function AnswerDiff({ given, expected }: { given: string; expected: string }) {
  const d = wordDiff(given, expected)
  const words = (ws: typeof d.given, cls: string) =>
    ws.map((w, k) => (
      <span key={k}>
        {k > 0 && ' '}
        <span className={w.changed ? cls : undefined}>{w.text}</span>
      </span>
    ))
  return (
    <>
      <p lang="en">{words(d.expected, 'diff-need')}</p>
      <p className="muted" lang="en">
        Твой ответ: {words(d.given, 'diff-wrong')}
      </p>
      {d.given.every((w) => !w.changed) && d.expected.every((w) => !w.changed) && <p className="muted">Слова те же — проверь порядок.</p>}
    </>
  )
}

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
  // Wrong answers come back at the end of the queue until answered right, as in Duolingo.
  const [steps, setSteps] = useState(() => toSteps(session.exercises))
  const retries = useRef(0)
  const remembered = useRef(new Set<string>())
  const cast = useMemo(() => (session.frame ? castAt(session.frame.lines, session.frame.lines.length - 1) : {}), [session])
  const finishSession = useClub((s) => s.finishSession)
  const remember = useClub((s) => s.remember)
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
  // A session is a small story beat: frame → exercises → wrap → summary.
  const [phase, setPhase] = useState<'frame' | 'exercises' | 'wrap' | 'done'>(session.frame ? 'frame' : 'exercises')

  const step = steps[i]!
  // Whoever speaks in a listening, dictation or read-aloud task joins the heroines on screen.
  const voice = step.exercise.type === 'listening' || step.exercise.type === 'dictation' ? step.exercise.speaker : step.exercise.type === 'speak' ? step.exercise.voice : undefined
  const stepCast = voice && isHeroine(voice) && !(voice in cast) ? { ...cast, [voice]: 'neutral' } : cast
  const isLast = i === steps.length - 1

  const sounds = useClub((s) => s.settings.sounds)

  const answer = (answered: Outcome) => {
    if (sounds && answered.correct !== null) playSfx(answered.correct ? 'right' : 'wrong')
    const o = answered.correct === false ? { ...answered, shown: mistakeText(step, answered.expected) } : answered
    setOutcome(o)
    // Accuracy and mistakes count the first attempt only.
    if (!step.retry) setResults((r) => [...r, o])
    if (o.flag && !remembered.current.has(o.flag)) {
      remembered.current.add(o.flag)
      void remember(o.flag)
    }
    if (o.correct === false) {
      if (!step.retry) void addMistake({ exerciseId: step.exercise.id, tags: step.exercise.tags, given: o.given, expected: o.shown ?? o.expected, at: Date.now() })
      retries.current += 1
      // Multi-item tasks (sorting, pairs) come back with only the items that went wrong.
      setSteps((s) => [...s, { ...step, exercise: o.retry ?? step.exercise, key: `${step.key.split('~')[0]}~${retries.current}`, retry: true }])
    }
  }

  const next = async () => {
    stopVoice()
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
      // One line per distinct sentence: two tasks with the same answer should not look like a duplicate.
      mistakes: [...new Set(results.filter((r) => r.correct === false).map((r) => r.shown ?? r.expected))].map((expected) => ({ given: '', expected })),
    })
    setSaving(false)
    if (sounds) playSfx('done')
    if (session.wrap) setPhase('wrap')
  }

  const exit = (
    <button className="close" aria-label="Выйти из занятия" onClick={() => navigate({ name: 'unit', unitId: unit.id })}>
      ✕
    </button>
  )

  if (phase === 'frame' && session.frame) {
    return (
      <GlossaryContext.Provider value={glossary}>
        <div className="screen">
          <div className="session-head">{exit}</div>
          <Beat setting={session.frame.setting} lines={session.frame.lines} doneLabel="Начать" onDone={() => setPhase('exercises')} />
        </div>
      </GlossaryContext.Provider>
    )
  }

  if (phase === 'wrap' && session.wrap && summary) {
    return (
      <GlossaryContext.Provider value={glossary}>
        <div className="screen">
          <Beat lines={session.wrap} doneLabel="Итоги занятия" onDone={() => setPhase('done')} />
        </div>
      </GlossaryContext.Provider>
    )
  }

  if (summary) return <SessionSummary unit={unit} index={index} summary={summary} />

  return (
    <GlossaryContext.Provider value={glossary}>
      <div className="screen">
        <div className="session-head">
          {exit}
          <ProgressBar value={i + (outcome ? 1 : 0)} max={steps.length} label="Прогресс занятия" />
        </div>
        <p className="muted">
          Юнит {unit.id} · Занятие {index}. {KIND_LABELS[session.kind]}: {session.title}
        </p>

        {i === 0 && !outcome && session.intro && <LearnPanel title="Перед началом">{session.intro}</LearnPanel>}

        {step.exercise.type !== 'scene' && Object.keys(stepCast).length > 0 && <Stage cast={stepCast} compact speaking={voice} />}
        {step.retry && <p className="context">Ещё раз: исправим ошибку</p>}
        <ExerciseView key={step.key} step={step} locked={!!outcome} onAnswer={answer} />

        {outcome && (
          <div className={`feedback ${outcome.correct === false ? 'bad' : 'good'}`} role="status">
            {outcome.lines && <SceneLines lines={outcome.lines} />}
            {outcome.correct === true && <p className="verdict">Верно</p>}
          {outcome.spelling && (
            <p className="muted">
              Засчитано. Обрати внимание на написание: <span lang="en">{outcome.spelling}</span>
            </p>
          )}
            {outcome.correct === null && <p className="verdict">Пропущено, вернёмся к этому позже</p>}
            {outcome.correct === false && (
              <LearnPanel title="Правильно так">
                {outcome.given && TYPED.has(step.exercise.type) ? (
                  <AnswerDiff given={outcome.given} expected={outcome.expected} />
                ) : (
                  <>
                    <p lang="en">{outcome.expected}</p>
                    {outcome.given && <p className="muted">Твой ответ: {outcome.given}</p>}
                  </>
                )}
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
