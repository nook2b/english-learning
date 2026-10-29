import { type TabName, navigate } from './router'

const TABS: { route: TabName; label: string }[] = [
  { route: 'path', label: 'Путь' },
  { route: 'review', label: 'Повторение' },
  { route: 'story', label: 'История' },
  { route: 'heroines', label: 'Героини' },
  { route: 'profile', label: 'Профиль' },
]

export function BottomNav({ current }: { current: string }) {
  return (
    <nav className="bottomnav">
      {TABS.map((t) => (
        <button key={t.route} className={current === t.route ? 'active' : ''} aria-current={current === t.route ? 'page' : undefined} onClick={() => navigate({ name: t.route })}>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
