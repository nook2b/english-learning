import { navigate } from '../../app/router'
import { UNITS, nextSession } from '../../content/course'
import { ARC1, ARC1_UNITS } from '../../content/outline'
import { CHARACTERS } from '../../content/characters'
import { dayKey } from '../../data/dates'
import { useClub, sessionsDone } from '../../data/store'
import { Gloss, Translation } from '../../lesson/Gloss'
import { LineVoice } from '../../speech/AudioControls'
import { Sprite } from '../../story/Stage'
import { HEROINE_IDS } from '../../story/sprites'
import { Button, Card, DialogueBox, ProgressBar } from '../../ui/kit'

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
