import { navigate } from '../../app/router'
import { getUnit } from '../../content/course'
import { ARC1_UNITS } from '../../content/outline'
import { sessionId } from '../../data/db'
import { useClub } from '../../data/store'
import { Button, Card, ProgressBar } from '../../ui/kit'

const KIND_LABELS = { comprehension: 'понимание', form: 'форма', production: 'продукция', fluency: 'беглость и миссия' } as const

export function UnitScreen({ unitId }: { unitId: string }) {
  const sessions = useClub((s) => s.sessions)
  const unlockAll = useClub((s) => s.settings.unlockAll)
  const unit = getUnit(unitId)
  const outline = ARC1_UNITS.find((u) => u.id === unitId)

  if (!unit) {
    return (
      <div className="screen">
        <Card title={`Юнит ${unitId}${outline ? `. ${outline.title}` : ''}`}>
          <p className="muted">Контент этого юнита ещё пишется.</p>
          <Button variant="secondary" onClick={() => navigate({ name: 'path' })}>
            На путь
          </Button>
        </Card>
      </div>
    )
  }

  const done = unit.sessions.map((_, i) => !!sessions[sessionId(unit.id, i + 1)])
  const doneCount = done.filter(Boolean).length

  return (
    <div className="screen">
      <Card title={`Юнит ${unit.id}. ${unit.title}`}>
        <p>{unit.goal}</p>
        <p className="muted">{unit.focus}</p>
        <ProgressBar value={doneCount} max={unit.sessions.length} label="Занятия юнита" />
      </Card>

      <Card title="Занятия">
        <ul className="unit-list">
          {unit.sessions.map((s, i) => {
            // Sessions open in order; finished ones can be replayed.
            const open = unlockAll || i === 0 || done[i - 1] || done[i]
            return (
              <li key={i} className={`unit ${done[i] ? 'unit-done' : open ? 'unit-open' : 'unit-locked'}`}>
                <button className="link" disabled={!open} onClick={() => navigate({ name: 'session', unitId: unit.id, index: i + 1 })}>
                  {i + 1}. {s.title}
                </button>
                <span className="muted">{done[i] ? 'пройдено' : KIND_LABELS[s.kind]}</span>
              </li>
            )
          })}
        </ul>
      </Card>

      <Card title="Выражения юнита">
        <ul className="expressions">
          {unit.expressions.map((e) => (
            <li key={e.en}>
              <span lang="en">{e.en}</span> <span className="muted">— {e.ru}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
