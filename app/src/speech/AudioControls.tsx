import { useEffect } from 'react'
import type { Speaker } from '../content/schema'
import { Button } from '../ui/kit'
import type { Delivery } from './delivery'
import { canVoice, pause, play, resume, stop, useVoice } from './voice'

/** Listen / pause / continue / slower, for listening tasks and samples. Stops when the task closes. */
export function AudioControls({ text, speaker, label = '▶ Слушать', delivery }: { text: string; speaker: Speaker; label?: string; delivery?: string }) {
  const state = useVoice(text, speaker)
  useEffect(() => () => stop(), [])
  if (!canVoice()) return <p className="muted">Браузер не умеет воспроизводить звук.</p>
  return (
    <div className="actions-row audio-controls">
      {state === 'idle' && <Button variant="secondary" onClick={() => play(text, speaker, false, { delivery })}>{label}</Button>}
      {state === 'playing' && <Button variant="secondary" onClick={pause}>⏸ Пауза</Button>}
      {state === 'paused' && <Button variant="secondary" onClick={resume}>▶ Продолжить</Button>}
      {state === 'idle' ? (
        <Button variant="secondary" onClick={() => play(text, speaker, true, { delivery })}>
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
export function LineVoice({ text, speaker, ...delivery }: { text: string; speaker: Speaker } & Delivery) {
  const state = useVoice(text, speaker)
  if (!canVoice()) return null
  return (
    <button className="line-voice" aria-label={state === 'playing' ? 'Пауза' : 'Озвучить реплику'} onClick={() => (state === 'playing' ? pause() : state === 'paused' ? resume() : play(text, speaker, false, delivery))}>
      {state === 'playing' ? '⏸' : '🔊'}
    </button>
  )
}
