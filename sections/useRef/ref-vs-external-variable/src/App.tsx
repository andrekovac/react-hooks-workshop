import { useState, useEffect, useRef } from 'react'

// Defined a variable outside function component
// This is GLOBAL and shared across ALL component instances
let countCache = 0

function Counter() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)

  // If countCache were here it would be recreated in every render and would be zero all the time
  // let countCache = 0;

  useEffect(() => {
    // Set count value every time after component rendered
    countCache = count
    countRef.current = count
  })

  return (
    <div style={{
      margin: '20px',
      padding: '20px',
      border: '2px solid palevioletred',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <button
        onClick={() => setCount((p) => p + 1)}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          background: '#646cff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        click me
      </button>
      <h3 style={{ margin: '0.5rem 0' }}>External Variable (Global)</h3>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{countCache}</div>
      <h3 style={{ margin: '0.5rem 0' }}>useRef (Instance)</h3>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{countRef.current}</div>
    </div>
  )
}

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>useRef vs External Variable</h1>
      <p style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        Click the buttons in each counter independently. Notice:
      </p>
      <ul style={{ marginBottom: '2rem' }}>
        <li><strong>External Variable (countCache)</strong>: Shared between ALL component instances - clicking one affects the other!</li>
        <li><strong>useRef (countRef)</strong>: Bound to each component instance - each counter has its own independent value</li>
      </ul>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Counter />
        <Counter />
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h3>Key Takeaway:</h3>
        <p>
          <code>useRef</code> is bound to a component <strong>instance</strong> (just like <code>useState</code>).
          External variables are global and shared across all instances.
        </p>
        <p style={{ marginTop: '1rem' }}>
          See <a href="https://stackoverflow.com/questions/57444154/why-need-useref-and-not-mutable-variable" target="_blank" rel="noopener noreferrer">
            this StackOverflow discussion
          </a> for more details.
        </p>
      </div>
    </div>
  )
}

export default App