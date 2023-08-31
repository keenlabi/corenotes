import { RecoilRoot } from 'recoil'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/index.css'

ReactDOM
.createRoot(document.getElementById('root') as HTMLElement)
.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
