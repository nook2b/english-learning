import { SPRITES, type HeroineId } from './sprites'

// Celebration pictures from docs/29-reward-art-brief.md: assets/reward/{heroine}_{moment}.webp.
// Until a picture arrives, the heroine's ordinary sprite stands in for it.
const files = import.meta.glob<string>('../../../assets/reward/*.webp', { eager: true, query: '?url', import: 'default' })
const ART: Record<string, string> = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace('.webp', ''), url]))

export type RewardMoment = 'session' | 'quest' | 'welcome'

/** The sprite each heroine shows while her reward picture is missing. */
const STAND_IN: Record<HeroineId, string> = { mika: 'excited', rei: 'smirk', iris: 'dry_smile' }

function rewardUrl(heroine: HeroineId, moment: RewardMoment): { url?: string; art: boolean } {
  const art = ART[`${heroine}_${moment}`]
  if (art) return { url: art, art: true }
  return { url: SPRITES[`${heroine}/base/stand/${STAND_IN[heroine]}`] ?? SPRITES[`${heroine}/base/stand/happy`], art: false }
}

/** The heroine on a circle of her colour, the bottom of the picture cut along the circle. */
export function RewardArt({ heroine, moment, label }: { heroine: HeroineId; moment: RewardMoment; label: string }) {
  const { url, art } = rewardUrl(heroine, moment)
  return (
    <div className={`reward route-${heroine}`}>
      <div className="reward-plate" />
      <div className="reward-crop">{url && <img className={art ? 'reward-art' : 'reward-sprite'} src={url} alt={label} />}</div>
    </div>
  )
}
