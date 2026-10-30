import { useClub } from '../data/store'
import { TABS, navigate } from './router'

export function BottomNav({ current }: { current: string }) {
  // What is due after class: topics whose day has come and put-off speaking tasks.
  const reviewDue = useClub((s) => s.reviewDue)
  return (
    <nav className="bottomnav">
      {TABS.map((t) => (
        <button key={t.route} className={current === t.route ? 'active' : ''} aria-current={current === t.route ? 'page' : undefined} onClick={() => navigate({ name: t.route })}>
          {t.label}
          {t.route === 'review' && reviewDue > 0 && (
            <span className="nav-badge" aria-label={`пора повторить: ${reviewDue}`}>
              {reviewDue}
            </span>
          )}
        </button>
      ))}
    </nav>
  )
}
