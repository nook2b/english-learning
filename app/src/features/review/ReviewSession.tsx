import { useEffect, useMemo, useState } from 'react'
import { navigate } from '../../app/router'
import type { Exercise } from '../../content/schema'
import { TAGS } from '../../content/tags'
import { dayKey } from '../../data/dates'
import { type ReviewState, type RoundResult, loadReview, saveRound } from '../../data/review'
import { PERFECT_BONUS_XP, MAX_SESSION_SECONDS, SESSION_XP, useClub } from '../../data/store'
import type { TopicReview } from '../../data/db'
import { type Attempt, ExerciseRun } from '../../lesson/ExerciseRun'
import type { Outcome } from '../../lesson/model'
import { playSfx } from '../../speech/sfx'
import { Button, Card } from '../../ui/kit'
import { type RoundItem, buildRound } from './build'
import { Classroom } from './Classroom'
import { plural, todaysPair } from './pairs'

/** The furthest unit the learner has reached: variations only use words met so far. */
function reachedUnit(sessions: Record<string, { unitId: string }>, unlockAll: boolean): string {
  if (unlockAll) return '999'
  return Object.values(sessions).reduce((max, s) => (s.unitId > max ? s.unitId : max), '001')
}

/** One after-class round: variations by topic, the original mistakes, put-off speaking tasks. */
export function ReviewSession() {
  const [state, setState] = useState<ReviewState>()
  useEffect(() => {
    void loadReview().then(setState)
  }, [])
  if (!state) return <div className="loading">Загрузка…</div>
  return <Round state={state} />
}

function Round({ state }: { state: ReviewState }) {
  const { sessions, settings, noteMistake, recordSession, refreshReview } = useClub()
  const today = dayKey()
  const early = !state.topics.some((t) => t.due <= today) && state.deferred.length === 0
  const items = useMemo(() => buildRound(state, today, { maxUnit: reachedUnit(sessions, settings.unlockAll), early }), [state, today, sessions, settings.unlockAll, early])
  const plan = useMemo(() => new Map(items.map((i) => [i.exercise.id, i])), [items])
  const [done, setDone] = useState<{ moved: TopicReview[]; correct: number; total: number; xp: number }>()

  if (items.length === 0) {
    return (
      <div className="screen">
        <Card title="Разбирать нечего">
          <p className="muted">Ошибки появятся здесь после занятий.</p>
          <Button variant="secondary" onClick={() => navigate({ name: 'review' })}>
            Назад
          </Button>
        </Card>
      </div>
    )
  }

  const onAnswer = (exercise: Exercise, o: Outcome, retry: boolean) => {
    // A slip in review is a real mistake: it is kept and counts for its topic.
    if (!retry && o.correct === false) void noteMistake({ exerciseId: exercise.id, tags: exercise.tags, given: o.given, expected: o.shown ?? o.expected, at: Date.now() }).catch(() => {})
  }

  const onFinish = async (attempts: Attempt[], seconds: number) => {
    const results: RoundResult[] = attempts.map((a) => {
      const item: RoundItem | undefined = plan.get(a.exercise.id)
      return { exerciseId: a.exercise.id, tag: item?.tag, deferred: item?.deferred, correct: a.outcome.correct }
    })
    const moved = await saveRound(results, today, early)
    const answered = attempts.filter((a) => a.outcome.correct !== null)
    const correct = answered.filter((a) => a.outcome.correct).length
    const xp = SESSION_XP + (answered.length > 0 && correct === answered.length ? PERFECT_BONUS_XP : 0)
    await recordSession(Math.max(1, Math.round(Math.min(seconds, MAX_SESSION_SECONDS) / 60)), xp)
    await refreshReview()
    if (settings.sounds) playSfx('done')
    setDone({ moved, correct, total: answered.length, xp })
  }

  if (done) {
    return (
      <div className="screen">
        <Classroom pair={todaysPair(today)} state="done" />
        <Card title="Разбор окончен">
          <p>
            Верно с первого раза: {done.correct} из {done.total} · +{done.xp} XP
          </p>
          {early && <p className="muted">Повтор раньше срока: темы остаются на своём шаге.</p>}
          <ul className="list review-topics">
            {done.moved.map((t) => (
              <li key={t.tag}>
                <span>{TAGS[t.tag]?.ru ?? t.tag}</span>
                <span className="muted">{t.clearedAt ? 'разобрана ✓' : t.step === 0 ? 'ещё раз завтра' : `дальше через ${t.step === 1 ? 'день' : '3 дня'}`}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Button onClick={() => navigate({ name: 'review' })}>Готово</Button>
      </div>
    )
  }

  const topics = [...new Set(items.flatMap((i) => (i.tag ? [i.tag] : [])))]
  const deferred = items.filter((i) => i.deferred).length
  return (
    <ExerciseRun
      exercises={items.map((i) => i.exercise)}
      heading={`После уроков · ${topics.map((t) => TAGS[t]?.ru ?? t).join(', ')}${deferred ? ` · вслух: ${deferred} ${plural(deferred, 'задание', 'задания', 'заданий')}` : ''}`}
      intro={early ? 'Повтор раньше срока: можно освежить темы, но шаги повторения сдвинутся, только когда придёт их день.' : undefined}
      onAnswer={onAnswer}
      onFinish={onFinish}
      onExit={() => navigate({ name: 'review' })}
    />
  )
}
