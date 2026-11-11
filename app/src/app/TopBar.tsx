import { dayKey } from '../data/dates'
import { useClub } from '../data/store'
import { currentStreak } from '../data/streak'
import { Icon } from '../ui/Icon'
import { GoalRing } from '../ui/kit'
import { useChatUnread } from '../features/chat/unread'
import { navigate } from './router'

export function TopBar() {
  const { settings, days, wallet } = useClub()
  const today = dayKey()
  const minutes = days.find((d) => d.date === today)?.minutes ?? 0
  const streak = currentStreak(days, settings.dailyGoalMinutes, today, wallet.frozen)
  const unread = useChatUnread()
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
      <button className="topbar-stat topbar-crystals" onClick={() => navigate({ name: 'quests' })} aria-label={`Кристаллы: ${wallet.crystals}`}>
        <Icon name="crystal" />
        {wallet.crystals}
      </button>
      {/* The phone opens the team chat. */}
      <button className="topbar-phone" onClick={() => navigate({ name: 'chat' })} aria-label={unread ? `Чат «Room 17», новых: ${unread}` : 'Чат «Room 17»'}>
        <Icon name="phone" size={28} />
        {unread > 0 && <span className="topbar-badge">{unread}</span>}
      </button>
    </header>
  )
}
