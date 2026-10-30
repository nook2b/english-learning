import { useEffect, useState } from 'react'
import { navigate } from '../../app/router'
import { TAGS } from '../../content/tags'
import { dayKey, daysBetween } from '../../data/dates'
import { type ReviewState, loadReview } from '../../data/review'
import { Button, Card } from '../../ui/kit'
import { Classroom } from './Classroom'
import { plural, todaysPair } from './pairs'

/**
 * Review tab, "after class": what has piled up — mistakes by topic and
 * speaking tasks put off — and a button to work through what is due.
 */
export function ReviewScreen() {
  const [state, setState] = useState<ReviewState>()
  const today = dayKey()
  useEffect(() => {
    void loadReview().then(setState)
  }, [])
  if (!state) return <div className="loading">Загрузка…</div>

  const due = state.topics.filter((t) => t.due <= today)
  const waiting = state.topics.filter((t) => t.due > today)
  const mood = due.length || state.deferred.length ? 'due' : waiting.length ? 'waiting' : 'empty'
  return (
    <div className="screen">
      <Classroom pair={todaysPair(today)} state={mood} />

      {state.topics.length > 0 && (
        <Card title="Ошибки по темам">
          <ul className="list review-topics">
            {[...due, ...waiting].map((t) => (
              <li key={t.tag}>
                <span>
                  {TAGS[t.tag]?.ru ?? t.tag}
                  <span className="muted"> · {t.mistakes.length} {plural(t.mistakes.length, 'ошибка', 'ошибки', 'ошибок')}</span>
                </span>
                <span className={t.due <= today ? 'review-due' : 'muted'}>
                  <span className="review-steps" aria-label={`Повторено ${t.step} из 3`}>
                    {[0, 1, 2].map((s) => (s < t.step ? '●' : '○')).join('')}
                  </span>{' '}
                  {t.due <= today ? 'пора' : `через ${daysBetween(today, t.due)} дн.`}
                </span>
              </li>
            ))}
          </ul>
          <p className="muted">Тема уходит, когда ты справишься с ней в три разных дня: сразу, через день и через три дня.</p>
        </Card>
      )}

      {state.deferred.length > 0 && (
        <Card title="Отложено с микрофоном">
          <p>
            {state.deferred.length} {plural(state.deferred.length, 'задание', 'задания', 'заданий')} «Сейчас не могу говорить». Скажешь их вслух в разборе.
          </p>
        </Card>
      )}

      {mood === 'due' && <Button onClick={() => navigate({ name: 'practice' })}>Разобрать</Button>}
      {mood === 'waiting' && (
        <Button variant="secondary" onClick={() => navigate({ name: 'practice' })}>
          Повторить раньше срока
        </Button>
      )}
      {mood === 'empty' && <p className="muted">Ошибки из занятий будут собираться здесь по темам, и к ним можно будет вернуться через день и через три дня.</p>}
    </div>
  )
}
