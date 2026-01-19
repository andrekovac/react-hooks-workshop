import { useState } from 'react'
import DataDisplayer from './DataDisplayer'

/**
 * Race Condition Solution
 *
 * This example shows how to properly handle race conditions using
 * the cleanup function in useEffect.
 *
 * THE SOLUTION:
 * The DataDisplayer component now uses a cleanup function that sets
 * a flag (`active = false`) when the effect is cleaned up. This prevents
 * stale data from updating the state.
 *
 * HOW IT WORKS:
 * 1. Each time the id prop changes, a new effect runs
 * 2. The new effect creates a new closure with `active = true`
 * 3. The cleanup function from the PREVIOUS effect runs, setting its `active` to false
 * 4. When old requests complete, they check the `active` flag
 * 5. Only the LATEST request (with `active = true`) updates the state
 *
 * TRY IT:
 * Click "Fetch data!" rapidly multiple times. Notice that:
 * - Multiple requests are initiated (shown in "Number of requests in flight")
 * - But only the LATEST request updates the displayed data
 * - The displayed data always shows in GREEN (correct!)
 * - Open the console to see detailed logging of the effect lifecycle
 */

function App() {
  const [currentId, setCurrentId] = useState<number | null>(null)

  const handleClick = () => {
    // Generate a random Star Wars character ID (1-80)
    const idToFetch = Math.round(Math.random() * 80)
    setCurrentId(idToFetch)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Race Condition Solution</h1>

      <div style={{
        padding: '1.5rem',
        background: '#d4edda',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        color: '#155724'
      }}>
        <p><strong>✅ This example handles race conditions correctly!</strong></p>
        <p>Click the button rapidly multiple times. The data will always match the latest request.</p>
        <p>Open the console to see effect lifecycle logs.</p>
      </div>

      <div style={{
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        marginBottom: '1rem',
        color: '#333'
      }}>
        {currentId ? <p><strong>Latest requested ID:</strong> {currentId}</p> : null}
        <button type="button" onClick={handleClick}>
          Fetch data!
        </button>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      {currentId ? <DataDisplayer id={currentId} /> : null}
    </div>
  )
}

export default App
