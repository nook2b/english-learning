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
// first tap starts at once. The same elements are reused for playing. The whole
// file is fetched once (the service worker keeps it for offline use) and played
// from memory: Safari sometimes fails byte-range requests through the service
// worker, and a failed clip must not turn into robotic browser speech.
interface Clip {
  audio: HTMLAudioElement
  /** The fetched file as a blob URL, or undefined when it could not be fetched. */
  memory: Promise<string | undefined>
}
const loaded = new Map<string, Clip>()

function fetchToMemory(url: string): Promise<string | undefined> {
  if (typeof fetch !== 'function' || typeof URL.createObjectURL !== 'function') return Promise.resolve(undefined)
  return fetch(url)
    .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
    .then((b) => URL.createObjectURL(b))
    .catch(() => undefined)
}

function clip(url: string): Clip {
  let c = loaded.get(url)
  if (!c) {
    const audio = new Audio(url)
    audio.preload = 'auto'
    const memory = fetchToMemory(url)
    // Switch to the copy in memory unless the clip is already playing from the network.
    void memory.then((m) => {
      if (m && audio.paused && audio.currentTime === 0) audio.src = m
    })
    c = { audio, memory }
    loaded.set(url, c)
    if (loaded.size > 40) {
      const [oldUrl, old] = loaded.entries().next().value!
      loaded.delete(oldUrl)
      void old.memory.then((m) => m && URL.revokeObjectURL(m))
    }
  }
  return c
}

/** Starts downloading the clips of these lines; lines without a clip are skipped. */
export function preload(lines: readonly ({ text: string; speaker: Speaker } & Delivery)[]) {
  if (typeof Audio === 'undefined') return
  for (const l of lines) {
    const url = clipUrl(l.speaker, voicedText(l.text, l))
    if (url) clip(url)
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
    const { audio, memory } = clip(url)
    audio.currentTime = 0
    audio.playbackRate = slow ? 0.75 : 1
    audio.onended = () => current?.audio === audio && set('idle')
    const mine = (current = { id, audio })
    // A clip that fails to load is played again from memory; only a file that cannot
    // be fetched at all (offline and not cached yet) falls back to browser speech.
    let retried = false
    audio.onerror = () => {
      if (current !== mine) return
      void memory.then((m) => {
        if (current !== mine) return
        if (m && !retried && audio.src !== m) {
          retried = true
          audio.src = m
          audio.playbackRate = slow ? 0.75 : 1
          audio.play()?.catch(() => current === mine && set('idle'))
          return
        }
        mouthStop()
        speakInstead(text, speaker, slow, id)
      })
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
