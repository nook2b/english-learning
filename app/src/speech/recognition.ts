// Web Speech API recognition. Chrome and Safari support it; some in-app
// browsers (Telegram on Android) do not, and the speak exercise then offers
// to skip.

interface RecognitionResultList {
  length: number
  [index: number]: { length: number; isFinal?: boolean; [index: number]: { transcript: string } }
}

interface Recognition {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  onresult: ((e: { results: RecognitionResultList }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  abort(): void
}

type RecognitionCtor = new () => Recognition

function ctor(): RecognitionCtor | undefined {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}

export function canRecognize(): boolean {
  return typeof window !== 'undefined' && !!ctor()
}

export type ListenError = 'not-allowed' | 'no-speech' | 'unsupported' | 'other'

export interface Listening {
  result: Promise<string[]>
  stop: () => void
}

/**
 * Starts listening; resolves with all recogniser alternatives for one phrase.
 * While the phrase is being said, onHeard gets what is recognised so far, so
 * the learner sees the words appear before the answer is checked.
 */
export function listen(lang = 'en-US', onHeard?: (text: string) => void): Listening {
  const Ctor = ctor()
  if (!Ctor) return { result: Promise.reject<string[]>('unsupported' satisfies ListenError), stop: () => {} }
  const rec = new Ctor()
  rec.lang = lang
  rec.interimResults = !!onHeard
  rec.continuous = false
  rec.maxAlternatives = 5
  const result = new Promise<string[]>((resolve, reject) => {
    let done = false
    rec.onresult = (e) => {
      const first = e.results[0]
      if (!first) return
      // Interim results show progress; the final one (or the only one without interim results) is the answer.
      if (onHeard) onHeard(Array.from({ length: e.results.length }, (_, k) => e.results[k]![0]?.transcript ?? '').join(''))
      if (onHeard && first.isFinal === false) return
      done = true
      const alts: string[] = []
      for (let i = 0; i < first.length; i++) alts.push(first[i]!.transcript)
      resolve(alts)
    }
    rec.onerror = (e) => {
      done = true
      const known: ListenError[] = ['not-allowed', 'no-speech']
      reject(known.includes(e.error as ListenError) ? e.error : 'other')
    }
    rec.onend = () => {
      if (!done) reject('no-speech' satisfies ListenError)
    }
  })
  rec.start()
  return { result, stop: () => rec.abort() }
}
