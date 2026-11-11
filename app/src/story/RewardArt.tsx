import { SPRITES, type HeroineId } from './sprites'

// Celebration pictures from docs/33-reward-art-brief.md: assets/reward/{heroine}_{moment}.webp
// for one heroine, assets/reward/trio_{moment}.webp for all three. Until a picture arrives,
// the heroine's ordinary sprite stands in for it.
const files = import.meta.glob<string>('../../../assets/reward/*.webp', { eager: true, query: '?url', import: 'default' })
const ART: Record<string, string> = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace('.webp', ''), url]))

/** One heroine celebrates: a session, a daily quest, coming back after a break. */
export type RewardMoment = 'session' | 'quest' | 'welcome' | 'challenge_win' | 'challenge_next'
/** All three celebrate together: a unit mission, a module check, a streak milestone. */
export type TrioMoment = 'mission' | 'module' | 'streak'

/** The sprite each heroine shows while her reward picture is missing. */
const STAND_IN: Record<HeroineId, string> = { mika: 'excited', rei: 'smirk', iris: 'dry_smile' }

const standIn = (heroine: HeroineId) => SPRITES[`${heroine}/base/stand/${STAND_IN[heroine]}`] ?? SPRITES[`${heroine}/base/stand/happy`]

/**
 * The reward picture for a session's end. A unit mission or a module check shows all three
 * heroines when that picture exists; otherwise the unit's heroine on a circle of her colour,
 * the bottom of the picture cut along the circle.
 */
export function RewardArt({ heroine, moment, trio, label }: { heroine: HeroineId; moment: RewardMoment; trio?: TrioMoment; label: string }) {
  const group = trio && ART[`trio_${trio}`]
  if (group) {
    return (
      <div className={`reward reward-trio route-${heroine}`}>
        <div className="reward-plate" />
        <img className="reward-art" src={group} alt={label} />
      </div>
    )
  }
  const art = ART[`${heroine}_${moment}`]
  const url = art ?? standIn(heroine)
  return (
    <div className={`reward route-${heroine}`}>
      <div className="reward-plate" />
      <div className="reward-crop">{url && <img className={art ? 'reward-art' : 'reward-sprite'} src={url} alt={label} />}</div>
    </div>
  )
}
