// One Web Audio context for the whole app: answer sounds (sfx.ts) and the
// lip-sync analyser (mouth.ts). iOS lets it start only inside a user gesture,
// so the first tap anywhere unlocks it for both.

let ctx: AudioContext | undefined

export function audioContext(): AudioContext | undefined {
  if (typeof window === 'undefined') return undefined
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (AC) ctx ??= new AC()
  return ctx
}

export function unlockAudioOnFirstTap() {
  if (typeof document === 'undefined') return
  const events = ['pointerdown', 'touchend', 'click']
  const done = () => events.forEach((e) => document.removeEventListener(e, unlock, true))
  const unlock = () => {
    const c = audioContext()
    if (!c || c.state === 'running') return done()
    void c.resume().then(done, () => {})
  }
  events.forEach((e) => document.addEventListener(e, unlock, true))
}
