import { navigate } from '../../app/router'
import { useClub } from '../../data/store'
import { Button, Card, ProgressBar } from '../../ui/kit'
import { ARC1, ARC1_UNITS, nextUnitId } from './courseOutline'

export function PathScreen() {
  const units = useClub((s) => s.units)
  const next = nextUnitId(units)
  const doneCount = ARC1_UNITS.filter((u) => units[u.id]).length

  return (
    <div className="screen">
      <div className="actions">
        <Button onClick={() => navigate('lesson')} disabled={!next}>
          {next ? `Продолжить: юнит ${next}` : 'Арка пройдена'}
        </Button>
        <div className="actions-row">
          <Button variant="secondary" onClick={() => navigate('review')}>
            Повторение · 0
          </Button>
          <Button variant="secondary" onClick={() => navigate('story')}>
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
              const status = units[u.id] ? 'пройден' : u.id === next ? 'доступен' : 'закрыт'
              return (
                <li key={u.id} className={`unit unit-${units[u.id] ? 'done' : u.id === next ? 'open' : 'locked'}`}>
                  <span>
                    {u.id} · {u.title}
                  </span>
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
