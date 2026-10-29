import type { Speaker } from '../content/schema'

// Browser speech synthesis until recorded audio exists. Accents follow the
// plan's working choice: Mika US, Iris UK, Rei AU.
const LANG: Partial<Record<Speaker, string>> = { mika: 'en-US', iris: 'en-GB', rei: 'en-AU' }

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  return voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang.startsWith('en'))
}

export function speak(text: string, speaker: Speaker = 'narrator', slow = false, onEnd?: () => void): void {
  if (!canSpeak()) return
  const lang = LANG[speaker] ?? 'en-US'
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = slow ? 0.7 : 1
  const voice = pickVoice(lang)
  if (voice) u.voice = voice
  if (onEnd) u.onend = onEnd
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}
