import { dayKey } from '../data/dates'
import { useClub } from '../data/store'
import { currentStreak } from '../data/streak'
import { GoalRing } from '../ui/kit'

export function TopBar() {
  const { settings, days } = useClub()
  const today = dayKey()
  const minutes = days.find((d) => d.date === today)?.minutes ?? 0
  const streak = currentStreak(days, settings.dailyGoalMinutes, today)
  return (
    <header className="topbar">
      <span title="Стрик">🔥 {streak}</span>
      <GoalRing minutes={minutes} goal={settings.dailyGoalMinutes} />
      {/* Crystals appear with the shop (stage 6); a constant "💎 0" would look broken. */}
      <span aria-hidden />
    </header>
  )
}
