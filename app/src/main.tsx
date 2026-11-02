import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { applyTheme, loadTheme } from './app/theme'
import { startUpdates } from './app/updates'
import { unlockAudioOnFirstTap } from './speech/context'
import '@fontsource-variable/nunito'
import './index.css'

applyTheme(loadTheme())
startUpdates()
unlockAudioOnFirstTap()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
