/**
 * What the voice message shows: the seconds left (the whole length before it
 * starts, at the speed it will play) and the share already heard. Without a
 * recorded clip the length is estimated from the words.
 */
export function voiceTime(text: string, audio: HTMLAudioElement | undefined, mine: boolean, slow: boolean): { seconds: number; done: number } {
  const length = audio && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : undefined
  if (!length) return { seconds: Math.max(2, Math.round(text.split(/\s+/).length / 2.6)), done: 0 }
  const rate = mine ? audio!.playbackRate || 1 : slow ? 0.75 : 1
  const at = mine ? Math.min(audio!.currentTime, length) : 0
  return { seconds: Math.ceil((length - at) / rate - 0.05), done: at / length }
}

export const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`
