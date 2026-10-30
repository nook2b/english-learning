// Short answer sounds, synthesised with Web Audio so there are no files to
// load: a soft rising chime for a right answer, a quiet falling pair for a
// wrong one (sad, not a buzzer), a three-note phrase at the end of a session.

import { audioContext } from './context'

function audio(): AudioContext | undefined {
  const ctx = audioContext()
  void ctx?.resume()
  return ctx
}

/** One soft bell-like note: sine with a little octave shimmer and a quick fade. */
function note(ac: AudioContext, freq: number, start: number, length: number, volume: number, type: OscillatorType = 'sine') {
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(volume, start + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + length)
  gain.connect(ac.destination)
  for (const [mult, level] of [
    [1, 1],
    [2, 0.25],
  ] as const) {
    const osc = ac.createOscillator()
    const g = ac.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq * mult, start)
    g.gain.value = level
    osc.connect(g).connect(gain)
    osc.start(start)
    osc.stop(start + length + 0.05)
  }
}

export type Sfx = 'right' | 'wrong' | 'done'

export function playSfx(kind: Sfx) {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime + 0.01
  if (kind === 'right') {
    note(ac, 880, t, 0.25, 0.12) // A5
    note(ac, 1318.5, t + 0.09, 0.4, 0.12) // E6
  } else if (kind === 'wrong') {
    note(ac, 392, t, 0.3, 0.09, 'triangle') // G4
    note(ac, 311.1, t + 0.16, 0.45, 0.09, 'triangle') // E♭4
  } else {
    note(ac, 659.3, t, 0.25, 0.1) // E5
    note(ac, 784, t + 0.12, 0.25, 0.1) // G5
    note(ac, 1046.5, t + 0.24, 0.6, 0.12) // C6
  }
}
