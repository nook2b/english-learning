import { useEffect, useState } from 'react'
import { DAILY_GOALS, db } from '../../data/db'
import { navigate } from '../../app/router'
import { useClub } from '../../data/store'
import { PlacementCard } from '../story/PlacementCheck'
import { Button, Card } from '../../ui/kit'

export function ProfileScreen() {
  const { settings, days, units, updateSettings, reset, resetAll } = useClub()
  const totalMinutes = days.reduce((sum, d) => sum + d.minutes, 0)
  const deferred = useDeferredCount()
  const placements = settings.placements ?? []
  const last = placements.at(-1)

  const onReset = async () => {
    if (window.confirm('Сбросить весь прогресс? Настройки останутся.')) await reset()
  }

  const onResetAll = async () => {
    if (window.confirm('Сбросить всё: прогресс, имя и настройки? Приложение станет как при первом запуске.')) await resetAll()
  }

  return (
    <div className="screen">
      <Card title="Профиль">
        <label className="field">
          Как к тебе обращаться
          <input value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} placeholder="Имя" />
        </label>
      </Card>

      <Card title="Дневная цель">
        <div className="chips" role="radiogroup" aria-label="Дневная цель">
          {DAILY_GOALS.map((g) => (
            <button
              key={g}
              role="radio"
              aria-checked={settings.dailyGoalMinutes === g}
              className={`chip ${settings.dailyGoalMinutes === g ? 'active' : ''}`}
              onClick={() => updateSettings({ dailyGoalMinutes: g })}
            >
              {g} мин
            </button>
          ))}
        </div>
      </Card>

      {last && <PlacementCard result={last} previous={placements.at(-2)} title="Профиль навыков" />}
      <Button variant="secondary" onClick={() => navigate({ name: 'placement' })}>
        {last ? 'Пройти проверку ещё раз' : 'Пройти проверку уровня'}
      </Button>

      <Card title="Статистика">
        <p>Минут всего: {totalMinutes}</p>
        <p>Дней с занятиями: {days.length}</p>
        <p>Юнитов пройдено: {Object.keys(units).length}</p>
        {deferred > 0 && <p>Отложено заданий с микрофоном: {deferred}</p>}
      </Card>

      <Card title="Настройки">
        <label className="field-inline">
          <input type="checkbox" checked={settings.voice} onChange={(e) => updateSettings({ voice: e.target.checked })} />
          Озвучка
        </label>
        <label className="field-inline">
          <input type="checkbox" checked={settings.sounds} onChange={(e) => updateSettings({ sounds: e.target.checked })} />
          Звуки ответов
        </label>
        <label className="field-inline">
          <input
            type="checkbox"
            checked={settings.translation === 'always'}
            onChange={(e) => updateSettings({ translation: e.target.checked ? 'always' : 'tap' })}
          />
          Перевод в истории всегда показан
        </label>
        <label className="field-inline">
          <input type="checkbox" checked={settings.support} onChange={(e) => updateSettings({ support: e.target.checked })} />
          Режим поддержки: переводы сразу, фразы из слов, озвучка медленнее
        </label>
      </Card>

      <Card title="Тестирование и сброс">
        <label className="field-inline">
          <input type="checkbox" checked={settings.unlockAll} onChange={(e) => updateSettings({ unlockAll: e.target.checked })} />
          Открыть всё: занятия в любом порядке, факты, воспоминания и реплики героинь
        </label>
        <div className="actions">
          <Button variant="secondary" onClick={onReset}>
            Сбросить прогресс
          </Button>
          <Button variant="secondary" onClick={onResetAll}>
            Сбросить всё, включая настройки
          </Button>
        </div>
        <p className="muted">Версия приложения: {__BUILD__}</p>
      </Card>
    </div>
  )
}

/** Speaking tasks put off with "can't speak now" and not done since. */
function useDeferredCount(): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let live = true
    void db.deferred
      .filter((d) => !d.doneAt)
      .count()
      .then((n) => live && setCount(n))
    return () => {
      live = false
    }
  }, [])
  return count
}
