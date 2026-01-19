import { useState } from 'react'
import DataDisplayer from './DataDisplayer'

/**
 * Race Condition Problem
 *
 * This example demonstrates a common race condition bug in React applications.
 *
 * THE PROBLEM:
 * When you rapidly click "Fetch data!" multiple times, you'll notice that sometimes
 * the displayed data doesn't match the requested ID. This happens because:
 *
 * 1. Each click triggers a new API request with a random delay (0-12 seconds)
 * 2. Requests can complete in a different order than they were sent
 * 3. The LAST request to complete updates the state, which might not be the LATEST request
 *
 * HOW TO REPRODUCE:
 * 1. Click "Fetch data!" rapidly 5-10 times
 * 2. Watch the "Requesting ID" change each time
 * 3. Notice when data appears, sometimes the "Displaying Data for" ID (in RED)
 *    doesn't match the "Requesting ID"
 *
 * This is a race condition - the UI shows stale data because an older request
 * completed after a newer one.
 */

function App() {
  const [currentId, setCurrentId] = useState(1)

  const handleClick = () => {
    // Generate a random Star Wars character ID (1-80)
    const idToFetch = Math.round(Math.random() * 80)
    setCurrentId(idToFetch)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Race Condition Problem</h1>

      <div style={{
        padding: '1.5rem',
        background: '#f8d7da',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        color: '#721c24'
      }}>
        <p><strong>⚠️ This example has a bug!</strong></p>
        <p>Click the button rapidly multiple times and watch the IDs.</p>
        <p>Sometimes the displayed data won't match the requested ID.</p>
      </div>

      <div style={{
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        marginBottom: '1rem',
        color: '#333'
      }}>
        <p><strong>Requesting ID:</strong> {currentId}</p>
        <button type="button" onClick={handleClick}>
          Fetch data!
        </button>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <DataDisplayer id={currentId} />
    </div>
  )
}

export default App
