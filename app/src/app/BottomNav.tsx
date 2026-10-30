import { TABS, navigate } from './router'

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
