import { registerSW } from 'virtual:pwa-register'

// The app is installed and works offline, so a phone may keep showing an
// old build after a deploy. Check for a new version on start, every 30
// minutes and when the app comes back to the foreground; once the new
// service worker takes over, reload so the new code runs right away.
export function startUpdates() {
  if (!('serviceWorker' in navigator)) return
  let reloading = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return
    reloading = true
    window.location.reload()
  })
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      if (!registration) return
      const check = () => void registration.update().catch(() => {})
      setInterval(check, 30 * 60 * 1000)
      document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && check())
    },
  })
}
