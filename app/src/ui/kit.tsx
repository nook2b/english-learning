import type { ButtonHTMLAttributes, ReactNode } from 'react'

// Placeholder UI kit. The real visual design comes later; keep these
// components small so the design pass only has to restyle them.

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  return <button className={`btn btn-${variant} ${className}`} {...props} />
}

export function Card({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <section className="card">
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </section>
  )
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function GoalRing({ minutes, goal }: { minutes: number; goal: number }) {
  const r = 16
  const c = 2 * Math.PI * r
  const done = Math.min(1, goal > 0 ? minutes / goal : 0)
  return (
    <svg className="ring" width="40" height="40" viewBox="0 0 40 40" role="img" aria-label={`Сегодня ${minutes} из ${goal} мин`}>
      <circle cx="20" cy="20" r={r} className="ring-track" />
      <circle cx="20" cy="20" r={r} className="ring-fill" strokeDasharray={c} strokeDashoffset={c * (1 - done)} transform="rotate(-90 20 20)" />
      <text x="20" y="24" textAnchor="middle" className="ring-text">
        {minutes}
      </text>
    </svg>
  )
}

/** Visual-novel line window: speaker name and line. Typing effect arrives in stage 5. */
export function DialogueBox({ speaker, children }: { speaker?: string; children: ReactNode }) {
  return (
    <div className="dialogue">
      {speaker && <div className="dialogue-speaker">{speaker}</div>}
      <div className="dialogue-text">{children}</div>
    </div>
  )
}

/** Learning panel: grammar notes and error explanations live here, never in heroine lines. */
export function LearnPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="learn-panel">
      <div className="learn-panel-title">{title}</div>
      <div>{children}</div>
    </aside>
  )
}

const HEROINE_COLORS = { rei: '#5b3a6b', mika: '#e58fb0', iris: '#7a5a3c' } as const
export type HeroineId = keyof typeof HEROINE_COLORS

/** Stand-in for a sprite until art exists: a silhouette labelled with heroine/pose/expression. */
export function SpriteStub({ heroine, pose = 'stand', expr = 'neutral' }: { heroine: HeroineId; pose?: string; expr?: string }) {
  return (
    <div className="sprite-stub" style={{ background: HEROINE_COLORS[heroine] }} aria-label={`${heroine} ${pose} ${expr}`}>
      <span>
        {heroine}
        <br />
        {pose} / {expr}
      </span>
    </div>
  )
}
