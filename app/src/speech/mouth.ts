import { useSyncExternalStore } from 'react'

// Who is speaking right now and whether her mouth is open, for the talking
// animation. Recorded clips drive the mouth by loudness (simple lip-sync);
// browser speech gives no audio data, so the mouth flaps on a timer.

let speaker: string | undefined
let open = false
let stopDriver: (() => void) | undefined
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function setOpen(next: boolean) {
  if (next !== open) {
    open = next
    emit()
  }
}

let ctx: AudioContext | undefined

function loudnessDriver(audio: HTMLAudioElement): () => void {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return flapDriver()
  ctx ??= new AC()
  // Routing a clip through a suspended context mutes it (iOS before the first
  // user gesture). Until audio is unlocked, keep the clip direct and flap instead.
  if (ctx.state !== 'running') {
    void ctx.resume()
    return flapDriver()
  }
  const source = ctx.createMediaElementSource(audio)
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 512
  source.connect(analyser)
  analyser.connect(ctx.destination)
  const data = new Uint8Array(analyser.fftSize)
  let frame = 0
  const tick = () => {
    analyser.getByteTimeDomainData(data)
    let sum = 0
    for (const v of data) sum += ((v - 128) / 128) ** 2
    const rms = Math.sqrt(sum / data.length)
    // Hysteresis keeps the mouth from flickering on quiet consonants.
    setOpen(open ? rms > 0.03 : rms > 0.06)
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}

function flapDriver(): () => void {
  const timer = setInterval(() => setOpen(!open), 140)
  return () => clearInterval(timer)
}

/** Called by the voice engine when speech starts, pauses, resumes or ends. */
export function mouthStart(who: string, audio?: HTMLAudioElement) {
  mouthStop()
  speaker = who
  stopDriver = audio ? loudnessDriver(audio) : flapDriver()
  emit()
}

export function mouthPause() {
  stopDriver?.()
  stopDriver = undefined
  setOpen(false)
}

export function mouthStop() {
  stopDriver?.()
  stopDriver = undefined
  speaker = undefined
  open = false
  emit()
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

/** 'closed' while she speaks between syllables, 'open' on a syllable, undefined when silent. */
export function useMouth(who: string): 'open' | 'closed' | undefined {
  return useSyncExternalStore(subscribe, () => (speaker !== who ? undefined : open ? 'open' : 'closed'))
}
