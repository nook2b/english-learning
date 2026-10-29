import { navigate } from '../../app/router'
import { UNITS, nextSession } from '../../content/course'
import { ARC1, ARC1_UNITS } from '../../content/outline'
import { useClub, sessionsDone } from '../../data/store'
import { Button, Card, ProgressBar } from '../../ui/kit'

export function PathScreen() {
  const { units, sessions } = useClub()
  const next = nextSession(sessions, units)
  const doneCount = ARC1_UNITS.filter((u) => units[u.id]).length

  return (
    <div className="screen">
      <div className="actions">
        <Button onClick={() => next && navigate({ name: 'session', ...next })} disabled={!next}>
          {next ? `Продолжить: юнит ${next.unitId}, занятие ${next.index}` : 'Новые юниты скоро появятся'}
        </Button>
        <div className="actions-row">
          <Button variant="secondary" onClick={() => navigate({ name: 'review' })}>
            Повторение · 0
          </Button>
          <Button variant="secondary" onClick={() => navigate({ name: 'story' })}>
            История
          </Button>
        </div>
      </div>

      <Card title={ARC1.title}>
        <ProgressBar value={doneCount} max={ARC1_UNITS.length} label="Прогресс арки" />
        <p className="muted">
          {doneCount} из {ARC1_UNITS.length} юнитов
        </p>
      </Card>

      {ARC1.modules.map((m) => (
        <Card key={m.id} title={`Модуль ${m.id}`}>
          <p className="muted">{m.focus}</p>
          <ul className="unit-list">
            {m.units.map((u) => {
              const written = !!UNITS[u.id]
              const status = units[u.id] ? 'пройден' : !written ? 'скоро' : u.id === next?.unitId ? `${sessionsDone(sessions, u.id)}/8` : 'закрыт'
              const cls = units[u.id] ? 'done' : u.id === next?.unitId ? 'open' : 'locked'
              return (
                <li key={u.id} className={`unit unit-${cls}`}>
                  <button className="link" onClick={() => navigate({ name: 'unit', unitId: u.id })}>
                    {u.id} · {u.title}
                  </button>
                  <span className="muted">{status}</span>
                </li>
              )
            })}
          </ul>
        </Card>
      ))}
    </div>
  )
}
