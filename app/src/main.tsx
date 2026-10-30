import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { startUpdates } from './app/updates'
import { unlockAudioOnFirstTap } from './speech/context'
import './index.css'

startUpdates()
unlockAudioOnFirstTap()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
