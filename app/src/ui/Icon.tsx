// Room 17 icon set (design/icons): filled two-tone SVGs with a darker depth layer,
// drawn on a 32×32 grid. Glyphs (`g-*`) are white, for coloured station dots.
const files = import.meta.glob<string>('./icons/*.svg', { eager: true, query: '?url', import: 'default' })

export const ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.slice('./icons/'.length, -'.svg'.length), url]),
)

export type IconName =
  | 'streak' | 'streak-off' | 'freeze' | 'crystal' | 'xp' | 'goal' | 'calendar'
  | 'nav-path' | 'nav-review' | 'nav-quests' | 'nav-heroines' | 'nav-profile'
  | 'mic' | 'headphones' | 'speaker' | 'slow' | 'translate' | 'later' | 'check' | 'cross'
  | 'notebook' | 'letter' | 'memory' | 'gift' | 'shop' | 'lock' | 'trophy' | 'star'
  | 'challenge' | 'external' | 'plane' | 'settings' | 'on-air' | 'phone'
  | 'g-book' | 'g-pencil' | 'g-bubble' | 'g-stopwatch' | 'g-star' | 'g-trophy' | 'g-check'

/**
 * A decorative icon by default (empty alt): the text next to it carries the meaning.
 * Pass `label` when the icon stands alone.
 */
export function Icon({ name, size = 24, label, className = '' }: { name: IconName; size?: number; label?: string; className?: string }) {
  return <img className={`icon ${className}`} src={ICONS[name]} width={size} height={size} alt={label ?? ''} aria-hidden={label ? undefined : true} draggable={false} />
}
