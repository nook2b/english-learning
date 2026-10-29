import { type Route, navigate } from './router'

const TABS: { route: Route; label: string }[] = [
  { route: 'path', label: 'Путь' },
  { route: 'review', label: 'Повторение' },
  { route: 'story', label: 'История' },
  { route: 'heroines', label: 'Героини' },
  { route: 'profile', label: 'Профиль' },
]

export function BottomNav({ current }: { current: Route }) {
  return (
    <nav className="bottomnav">
      {TABS.map((t) => (
        <button key={t.route} className={current === t.route ? 'active' : ''} aria-current={current === t.route ? 'page' : undefined} onClick={() => navigate(t.route)}>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
