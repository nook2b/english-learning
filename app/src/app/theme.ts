// Light, dark or the phone's own setting. Light is the default: the design was drawn light.
// Kept in localStorage (not the progress database) so it applies before the first paint.

export type Theme = 'light' | 'dark' | 'system'

export const THEMES: { id: Theme; label: string }[] = [
  { id: 'light', label: 'Светлая' },
  { id: 'dark', label: 'Тёмная' },
  { id: 'system', label: 'Как в телефоне' },
]

const KEY = 'theme'
const BAR = { light: '#ffffff', dark: '#16171f' }

export function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    return saved === 'dark' || saved === 'system' ? saved : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? BAR.dark : BAR.light)
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // Private mode: the choice lasts until the page closes.
  }
  applyTheme(theme)
}
