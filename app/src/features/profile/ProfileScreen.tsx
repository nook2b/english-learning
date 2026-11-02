import { useEffect, useState } from 'react'
import { DAILY_GOALS, db } from '../../data/db'
import { navigate } from '../../app/router'
import { useClub } from '../../data/store'
import { PlacementCard } from '../story/PlacementCheck'
import { currentStreak } from '../../data/streak'
import { dayKey } from '../../data/dates'
import { Icon } from '../../ui/Icon'
import { Button, Card } from '../../ui/kit'

export function ProfileScreen() {
  const { settings, days, units, updateSettings, reset, resetAll } = useClub()
  const totalMinutes = days.reduce((sum, d) => sum + d.minutes, 0)
  const streak = currentStreak(days, settings.dailyGoalMinutes, dayKey())
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
      <div className="profile-head">
        <span className="profile-avatar" aria-hidden>
          {(settings.name.trim()[0] ?? '?').toUpperCase()}
        </span>
        <div>
          <h1>{settings.name.trim() || 'Студент по обмену'}</h1>
          <p className="muted">Комната 17 · стрик {streak}</p>
        </div>
      </div>

      <div className="stat-tiles stat-tiles-2">
        <div className="stat-card">
          <Icon name="goal" size={34} />
          <p>
            <b>{totalMinutes}</b>
            Минут всего
          </p>
        </div>
        <div className="stat-card">
          <Icon name="calendar" size={34} />
          <p>
            <b>{days.length}</b>
            Дней с занятиями
          </p>
        </div>
        <div className="stat-card">
          <Icon name="nav-path" size={34} />
          <p>
            <b>{Object.keys(units).length}</b>
            Юнитов пройдено
          </p>
        </div>
        <div className="stat-card">
          <Icon name="later" size={34} />
          <p>
            <b>{deferred}</b>
            Отложено с микрофоном
          </p>
        </div>
      </div>

      <Card title="Профиль">
        <label className="field">
          Как к тебе обращаться
          <input value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} placeholder="Имя" />
        </label>
      </Card>

      <Card title={<><Icon name="goal" />Дневная цель</>}>
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

      <Card title={<><Icon name="settings" />Настройки</>}>
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

      <Card title={<><Icon name="lock" />Разработка и сброс</>}>
        <label className="field-inline">
          <input type="checkbox" checked={settings.unlockAll} onChange={(e) => updateSettings({ unlockAll: e.target.checked })} />
          Режим разработчика: занятия в любом порядке, все факты, воспоминания и реплики героинь, кнопка «Пропустить» в заданиях (задание засчитывается верным)
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
