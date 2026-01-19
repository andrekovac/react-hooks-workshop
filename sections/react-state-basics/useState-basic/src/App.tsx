import { useState } from 'react'

/**
 * useState Basic Example
 *
 * This example shows how useState solves the problems from the previous example:
 * 1. State persists across re-renders
 * 2. Updating state triggers re-renders
 *
 * COMPARISON:
 * - Internal variable: Resets on every render
 * - External variable: Persists but doesn't trigger re-renders
 * - useState: Persists AND triggers re-renders ✅
 */

// External variable - still here for comparison
let countOutside = 0

function App() {
  // Internal variable - still resets to 0
  let countInside = 0

  console.log('Component rendered')

  // useState - the solution!
  // Returns [currentValue, setterFunction]
  const [countState, setCountState] = useState<number>(0)

  const handleClick = () => {
    countInside++
    countOutside++
    // Updater function: receives previous state, returns new state
    setCountState((prevState) => prevState + 1)
    console.log({ countInside, countOutside })
  }

  return (
    <div>
      <h1>useState Basic</h1>

      <div style={{ marginTop: '2rem', fontSize: '1.5rem' }}>
        <p>
          [inside] You clicked <b>{countInside}</b> times
        </p>
        <p>
          [outside] You clicked <b>{countOutside}</b> times
        </p>
        <p>
          [useState] You clicked <b style={{ color: '#4caf50' }}>{countState}</b> times ✅
        </p>
      </div>

      <button onClick={handleClick} style={{ marginTop: '1rem' }}>
        Click me
      </button>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#d4edda',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#155724',
        borderLeft: '4px solid #28a745'
      }}>
        <h3>✅ useState works!</h3>
        <ul>
          <li>
            <strong>countState</strong> increments correctly!
          </li>
          <li>It persists across re-renders</li>
          <li>Calling <code>setCountState</code> triggers a re-render</li>
          <li>React preserves the state between renders</li>
        </ul>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1.5rem',
        background: '#d1ecf1',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#0c5460'
      }}>
        <h3>How useState works:</h3>
        <ol>
          <li><code>const [value, setValue] = useState(initialValue)</code></li>
          <li><code>value</code>: Current state value</li>
          <li><code>setValue</code>: Function to update the state</li>
          <li>When you call <code>setValue</code>, React:
            <ul>
              <li>Stores the new value</li>
              <li>Triggers a re-render</li>
              <li>Returns the new value on next render</li>
            </ul>
          </li>
        </ol>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1.5rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h3>Updater function pattern:</h3>
        <pre style={{
          background: '#222',
          color: '#0f0',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.85rem'
        }}>
{`// ✅ Good: Updater function
setCount(prevCount => prevCount + 1)

// ⚠️  Also works, but less safe with multiple updates:
setCount(count + 1)`}
        </pre>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Pro tip:</strong> Use the updater function when the new state depends on the previous state. It's safer for batched updates!
        </p>
      </div>
    </div>
  )
}

export default App
