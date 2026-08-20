import React from 'react'
import ReactDOM from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'

const router = createRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StartClient router={router} />
  </React.StrictMode>,
)