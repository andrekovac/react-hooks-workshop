import { useState, useRef } from 'react'

let refCache: React.MutableRefObject<number> | null = null
let objCache: (
  | { a: number }
  | null
) = null
let functionCache: (() => null) | null = null

function Counter() {
  // React re-creates value and setValue on every render
  const [value, setValue] = useState({ a: 1 })
  // valueRef remains the exact same object throughout the life-time of the component (can't be re-assigned)
  const valueRef = useRef(0)

  // These two will be recreated on each render!
  const handler = () => null
  const alwaysZero = 0

  // Different on every render: If it were the same, component would not re-render
  console.log(
    "object.is useState value: " + value.a,
    Object.is(value, objCache)
  )
  // Different on first render - then always the same -> property of useRef hook.
  console_log(
    "object.is useRef current value: " + valueRef.current,
    Object.is(valueRef, refCache)
  )
  // Always different -> handler is recreated on every render
  console_log("object.is handler function", Object.is(handler, functionCache))

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>useRef: Ref vs State vs Local Variable</h1>
      <p style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
        Open the console to see Object.is() comparisons on each render
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Count value in object: {value.a}</h2>
        <h2>Count value in ref: {valueRef.current}</h2>
        <h2>
          Count value stored outside of component:{" "}
          {objCache ? objCache.a : "null"}
        </h2>

        <button
          onClick={() => {
            setValue((v) => {
              // return new value object -> triggers re-render
              return { a: v.a + 1 }

              // Note: Don't call it like so (it would not trigger a re-render):
              // v.a += 1; return v
            })
            valueRef.current += 1

            // Store values in variable in outer scope
            refCache = valueRef
            objCache = value
            functionCache = handler
          }}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Increment
        </button>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h3>Key Observations:</h3>
        <ul>
          <li><strong>useState object</strong>: Always different on each render (triggers re-render)</li>
          <li><strong>useRef object</strong>: Same object reference across all renders (stable)</li>
          <li><strong>Function</strong>: Recreated on every render (different reference)</li>
          <li><strong>Local variable</strong>: Always recreated (alwaysZero = 0)</li>
        </ul>
      </div>
    </div>
  )
}

export default Counter
