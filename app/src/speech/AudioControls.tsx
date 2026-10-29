import { useEffect } from 'react'
import type { Speaker } from '../content/schema'
import { Button } from '../ui/kit'
import { canVoice, pause, play, resume, stop, useVoice } from './voice'

/** Listen / pause / continue / slower, for listening tasks and samples. Stops when the task closes. */
export function AudioControls({ text, speaker, label = '▶ Слушать' }: { text: string; speaker: Speaker; label?: string }) {
  const state = useVoice(text, speaker)
  useEffect(() => () => stop(), [])
  if (!canVoice()) return <p className="muted">Браузер не умеет воспроизводить звук.</p>
  return (
    <div className="actions-row audio-controls">
      {state === 'idle' && <Button variant="secondary" onClick={() => play(text, speaker)}>{label}</Button>}
      {state === 'playing' && <Button variant="secondary" onClick={pause}>⏸ Пауза</Button>}
      {state === 'paused' && <Button variant="secondary" onClick={resume}>▶ Продолжить</Button>}
      {state === 'idle' ? (
        <Button variant="secondary" onClick={() => play(text, speaker, true)}>
          Медленнее
        </Button>
      ) : (
        <Button variant="secondary" onClick={stop}>
          ⏹ Стоп
        </Button>
      )}
    </div>
  )
}

/** Small speaker button on a dialogue line. */
export function LineVoice({ text, speaker }: { text: string; speaker: Speaker }) {
  const state = useVoice(text, speaker)
  if (!canVoice()) return null
  return (
    <button className="line-voice" aria-label={state === 'playing' ? 'Пауза' : 'Озвучить реплику'} onClick={() => (state === 'playing' ? pause() : state === 'paused' ? resume() : play(text, speaker))}>
      {state === 'playing' ? '⏸' : '🔊'}
    </button>
  )
}
