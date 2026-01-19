import { useState, useEffect } from 'react'

/**
 * Mutable vs Immutable State Updates
 *
 * This example demonstrates a CRITICAL concept in React:
 * You must create NEW objects/arrays to trigger re-renders!
 *
 * React uses reference equality (===) to detect changes.
 * Mutating an existing object doesn't change its reference,
 * so React won't detect the change or re-render.
 *
 * KEY RULES:
 * 1. ❌ DON'T mutate state objects directly
 * 2. ✅ DO create new objects with updated values
 * 3. Use spread operator (...) to copy objects/arrays
 * 4. For nested updates, copy at each level
 */

function App() {
  // Primitive type (number) - simple
  const [count, setCount] = useState<number>(0)

  // Object type - needs careful handling!
  const [objectCount, setObjectCount] = useState<{ count: number }>({
    count: 0
  })

  // Complex object with multiple fields
  const [objectCountBig, setObjectCountBig] = useState({
    count: 0,
    name: 'Jeff',
    age: 43,
    hobbies: ['tennis', 'collecting stamps', 'reading']
  })

  // Effect watches for objectCount changes
  useEffect(() => {
    console.log('React noticed a changed object and rendered it')
  }, [objectCount])

  // Effect tries to watch objectCount.count
  useEffect(() => {
    console.log(
      'Trying to listen for changes in objectCount.count',
      objectCount.count
    )
    console.log('------------------------------------------')
  }, [objectCount.count])

  console.log('Re-render (a.k.a. call function component again)')

  return (
    <div>
      <h1>Mutable vs Immutable Updates</h1>

      {/* SECTION 1: Primitive Types */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h2>State: Primitive data type (number)</h2>
        <p>
          count: <b>{count}</b>
        </p>
        <button onClick={() => setCount(count + 1)}>Increment number</button>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          ✅ Primitives (number, string, boolean) are always immutable, so this just works!
        </p>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      {/* SECTION 2: Object Types - Broken and Fixed Ways */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h2>State: Complex data type (object)</h2>
        <p>
          count in Object: <b>{objectCount.count}</b>
        </p>

        <h3 style={{ marginTop: '1.5rem', color: '#d32f2f' }}>❌ Broken ways of updating state</h3>

        <button
          onClick={() => {
            objectCount.count += 1
            // ❌ Same reference! React won't re-render
            setObjectCount(objectCount)
          }}
          style={{ marginBottom: '0.5rem' }}
        >
          Increment value in object (broken)
        </button>

        <br />

        <button
          onClick={() =>
            setObjectCount((current) => {
              // ❌ Mutating and returning same reference
              current.count += 1
              return current
            })
          }
          style={{ marginBottom: '0.5rem' }}
        >
          Increment object value with updater function (broken)
        </button>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#d32f2f' }}>
          <strong>Why broken?</strong> Both mutate the existing object and pass the same reference to setState.
          React compares references and thinks nothing changed!
        </p>

        <h3 style={{ marginTop: '1.5rem', color: '#2e7d32' }}>✅ Correct ways of updating state</h3>

        <button
          onClick={() =>
            // ✅ New object (new reference)!
            setObjectCount({
              count: objectCount.count + 1
            })
          }
          style={{ marginBottom: '0.5rem' }}
        >
          Increment value in object (works!)
        </button>

        <br />

        <button
          onClick={() =>
            // ✅ Updater function returns new reference
            setObjectCount((current) => ({
              count: current.count + 1
            }))
          }
        >
          Increment object value with updater function (works!)
        </button>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#2e7d32' }}>
          <strong>Why it works:</strong> Creates a NEW object with a new reference. React detects the change!
        </p>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      {/* SECTION 3: Complex Object with Multiple Fields */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h2>State with multiple fields</h2>

        <div style={{ marginBottom: '1rem' }}>
          <div>count: <b>{objectCountBig.count}</b></div>
          <div>name: <b>{objectCountBig.name}</b></div>
          <div>age: <b>{objectCountBig.age}</b></div>
          <div>
            hobbies:{' '}
            <b>
              {objectCountBig.hobbies.map((hobby, i) => (
                <span key={i}>{hobby} | </span>
              ))}
            </b>
          </div>
        </div>

        <h3 style={{ marginTop: '1.5rem' }}>Update single field</h3>

        <button
          onClick={() =>
            setObjectCountBig({
              // ✅ Spread operator copies all properties
              ...objectCountBig,
              // Then overwrite the one we want to change
              count: objectCountBig.count + 1
            })
          }
        >
          Increment count
        </button>

        <h3 style={{ marginTop: '1.5rem' }}>Deep update (nested array)</h3>

        <button
          onClick={() =>
            setObjectCountBig({
              ...objectCountBig,
              // ✅ Create new array (don't mutate existing!)
              hobbies: [...objectCountBig.hobbies, 'dancing']
            })
          }
        >
          Add "dancing" as hobby
        </button>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <strong>Key point:</strong> Spread operator (...) creates shallow copies.
          For nested objects/arrays, you need to copy at each level!
        </p>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      {/* SECTION 4: Common Error */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#ffe5e5',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#d32f2f',
        borderLeft: '4px solid #d32f2f'
      }}>
        <h3>⚠️ Common Error</h3>

        <button
          onClick={() =>
            // ❌ Returns undefined! Function with no return statement
            setObjectCount((current) => {
              current.count += 1
              // Missing return!
            })
          }
        >
          Increment object value with updater function (error!)
        </button>

        <p style={{ marginTop: '1rem' }}>
          <strong>Error:</strong> Updater function must RETURN the new state!
          <br />
          TypeScript will catch this: "Type 'void' is not assignable to type..."
        </p>
      </div>

      {/* SECTION 5: Summary */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#d1ecf1',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#0c5460'
      }}>
        <h3>📝 Summary</h3>
        <pre style={{
          background: '#222',
          color: '#0f0',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.85rem'
        }}>
{`// ❌ DON'T mutate
obj.count++
setObj(obj)

// ✅ DO create new objects
setObj({ ...obj, count: obj.count + 1 })

// ❌ DON'T mutate arrays
arr.push(newItem)
setArr(arr)

// ✅ DO create new arrays
setArr([...arr, newItem])`}
        </pre>
      </div>
    </div>
  )
}

export default App