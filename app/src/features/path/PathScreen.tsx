import { type CSSProperties, useEffect, useRef, useState } from 'react'
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
import { snakeOffset, stopIcon, unitHeroine } from './roadmap'

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

      <div className="roadmap">
        {ARC1.modules.map((m) => (
          <section key={m.id} className="road-module">
            <p className="road-module-title">
              Модуль {m.id} · {m.focus}
            </p>
            {m.units.map((u) => {
              const unit = UNITS[u.id]
              return unit ? (
                <UnitRoad key={u.id} unit={unit} next={next?.unitId === u.id ? next.index : undefined} />
              ) : (
                <div key={u.id} className="road-banner road-banner-soon">
                  <span className="road-banner-kicker">Юнит {u.id} · скоро</span>
                  <span className="road-banner-title">{u.title}</span>
                </div>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}

/** One unit on the map: its banner, a snake of eight stops and its heroine by the road. */
function UnitRoad({ unit, next }: { unit: Unit; next?: number }) {
  const { sessions, units, settings } = useClub()
  const [picked, setPicked] = useState<number>()
  const current = useRef<HTMLButtonElement>(null)
  const heroine = unitHeroine(unit)
  const unitDone = !!units[unit.id]
  useEffect(() => {
    // Bring the current stop into view when the path opens.
    current.current?.scrollIntoView?.({ block: 'center' })
  }, [])

  return (
    <div className={`road-unit road-${heroine}`}>
      <button className={`road-banner ${unitDone ? 'road-banner-done' : ''}`} onClick={() => navigate({ name: 'unit', unitId: unit.id })}>
        <span className="road-banner-kicker">
          Юнит {unit.id}
          {unitDone ? ' · пройден' : ''}
        </span>
        <span className="road-banner-title">{unit.title}</span>
        <span className="road-banner-more" aria-hidden>
          ☰
        </span>
      </button>
      <div className="road">
        <div className="road-heroine" aria-hidden>
          <Sprite heroine={heroine} expr="happy" size="knee" />
        </div>
        {unit.sessions.map((s, i) => {
          const index = i + 1
          const done = !!sessions[sessionId(unit.id, index)]
          const isNext = next === index
          const open = done || isNext || settings.unlockAll
          const state = isNext ? 'next' : done ? 'done' : open ? 'open' : 'locked'
          return (
            <div key={i} className={picked === i ? 'road-row road-row-open' : 'road-row'} style={{ '--x': snakeOffset(i) } as CSSProperties}>
              {isNext && <span className="road-start">Начать</span>}
              <button
                ref={isNext ? current : undefined}
                className={`road-stop road-stop-${state} ${s.role ? `road-stop-${s.role}` : ''}`}
                aria-label={`Занятие ${index}. ${s.title}`}
                onClick={() => setPicked(picked === i ? undefined : i)}
              >
                <span aria-hidden>{done && !s.role ? '✓' : stopIcon(s)}</span>
              </button>
              {picked === i && (
                <div className="road-pop">
                  <p className="road-pop-title">
                    {index}. {s.title}
                  </p>
                  <p className="muted">{s.role === 'mission' ? 'Миссия юнита' : s.role === 'check' ? 'Проверка модуля' : KIND_LABELS[s.kind]}</p>
                  {open ? (
                    <Button onClick={() => navigate({ name: 'session', unitId: unit.id, index })}>{done ? 'Пройти ещё раз' : 'Начать'}</Button>
                  ) : (
                    <p className="muted">Откроется после предыдущих занятий.</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
