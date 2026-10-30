import { Alignment, Fit, Layout, RuntimeLoader, useRive } from '@rive-app/react-canvas'
import wasmUrl from '@rive-app/canvas/rive.wasm?url'
import { useEffect, useState } from 'react'
import { mouthLevel } from '../speech/mouth'
import type { HeroineId } from './sprites'

// A Rive heroine (docs/22-rive-brief.md), loaded on demand: this module and the
// Rive engine are a separate chunk. The engine is served by the app itself, so
// it works offline once cached. The app drives her only through the artboard's
// own CharacterVM: expression, mouth (0…1 by voice loudness), talking and
// motionEnabled (breathing and blinking; off with "reduce motion").
RuntimeLoader.setWasmUrl(wasmUrl)

const files = import.meta.glob<string>('../../../assets/rive/*.riv', { query: '?url', import: 'default' })
const RIV: Record<string, () => Promise<string>> = Object.fromEntries(Object.entries(files).map(([p, load]) => [p.replace(/^.*\//, '').replace(/\.riv$/, ''), load]))

/** Mount with key={`${heroine}:${pose}`}: an artboard is chosen once, on load. */
export default function RiveHeroine(props: { heroine: HeroineId; pose: string; expression: string; talking: boolean; motion: boolean; onReady: () => void; onFail: () => void }) {
  const [src, setSrc] = useState<string>()
  useEffect(() => {
    let live = true
    const load = RIV[props.heroine]
    if (!load) return props.onFail()
    load().then((url) => live && setSrc(url), props.onFail)
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.heroine])
  return src ? <Figure src={src} {...props} /> : null
}

function Figure({ src, heroine, pose, expression, talking, motion, onReady, onFail }: { src: string; heroine: HeroineId; pose: string; expression: string; talking: boolean; motion: boolean; onReady: () => void; onFail: () => void }) {
  const [shown, setShown] = useState(false)
  const { rive, RiveComponent } = useRive({
    src,
    artboard: pose,
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
  // The view model of the chosen artboard: one file has a CharacterVM per pose, with different faces.
  const vm = rive?.viewModelInstance
  useEffect(() => {
    if (!vm) return
    const e = vm.enum('expression')
    if (e) e.value = expression
  }, [vm, expression])
  useEffect(() => {
    const m = vm?.boolean('motionEnabled')
    if (m) m.value = motion
  }, [vm, motion])
  useEffect(() => {
    if (!vm) return
    const t = vm.boolean('talking')
    const mouth = vm.number('mouth')
    if (t) t.value = talking
    if (!mouth) return
    if (!talking) {
      mouth.value = 0
      return
    }
    // The mouth follows the voice every frame (speech/mouth.ts), no React re-render.
    let frame = requestAnimationFrame(function tick() {
      mouth.value = mouthLevel(heroine)
      frame = requestAnimationFrame(tick)
    })
    return () => {
      cancelAnimationFrame(frame)
      mouth.value = 0
    }
  }, [vm, talking, heroine])
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
