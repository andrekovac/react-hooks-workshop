import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Note: StrictMode is intentionally disabled for this workshop.
// StrictMode double-invokes components, effects, and callbacks to help detect
// impure renders and missing cleanup. While valuable for production apps,
// it makes learning render behavior confusing (e.g., "I changed state once,
// why did it render twice?"). For learning purposes, we disable it so
// console.log output directly reflects actual render cycles.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)