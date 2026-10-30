import { useEffect, useRef } from 'react'
import { navigate } from '../../app/router'
import { UNITS, nextSession } from '../../content/course'
import { ARC1, ARC1_UNITS } from '../../content/outline'
import { CHARACTERS } from '../../content/characters'
import type { Unit } from '../../content/schema'
import { dayKey } from '../../data/dates'
import { sessionId } from '../../data/db'
import { useClub } from '../../data/store'
import { Gloss, Translation } from '../../lesson/Gloss'
import { LineVoice } from '../../speech/AudioControls'
import { Sprite } from '../../story/Stage'
import { HEROINE_IDS } from '../../story/sprites'
import { Button, DialogueBox, ProgressBar } from '../../ui/kit'
import { MapFigure } from './MapFigure'
import { mapFigure, stopIcon } from './roadmap'

const KIND_LABELS = { comprehension: 'Понимание', form: 'Форма', production: 'Продукция', fluency: 'Беглость' } as const

export function PathScreen() {
  const { units, sessions, settings } = useClub()
  // Heroine of the day: a different one each calendar day.
  const day = Number(dayKey().replaceAll('-', ''))
  const hostId = HEROINE_IDS[day % HEROINE_IDS.length]!
  const host = CHARACTERS[hostId]!
  const next = nextSession(sessions, units)
  const doneCount = ARC1_UNITS.filter((u) => units[u.id]).length

  return (
    <div className="screen">
      <div className="host">
        <button className="heroine-tap" onClick={() => navigate({ name: 'heroine', id: hostId })} aria-label={host.name}>
          <Sprite heroine={hostId} expr={host.greeting.expr} size="knee" />
        </button>
        <DialogueBox speaker={host.name}>
          <LineVoice text={host.greeting.text} speaker={hostId} expr={host.greeting.expr} delivery={host.greeting.delivery} />
          <Gloss text={host.greeting.text} />
          <Translation ru={host.greeting.ru} always={settings.translation === 'always'} />
        </DialogueBox>
      </div>
      <Button onClick={() => next && navigate({ name: 'session', ...next })} disabled={!next}>
        {next ? `Продолжить: юнит ${next.unitId}, занятие ${next.index}` : 'Новые юниты скоро появятся'}
      </Button>

      <div className="arc-head">
        <h2>{ARC1.title}</h2>
        <ProgressBar value={doneCount} max={ARC1_UNITS.length} label="Прогресс арки" />
      </div>

      <div className="route">
        {ARC1.modules.map((m) => (
          <section key={m.id} className="route-module">
            <p className="route-module-title">
              Модуль {m.id} · {m.focus}
            </p>
            {m.units.map((u) => {
              const unit = UNITS[u.id]
              return unit ? (
                <UnitRoute key={u.id} unit={unit} next={next?.unitId === u.id ? next.index : undefined} />
              ) : (
                <div key={u.id} className="route-head route-head-soon">
                  <span className="route-head-kicker">Юнит {u.id} · скоро</span>
                  <span className="route-head-title">{u.title}</span>
                </div>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}

/**
 * One unit on the route: a header, a line of eight stations (one per session,
 * titles visible) and the unit's heroine standing beside it. Open stations
 * start their session on tap.
 */
function UnitRoute({ unit, next }: { unit: Unit; next?: number }) {
  const { sessions, units, settings } = useClub()
  const current = useRef<HTMLButtonElement>(null)
  const figure = mapFigure(unit)
  const done = unit.sessions.map((_, i) => !!sessions[sessionId(unit.id, i + 1)])
  useEffect(() => {
    // Bring the current station into view when the path opens.
    current.current?.scrollIntoView?.({ block: 'center' })
  }, [])

  return (
    <div className={`route-unit route-${figure.heroine}`}>
      <button className="route-head" onClick={() => navigate({ name: 'unit', unitId: unit.id })}>
        <span className="route-head-kicker">
          Юнит {unit.id} · {units[unit.id] ? 'пройден' : `${done.filter(Boolean).length}/${unit.sessions.length}`}
        </span>
        <span className="route-head-title">{unit.title}</span>
        <span className="route-head-more">О юните ›</span>
      </button>
      <div className="route-body">
        <ol className="route-stops">
          {unit.sessions.map((s, i) => {
            const index = i + 1
            const isNext = next === index
            const open = done[i] || isNext || settings.unlockAll
            const state = isNext ? 'next' : done[i] ? 'done' : open ? 'open' : 'locked'
            return (
              <li key={i} className={`route-stop route-stop-${state} ${s.role ? `route-stop-${s.role}` : ''}`}>
                <span className="route-dot" aria-hidden>
                  {done[i] && !s.role ? '✓' : stopIcon(s)}
                </span>
                <button
                  ref={isNext ? current : undefined}
                  className="route-label"
                  disabled={!open}
                  onClick={() => navigate({ name: 'session', unitId: unit.id, index })}
                >
                  <span className="route-title">
                    {index}. {s.title}
                  </span>
                  <span className="route-kind">{isNext ? 'Начать ›' : s.role === 'mission' ? 'Миссия юнита' : s.role === 'check' ? 'Проверка модуля' : KIND_LABELS[s.kind]}</span>
                </button>
              </li>
            )
          })}
        </ol>
        <div className="route-figure" aria-hidden>
          <MapFigure {...figure} />
        </div>
      </div>
    </div>
  )
}
