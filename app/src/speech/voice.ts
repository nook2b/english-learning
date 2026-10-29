import { useSyncExternalStore } from 'react'
import type { Speaker } from '../content/schema'
import { clipUrl } from './clips'
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

export const canVoice = () => canSpeak() || typeof Audio !== 'undefined'

export function stop() {
  current?.audio?.pause()
  if (canSpeak()) window.speechSynthesis.cancel()
  set('idle')
}

export function play(text: string, speaker: Speaker = 'narrator', slow = false) {
  stop()
  const id = `${speaker}|${text}`
  const url = clipUrl(speaker, text)
  if (url) {
    const audio = new Audio(url)
    audio.playbackRate = slow ? 0.75 : 1
    audio.onended = () => current?.audio === audio && set('idle')
    current = { id, audio }
    void audio.play().catch(() => set('idle'))
    mouthStart(speaker, audio)
  } else {
    if (!canSpeak()) return
    current = { id }
    synth(text, speaker, slow, () => current?.id === id && !current.audio && set('idle'))
    mouthStart(speaker)
  }
  set('playing', id)
}

export function pause() {
  if (state !== 'playing') return
  // A paused clip is silent, so its loudness analyser closes the mouth by itself.
  if (current?.audio) current.audio.pause()
  else {
    window.speechSynthesis.pause()
    mouthPause()
  }
  set('paused')
}

export function resume() {
  if (state !== 'paused') return
  if (current?.audio) void current.audio.play()
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
