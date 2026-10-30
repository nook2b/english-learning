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
// A media element can be routed into the context only once, so keep its analyser.
const analysers = new WeakMap<HTMLAudioElement, AnalyserNode>()

function audioContext(): AudioContext | undefined {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (AC) ctx ??= new AC()
  return ctx
}

/**
 * Starts the audio context on the first tap anywhere (iOS allows it only in a
 * user gesture), so even the first clip gets loudness lip-sync.
 */
export function unlockAudioOnFirstTap() {
  if (typeof document === 'undefined') return
  const unlock = () => {
    const c = audioContext()
    if (!c || c.state === 'running') return done()
    void c.resume().then(done, () => {})
  }
  const done = () => ['pointerdown', 'touchend', 'click'].forEach((e) => document.removeEventListener(e, unlock, true))
  ;['pointerdown', 'touchend', 'click'].forEach((e) => document.addEventListener(e, unlock, true))
}

function loudnessDriver(audio: HTMLAudioElement): () => void {
  const c = audioContext()
  if (!c) return flapDriver()
  let analyser = analysers.get(audio)
  if (!analyser) {
    // Routing a clip through a suspended context mutes it (iOS before the first
    // user gesture). Until audio is unlocked, keep the clip direct and flap instead.
    if (c.state !== 'running') {
      void c.resume()
      return flapDriver()
    }
    analyser = c.createAnalyser()
    analyser.fftSize = 512
    c.createMediaElementSource(audio).connect(analyser)
    analyser.connect(c.destination)
    analysers.set(audio, analyser)
  }
  const node = analyser
  const data = new Uint8Array(node.fftSize)
  let frame = 0
  const tick = () => {
    node.getByteTimeDomainData(data)
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

/**
 * Moves the mouth only while the clip is really playing: a clip that is still
 * loading (the first play) or buffering keeps the mouth shut, so the lips never
 * run ahead of the sound.
 */
function clipDriver(audio: HTMLAudioElement): () => void {
  let inner: (() => void) | undefined
  const halt = () => {
    inner?.()
    inner = undefined
    setOpen(false)
  }
  const start = () => {
    halt()
    inner = loudnessDriver(audio)
  }
  audio.addEventListener('playing', start)
  audio.addEventListener('waiting', halt)
  audio.addEventListener('pause', halt)
  return () => {
    halt()
    audio.removeEventListener('playing', start)
    audio.removeEventListener('waiting', halt)
    audio.removeEventListener('pause', halt)
  }
}

function flapDriver(): () => void {
  const timer = setInterval(() => setOpen(!open), 140)
  return () => clearInterval(timer)
}

/** Called by the voice engine when speech starts, pauses, resumes or ends. */
export function mouthStart(who: string, audio?: HTMLAudioElement) {
  mouthStop()
  speaker = who
  stopDriver = audio ? clipDriver(audio) : flapDriver()
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
