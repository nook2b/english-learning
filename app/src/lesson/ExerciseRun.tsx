import { type ReactNode, useEffect, useRef, useState } from 'react'
import type { Exercise } from '../content/schema'
import { useClub } from '../data/store'
import { playSfx } from '../speech/sfx'
import { play, stop as stopVoice } from '../speech/voice'
import { type HeroineId, isHeroine } from '../story/sprites'
import { Stage } from '../story/Stage'
import { Button, LearnPanel, ProgressBar } from '../ui/kit'
import { ExerciseView, SceneLines } from './ExerciseView'
import { wordDiff } from './diff'
import { ExamMode } from './exam'
import { PlaceContext, usePlace } from '../story/places'
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

/** A first attempt at a task: what accuracy, mistakes and review are counted from. */
export interface Attempt {
  exercise: Exercise
  outcome: Outcome
}

/**
 * Runs a list of tasks the Duolingo way: a wrong answer shows the right one and
 * comes back at the end of the queue until answered right; accuracy counts the
 * first attempt only. Used by the unit sessions and by the after-class review.
 */
export function ExerciseRun({
  exercises,
  heading,
  intro,
  cast = {},
  onAnswer,
  onFinish,
  onExit,
  exam = false,
  finishLabel = 'Завершить занятие',
}: {
  exercises: readonly Exercise[]
  heading: ReactNode
  intro?: string
  cast?: Partial<Record<HeroineId, string>>
  /** Every answer, retries included (`retry` is true for those). */
  onAnswer?: (exercise: Exercise, outcome: Outcome, retry: boolean) => void
  onFinish: (attempts: Attempt[], seconds: number) => Promise<void> | void
  onExit: () => void
  /** The placement check: no marking, no retries, no hints (lesson/exam.ts). */
  exam?: boolean
  finishLabel?: string
}) {
  // Wrong answers come back at the end of the queue until answered right, as in Duolingo.
  const [steps, setSteps] = useState(() => toSteps(exercises))
  const retries = useRef(0)
  const startedAt = useRef(Date.now())
  const [i, setI] = useState(0)
  const [outcome, setOutcome] = useState<Outcome>()
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [saving, setSaving] = useState(false)
  const sounds = useClub((s) => s.settings.sounds)

  const step = steps[i]!
  const place = usePlace()
  const reaction = !exam && !!outcome?.lines
  const feedback = useRef<HTMLDivElement>(null)
  const voiceOn = useClub((s) => s.settings.voice)
  useEffect(() => {
    if (!outcome) return
    if (reaction) {
      // A new screen starts at the top, and the heroine answers aloud.
      if (!/jsdom/.test(navigator.userAgent)) window.scrollTo({ top: 0 })
      const first = outcome.lines![0]!
      if (voiceOn) play(first.text, first.speaker, false, first)
    } else {
      // The verdict and "Дальше" come into view without scrolling.
      feedback.current?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outcome])
  // Whoever speaks in a listening, dictation or read-aloud task joins the heroines on screen.
  const voice = step.exercise.type === 'listening' || step.exercise.type === 'dictation' ? step.exercise.speaker : step.exercise.type === 'speak' ? step.exercise.voice : undefined
  const stepCast = voice && isHeroine(voice) && !(voice in cast) ? { ...cast, [voice]: 'neutral' } : cast
  const isLast = i === steps.length - 1

  const answer = (answered: Outcome) => {
    if (sounds && !exam && answered.correct !== null) playSfx(answered.correct ? 'right' : 'wrong')
    const o = answered.correct === false ? { ...answered, shown: mistakeText(step, answered.expected) } : answered
    setOutcome(o)
    // Accuracy and mistakes count the first attempt only.
    if (!step.retry) setAttempts((a) => [...a, { exercise: step.exercise, outcome: o }])
    onAnswer?.(step.exercise, o, !!step.retry)
    if (o.correct === false && !exam) {
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
    await onFinish(attempts, Math.round((Date.now() - startedAt.current) / 1000))
    setSaving(false)
  }

  return (
    <ExamMode.Provider value={exam}>
      <div className="screen">
        <div className="session-head">
          <button className="close" aria-label="Выйти из занятия" onClick={onExit}>
            ✕
          </button>
          <ProgressBar value={i + (outcome ? 1 : 0)} max={steps.length} label="Прогресс занятия" />
        </div>
        <p className="muted">{heading}</p>

        {i === 0 && !outcome && intro && <LearnPanel title="Перед началом">{intro}</LearnPanel>}

        {/* After a scene answer the heroine's reaction replaces the task, as a next screen. */}
        {!reaction && (
          <>
            {step.exercise.type !== 'scene' && Object.keys(stepCast).length > 0 && <Stage cast={stepCast} compact speaking={voice} />}
            {step.retry && <p className="context">Ещё раз: исправим ошибку</p>}
            <ExerciseView key={step.key} step={step} locked={!!outcome} onAnswer={answer} />
          </>
        )}

        {outcome && exam && (
          <div className="feedback exam" role="status">
            <p className="verdict">Ответ принят</p>
            <Button onClick={next} disabled={saving}>
              {isLast ? finishLabel : 'Дальше'}
            </Button>
          </div>
        )}
        {outcome && !exam && (
          <div ref={feedback} className={`feedback ${outcome.correct === false ? 'bad' : 'good'} ${reaction ? 'reaction' : ''}`} role="status">
            {outcome.lines && (
              <PlaceContext.Provider value={(step.exercise.type === 'scene' && step.exercise.place) || place}>
                <SceneLines lines={outcome.lines} compact />
              </PlaceContext.Provider>
            )}
            {outcome.correct === true && <p className="verdict">Верно</p>}
            {outcome.spelling && (
              <p className="muted">
                Засчитано. Обрати внимание на написание: <span lang="en">{outcome.spelling}</span>
              </p>
            )}
            {outcome.note && <p className="muted">{outcome.note}</p>}
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
              {isLast ? finishLabel : 'Дальше'}
            </Button>
          </div>
        )}
      </div>
    </ExamMode.Provider>
  )
}
