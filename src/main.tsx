import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#13131a',
            color: '#fafafa',
            border: '1px solid #1a1a2e',
            fontSize: '14px',
          },
        }}
      />
      <div className="noise-overlay" />
    </BrowserRouter>
  </StrictMode>,
)
