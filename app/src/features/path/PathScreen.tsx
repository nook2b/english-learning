import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navigate } from '../../app/router'
import { UNITS, isSessionOpen, nextSession } from '../../content/course'
import { PLACEMENT_FLAG, PROLOGUE_FLAG } from '../../content/story'
import { ARC1, ARC1_UNITS } from '../../content/outline'
import type { Unit } from '../../content/schema'
import { sessionId } from '../../data/db'
import { useClub } from '../../data/store'
import { KIND_LABELS } from '../../lesson/model'
import { Button, ProgressBar } from '../../ui/kit'
import { MapFigure } from './MapFigure'
import { mapFigure, stopIcon } from './roadmap'


export function PathScreen() {
  const { units, sessions, flags } = useClub()
  const next = nextSession(sessions, units)
  // A newcomer starts with the prologue and the placement check; someone already studying sees the prologue as a separate card.
  const prologueDone = !!flags[PROLOGUE_FLAG]
  const placementDone = !!flags[PLACEMENT_FLAG]
  const prologueFirst = !(prologueDone && placementDone) && Object.keys(sessions).length === 0
  const doneCount = ARC1_UNITS.filter((u) => units[u.id]).length
  const route = useRef<HTMLDivElement>(null)
  const away = useAwayFromCurrent()

  useLayoutEffect(() => {
    // Unit headers stick right under the top bar while their unit is on screen.
    const bar = document.querySelector('.topbar')?.getBoundingClientRect().height ?? 0
    route.current?.style.setProperty('--topbar-h', `${bar}px`)
  }, [])

  return (
    <div className="screen">
      {prologueFirst ? (
        <Button onClick={() => navigate({ name: 'prologue' })}>{prologueDone ? 'Дальше: вступительная проверка в кабинете 70' : 'Начать: пролог «Не тот кабинет»'}</Button>
      ) : (
        <Button onClick={() => next && navigate({ name: 'session', ...next })} disabled={!next}>
          {next ? `Продолжить: юнит ${next.unitId}, занятие ${next.index}` : 'Новые юниты скоро появятся'}
        </Button>
      )}

      <div className="arc-head">
        <h2>{ARC1.title}</h2>
        <ProgressBar value={doneCount} max={ARC1_UNITS.length} label="Прогресс арки" />
      </div>

      <div className="route" ref={route}>
        <button className={`route-head route-prologue ${prologueDone ? '' : 'route-prologue-new'}`} onClick={() => navigate({ name: 'prologue' })}>
          <span className="route-head-kicker">Пролог · {prologueDone ? 'пройден ✓' : 'новое'}</span>
          <span className="route-head-title">Не тот кабинет</span>
        </button>
        {ARC1.modules.map((m) => (
          <section key={m.id} className="route-module">
            <p className="route-module-title">
              Модуль {m.id} · {m.focus}
            </p>
            {m.units.map((u) => {
              const unit = UNITS[u.id]
              return unit ? (
                <UnitRoute key={u.id} unit={unit} next={next?.unitId === u.id ? next.index : undefined} scroll={!prologueFirst} />
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
      {away && (
        <button className="route-back" onClick={() => document.querySelector('.route-stop-next')?.scrollIntoView({ block: 'center', behavior: 'smooth' })}>
          {away === 'up' ? '↑' : '↓'} К текущему занятию
        </button>
      )}
    </div>
  )
}

/** Whether the current station has scrolled off screen, and which way it went. */
function useAwayFromCurrent(): 'up' | 'down' | undefined {
  const [away, setAway] = useState<'up' | 'down'>()
  useEffect(() => {
    const el = document.querySelector('.route-stop-next')
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setAway(!e || e.isIntersecting ? undefined : e.boundingClientRect.top < 0 ? 'up' : 'down'))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return away
}

/**
 * One unit on the route: a header, a line of eight stations (one per session,
 * titles visible) and the unit's heroine standing beside it. Open stations
 * start their session on tap.
 */
function UnitRoute({ unit, next, scroll }: { unit: Unit; next?: number; scroll: boolean }) {
  const { sessions, units, settings, flags, remember } = useClub()
  // A story invitation after the previous session holds the next one until it is answered.
  const invite = next ? unit.sessions[next - 2]?.invite : undefined
  const pendingInvite = invite && !flags[invite.flag] && !settings.unlockAll ? invite : undefined
  const current = useRef<HTMLButtonElement>(null)
  const figure = mapFigure(unit)
  const done = unit.sessions.map((_, i) => !!sessions[sessionId(unit.id, i + 1)])
  useEffect(() => {
    // Bring the current station into view when the path opens (a newcomer sees the prologue button first).
    if (scroll) current.current?.scrollIntoView?.({ block: 'center' })
  }, [scroll])

  return (
    <div className={`route-unit route-${figure.heroine}`}>
      <button className="route-head" onClick={() => navigate({ name: 'unit', unitId: unit.id })} aria-label={`Юнит ${unit.id}. ${unit.title}. Открыть тетрадь юнита`}>
        <span className="route-head-kicker">
          Юнит {unit.id} · {units[unit.id] ? 'пройден' : `${done.filter(Boolean).length}/${unit.sessions.length}`}
        </span>
        <span className="route-head-title">{unit.title}</span>
        {/* Iris's notebook: the unit's key phrases and grammar. */}
        <span className="route-head-book" aria-hidden>
          📓
        </span>
      </button>
      {pendingInvite && (
        <div className="route-invite">
          <p>{pendingInvite.text}</p>
          <Button onClick={() => void remember(pendingInvite.flag)}>{pendingInvite.accept}</Button>
        </div>
      )}
      <div className="route-body">
        <ol className="route-stops">
          {unit.sessions.map((s, i) => {
            const index = i + 1
            const isNext = next === index
            const open = isSessionOpen({ unitId: unit.id, index }, sessions, units, settings.unlockAll, flags)
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
