import { useState, useEffect } from 'react'

/**
 * setState Creates New Objects
 *
 * This example demonstrates an important concept:
 * When you call setState with a new object, React creates a NEW object
 * (even if it has the same values). The old and new objects have
 * different references in memory.
 *
 * KEY CONCEPT:
 * Object.is(oldObj, newObj) checks if two values are the same reference.
 * Every setState call with a new object literal creates a NEW reference.
 */

// External store to remember previous object
let store: { value: boolean } | undefined = undefined

function App() {
  const [obj, setObj] = useState({ value: true })

  useEffect(() => {
    console.log('setObj creates new object. Same?:', Object.is(store, obj))
    // Make shallow copy to store
    store = obj
    console.log('objects are the same now. Same?:', Object.is(store, obj))
  }, [obj])

  return (
    <div>
      <h1>setState Creates New Objects</h1>

      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        color: '#333'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>
          Value: <b>{obj.value.toString()}</b>
        </h2>

        <button onClick={() => setObj({ value: !obj.value })}>
          Flip obj
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
        <ol>
          <li>
            <strong>First log:</strong> Compares previous object (in store) with current object
            <br />
            Result: <code>false</code> - They're different references!
          </li>
          <li style={{ marginTop: '0.5rem' }}>
            <strong>Assignment:</strong> <code>store = obj</code> makes them point to same object
          </li>
          <li style={{ marginTop: '0.5rem' }}>
            <strong>Second log:</strong> Now they're the same reference
            <br />
            Result: <code>true</code>
          </li>
          <li style={{ marginTop: '0.5rem' }>
            <strong>On next click:</strong> <code>setObj({"{ value: !obj.value }"})</code> creates NEW object
            <br />
            First log shows <code>false</code> again!
          </li>
        </ol>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1.5rem',
        background: '#fff3cd',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#856404'
      }}>
        <h3>⚠️ Important Points</h3>
        <ul>
          <li>
            <code>setObj({"{ value: !obj.value }"})</code> creates a NEW object every time
          </li>
          <li>
            Even if the value is the same, the object reference is different
          </li>
          <li>
            This is why React can detect state changes - it compares references!
          </li>
          <li>
            <code>Object.is(a, b)</code> is similar to <code>a === b</code> for objects
          </li>
        </ul>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1.5rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h3>Visual representation:</h3>
        <pre style={{
          background: '#222',
          color: '#0f0',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.85rem'
        }}>
{`// Click 1
setObj({ value: false })  // Creates object at memory address 0x001
store = obj               // store now points to 0x001
Object.is(store, obj)     // true (same address)

// Click 2
setObj({ value: true })   // Creates NEW object at 0x002
Object.is(store, obj)     // false (0x001 !== 0x002)
store = obj               // store now points to 0x002
Object.is(store, obj)     // true again`}
        </pre>
      </div>
    </div>
  )
}

export default App
