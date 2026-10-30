import { Alignment, Fit, Layout, RuntimeLoader, useRive } from '@rive-app/react-canvas'
import wasmUrl from '@rive-app/canvas/rive.wasm?url'
import { useEffect, useState } from 'react'
import type { HeroineId } from './sprites'

// Rive idle animation (breathing, sway, blinking) of a heroine, loaded on
// demand: this module and the Rive engine are a separate chunk. The engine is
// served by the app itself, so it works offline once cached.
RuntimeLoader.setWasmUrl(wasmUrl)

const files = import.meta.glob<string>('../../../assets/rive/*.riv', { eager: true, query: '?url', import: 'default' })
const RIV: Record<string, string> = Object.fromEntries(Object.entries(files).map(([p, url]) => [p.replace(/^.*\//, '').replace(/\.riv$/, ''), url]))

export default function RiveHeroine({ heroine, onReady, onFail }: { heroine: HeroineId; onReady: () => void; onFail: () => void }) {
  const [shown, setShown] = useState(false)
  const { rive, RiveComponent } = useRive({
    src: RIV[heroine],
    artboard: 'Character',
    stateMachines: 'CharacterSM',
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
    onLoad: () => {
      setShown(true)
      onReady()
    },
    onLoadError: onFail,
  })
  useEffect(() => {
    // No drawing while the tab is hidden.
    if (!rive) return
    const update = () => (document.hidden ? rive.stopRendering() : rive.startRendering())
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [rive])
  return <RiveComponent aria-hidden className="rive-canvas" style={{ opacity: shown ? 1 : 0 }} />
}
