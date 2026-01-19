import { useState, useRef } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  // `buttonRef` references the DOM node of the button element
  const buttonRef = useRef<HTMLButtonElement>(null)
  // `countRef` tracks a value across re-renders
  const countRef = useRef(0)

  const handleAlertClick = () => {
    setTimeout(() => {
      // TODO: Which count value is displayed in the Alert? What could you change?
      alert('You clicked on: ' + count)
    }, 3000)
  }

  const handleAlertClickWithRef = () => {
    setTimeout(() => {
      // Using ref: Always shows the LATEST value
      alert('You clicked on (with ref): ' + countRef.current)
    }, 3000)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Introducing refs</h2>
      <hr />

      <div style={{ background: '#f0f0f0', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>The Stale Closure Problem</h3>
        <p>
          When you click "Show alert", a timeout starts. The <code>count</code> value
          inside that timeout is "frozen" (it closes over the value at that moment).
        </p>
        <p>
          If you increment the counter before the alert shows, the alert will still
          show the <strong>old</strong> value because of closure!
        </p>
      </div>

      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        You clicked {count} times
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          ref={buttonRef}
          onClick={() => {
            setCount((c) => c + 1)
            countRef.current = count + 1
          }}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Increase value
        </button>

        <button
          onClick={handleAlertClick}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Show alert (with stale state)
        </button>

        <button
          onClick={handleAlertClickWithRef}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Show alert (with ref - latest value)
        </button>
      </div>

      <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3>Try this:</h3>
        <ol>
          <li>Click "Show alert (with stale state)"</li>
          <li>Quickly click "Increase value" several times (before 3 seconds)</li>
          <li>Wait for the alert - it shows the OLD value! ⚠️</li>
        </ol>
      </div>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '8px' }}>
        <h3>Now try with ref:</h3>
        <ol>
          <li>Click "Show alert (with ref - latest value)"</li>
          <li>Quickly click "Increase value" several times</li>
          <li>Wait for the alert - it shows the LATEST value! ✅</li>
        </ol>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h3>Key Insight:</h3>
        <p>
          <strong>State closes over:</strong> The <code>count</code> value is frozen at the time
          the timeout is created (closure behavior).
        </p>
        <p>
          <strong>Ref always current:</strong> The <code>countRef.current</code> value is always
          the latest because ref is a mutable object that persists across renders.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Note for React 19.2+:</strong> In Effects, you can now use <code>useEffectEvent</code>
          instead of the ref pattern for cleaner code. See the <a href="../README.md">useRef README</a> for details.
        </p>
      </div>
    </div>
  )
}

export default App
