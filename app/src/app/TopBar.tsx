import { dayKey } from '../data/dates'
import { useClub } from '../data/store'
import { currentStreak } from '../data/streak'
import { Icon } from '../ui/Icon'
import { GoalRing } from '../ui/kit'

export function TopBar() {
  const { settings, days } = useClub()
  const today = dayKey()
  const minutes = days.find((d) => d.date === today)?.minutes ?? 0
  const streak = currentStreak(days, settings.dailyGoalMinutes, today)
  return (
    <header className="topbar">
      <span className="topbar-stat topbar-streak" title="Стрик">
        <Icon name={streak > 0 ? 'streak' : 'streak-off'} />
        {streak}
      </span>
      <span className="topbar-goal">
        <GoalRing minutes={minutes} goal={settings.dailyGoalMinutes} />
        {minutes} / {settings.dailyGoalMinutes} мин
      </span>
      {/* Crystals appear with the shop (stage 6); a constant "💎 0" would look broken. */}
      <span aria-hidden />
    </header>
  )
}
