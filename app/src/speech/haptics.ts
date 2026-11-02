// Short vibrations on events, as Duolingo does: a tap on buttons, a light
// pulse for a right answer, a double buzz for a wrong one, a little rhythm at
// the end of a session. The Vibration API works in Chrome on Android; iPhone
// browsers ignore it, so there it is simply silent.

export type Haptic = 'tap' | 'right' | 'wrong' | 'done'

const PATTERNS: Record<Haptic, number | number[]> = {
  tap: 8,
  right: 18,
  wrong: [35, 50, 35],
  done: [20, 60, 20, 60, 70],
}

let enabled = true

/** Follows the profile setting (app/App.tsx). */
export function setHapticsEnabled(on: boolean) {
  enabled = on
}

export const canVibrate = () => typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'

export function haptic(kind: Haptic) {
  if (!enabled || !canVibrate()) return
  try {
    navigator.vibrate(PATTERNS[kind])
  } catch {
    // Some browsers throw when the page has not been touched yet; a missed buzz is fine.
  }
}
