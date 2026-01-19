import { useState } from 'react'

/**
 * One State Change → All States Are New
 *
 * This example demonstrates a subtle but important concept:
 * When React re-renders a component, ALL state variables get new references,
 * even if you only updated one of them!
 *
 * However, the VALUES of unchanged state remain the same.
 * React preserves state values, but the variable bindings are new.
 *
 * KEY INSIGHT:
 * - State VALUES persist across renders
 * - State VARIABLES are recreated each render
 * - Only the updated state has a new VALUE
 * - But ALL states have new REFERENCES in the new render
 */

let obj1Cache: { count: number } | undefined
let obj2Cache: { count: number } | undefined

function App() {
  const [obj1, setObj1] = useState({ count: 0 })
  const [obj2, setObj2] = useState({ count: 0 })

  return (
    <div>
      <h1>useState Updates</h1>

      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        color: '#333',
        fontSize: '1.2rem'
      }}>
        <p>Count 1: <b>{obj1.count}</b></p>
        <p>Count 2: <b>{obj2.count}</b></p>

        <button
          onClick={() => {
            console.log('[1] obj1 did NOT change?', obj1Cache === obj1)
            console.log('[1] obj2 did NOT change?', obj2Cache === obj2)

            setObj1({ count: obj1.count + 1 })
            obj1Cache = obj1
          }}
          style={{ marginRight: '1rem' }}
        >
          Increment count 1
        </button>

        <button
          onClick={() => {
            console.log('[2] obj1 did NOT change?', obj1Cache === obj1)
            console.log('[2] obj2 did NOT change?', obj2Cache === obj2)

            setObj2({ count: obj2.count + 1 })
            obj2Cache = obj2
          }}
        >
          Increment count 2
        </button>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#d1ecf1',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#0c5460'
      }}>
        <h3>What's happening? (Check console)</h3>

        <h4>First click on "Increment count 1":</h4>
        <ul>
          <li>
            <code>obj1Cache === obj1</code> → <code>undefined === obj1</code> → <b>false</b>
            <br />
            (cache is empty initially)
          </li>
          <li>
            <code>obj2Cache === obj2</code> → <code>undefined === obj2</code> → <b>false</b>
            <br />
            (cache is empty initially)
          </li>
          <li>Then we update obj1 and cache its OLD reference</li>
        </ul>

        <h4 style={{ marginTop: '1rem' }}>Second click on "Increment count 1":</h4>
        <ul>
          <li>
            <code>obj1Cache === obj1</code> → <b>false</b>
            <br />
            Cache has OLD obj1, current is NEW obj1 (we called setObj1!)
          </li>
          <li>
            <code>obj2Cache === obj2</code> → <b>false</b> (!!)
            <br />
            Even though we didn't call setObj2, obj2 has a NEW reference!
          </li>
        </ul>

        <h4 style={{ marginTop: '1rem' }}>Click on "Increment count 2":</h4>
        <ul>
          <li>Both comparisons are <b>false</b> again</li>
          <li>ALL state variables get new references on EVERY render</li>
        </ul>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1.5rem',
        background: '#fff3cd',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#856404'
      }}>
        <h3>⚠️ Why This Happens</h3>
        <p>
          When React re-renders your component:
        </p>
        <ol>
          <li>The entire function runs again</li>
          <li>All <code>useState</code> calls execute again</li>
          <li>React returns the CURRENT values for each state</li>
          <li>These are assigned to NEW variables (new references)</li>
          <li>Only the VALUES persist, not the variable references</li>
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
        <h3>Mental model:</h3>
        <pre style={{
          background: '#222',
          color: '#0f0',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.85rem'
        }}>
{`// Render 1
const [obj1, setObj1] = useState({ count: 0 })  // obj1@0x001
const [obj2, setObj2] = useState({ count: 0 })  // obj2@0x002

// User clicks "Increment count 1"
setObj1({ count: 1 })  // Triggers re-render

// Render 2
const [obj1, setObj1] = useState(...)  // obj1@0x003 (NEW!)
const [obj2, setObj2] = useState(...)  // obj2@0x004 (NEW!)
                                       // Even though obj2 VALUE
                                       // is still { count: 0 }`}
        </pre>
        <p style={{ marginTop: '1rem' }}>
          <strong>Key point:</strong> React preserves state VALUES between renders,
          but the VARIABLES holding those values are recreated each time.
        </p>
      </div>
    </div>
  )
}

export default App
