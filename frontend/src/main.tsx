import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StoresContext, stores } from './stores'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoresContext.Provider value={stores}>
    <App />
      </StoresContext.Provider>
  </StrictMode>,
)
