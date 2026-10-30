import { useSyncExternalStore } from 'react'
import type { Speaker } from '../content/schema'
import { clipUrl } from './clips'
import { type Delivery, voicedText } from './delivery'
import { mouthPause, mouthStart, mouthStop } from './mouth'
import { canSpeak, speak as synth } from './tts'

// One voice at a time for the whole app: a recorded clip when there is one,
// browser speech synthesis otherwise. Supports pause, resume and stop.

export type VoiceState = 'idle' | 'playing' | 'paused'

let state: VoiceState = 'idle'
let current: { id: string; audio?: HTMLAudioElement } | undefined
const listeners = new Set<() => void>()

function set(next: VoiceState, id?: string) {
  state = next
  if (next === 'idle') {
    current = undefined
    mouthStop()
  }
  else if (id && current) current.id = id
  listeners.forEach((l) => l())
}

// Clips are fetched ahead of time (the lines of a scene as it opens), so the
// first tap starts at once. The same elements are reused for playing. A plain
// fetch of the whole file also lets the service worker keep it for offline use
// (the audio element itself asks for byte ranges, which cannot be cached).
const loaded = new Map<string, HTMLAudioElement>()

function clipAudio(url: string): HTMLAudioElement {
  let audio = loaded.get(url)
  if (!audio) {
    audio = new Audio(url)
    audio.preload = 'auto'
    if (typeof fetch === 'function') void fetch(url).catch(() => {})
    loaded.set(url, audio)
    if (loaded.size > 40) loaded.delete(loaded.keys().next().value!)
  }
  return audio
}

/** Starts downloading the clips of these lines; lines without a clip are skipped. */
export function preload(lines: readonly ({ text: string; speaker: Speaker } & Delivery)[]) {
  if (typeof Audio === 'undefined') return
  for (const l of lines) {
    const url = clipUrl(l.speaker, voicedText(l.text, l))
    if (url) clipAudio(url)
  }
}

export const canVoice = () => canSpeak() || typeof Audio !== 'undefined'

export function stop() {
  current?.audio?.pause()
  if (canSpeak()) window.speechSynthesis.cancel()
  set('idle')
}

export function play(text: string, speaker: Speaker = 'narrator', slow = false, delivery: Delivery = {}) {
  stop()
  const id = `${speaker}|${text}`
  // Clips are keyed by the voiced text (with audio tags); browser speech reads the plain text.
  const url = clipUrl(speaker, voicedText(text, delivery))
  if (url) {
    const audio = clipAudio(url)
    audio.currentTime = 0
    audio.playbackRate = slow ? 0.75 : 1
    audio.onended = () => current?.audio === audio && set('idle')
    const mine = (current = { id, audio })
    // A clip that cannot load (offline and not cached yet) falls back to browser speech.
    audio.onerror = () => {
      if (current !== mine) return
      mouthStop()
      speakInstead(text, speaker, slow, id)
    }
    // The mouth listens for the clip's 'playing' event, so attach it first.
    mouthStart(speaker, audio)
    // Older browsers return undefined instead of a promise from play().
    audio.play()?.catch(() => current === mine && set('idle'))
  } else {
    if (!canSpeak()) return
    speakInstead(text, speaker, slow, id)
  }
  set('playing', id)
}

function speakInstead(text: string, speaker: Speaker, slow: boolean, id: string) {
  if (!canSpeak()) return set('idle')
  current = { id }
  synth(text, speaker, slow, () => current?.id === id && !current.audio && set('idle'))
  mouthStart(speaker)
}

/** Whether this text can be heard at all: a recorded clip or browser speech. */
export function hasVoice(text: string, speaker: Speaker, delivery: Delivery = {}): boolean {
  return !!clipUrl(speaker, voicedText(text, delivery)) || canSpeak()
}

export function pause() {
  if (state !== 'playing') return
  // A paused clip closes the mouth by itself (its 'pause' event).
  if (current?.audio) current.audio.pause()
  else {
    window.speechSynthesis.pause()
    mouthPause()
  }
  set('paused')
}

export function resume() {
  if (state !== 'paused') return
  if (current?.audio) current.audio.play()?.catch(() => set('idle'))
  else if (current) {
    window.speechSynthesis.resume()
    mouthStart(current.id.split('|')[0]!)
  }
  set('playing')
}

/** Voice state for one text: other texts playing count as idle here. */
export function useVoice(text: string, speaker: Speaker): VoiceState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => (current?.id === `${speaker}|${text}` ? state : 'idle'),
  )
}
