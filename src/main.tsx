import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { config } from './config'
import './index.css'

if (import.meta.env.DEV) {
  import('./config/validate.ts').then(({ validateConfig }) => validateConfig(config))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
