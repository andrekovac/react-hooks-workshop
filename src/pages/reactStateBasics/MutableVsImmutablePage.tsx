import { useState, useEffect } from 'react'
import './MutableVsImmutablePage.css'

function MutableVsImmutablePage() {
  const [count, setCount] = useState<number>(0)
  const [objectCount, setObjectCount] = useState<{ count: number }>({
    count: 0
  })
  const [objectCountBig, setObjectCountBig] = useState({
    count: 0,
    name: 'Jeff',
    age: 43,
    hobbies: ['tennis', 'collecting stamps', 'reading']
  })

  useEffect(() => {
    console.log('React noticed a changed object and rendered it')
  }, [objectCount])

  useEffect(() => {
    console.log(
      'Trying to listen for changes in objectCount.count',
      objectCount.count
    )
    console.log('------------------------------------------')
  }, [objectCount.count])

  console.log('Re-render (a.k.a. call function component again)')

  return (
    <div className="mutable-vs-immutable-page">
      <h1>Mutable vs Immutable Updates</h1>

      <div className="section-box">
        <h2>State: Primitive data type (number)</h2>
        <p>
          count: <b>{count}</b>
        </p>
        <button onClick={() => setCount(count + 1)}>Increment number</button>
        <p className="note">
          ✅ Primitives (number, string, boolean) are always immutable, so this just works!
        </p>
      </div>

      <hr />

      <div className="section-box">
        <h2>State: Complex data type (object)</h2>
        <p>
          count in Object: <b>{objectCount.count}</b>
        </p>

        <h3 className="error-text">❌ Broken ways of updating state</h3>

        <button
          onClick={() => {
            objectCount.count += 1
            setObjectCount(objectCount)
          }}
          className="button-half"
        >
          Increment value in object (broken)
        </button>

        <button
          onClick={() =>
            setObjectCount((current) => {
              current.count += 1
              return current
            })
          }
          className="button-half"
        >
          Increment object value with updater function (broken)
        </button>

        <p className="note error-text">
          <strong>Why broken?</strong> Both mutate the existing object and pass the same reference to setState.
          React compares references and thinks nothing changed!
        </p>

        <h3 className="success-text">✅ Correct ways of updating state</h3>

        <button
          onClick={() =>
            setObjectCount({
              count: objectCount.count + 1
            })
          }
          className="button-half"
        >
          Increment value in object (works!)
        </button>

        <button
          onClick={() =>
            setObjectCount((current) => ({
              count: current.count + 1
            }))
          }
          className="button-half"
        >
          Increment object value with updater function (works!)
        </button>

        <p className="note success-text">
          <strong>Why it works:</strong> Creates a NEW object with a new reference. React detects the change!
        </p>
      </div>

      <hr />

      <div className="section-box">
        <h2>State with multiple fields</h2>

        <div className="field-display">
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

        <h3>Update single field</h3>

        <button
          onClick={() =>
            setObjectCountBig({
              ...objectCountBig,
              count: objectCountBig.count + 1
            })
          }
        >
          Increment count
        </button>

        <h3>Deep update (nested array)</h3>

        <button
          onClick={() =>
            setObjectCountBig({
              ...objectCountBig,
              hobbies: [...objectCountBig.hobbies, 'dancing']
            })
          }
        >
          Add "dancing" as hobby
        </button>

        <p className="note">
          <strong>Key point:</strong> Spread operator (...) creates shallow copies.
          For nested objects/arrays, you need to copy at each level!
        </p>
      </div>

      <hr />

      <div className="section-box error-section">
        <h3>⚠️ Common Error</h3>

        <button
          onClick={() =>
            setObjectCount((current) => {
              current.count += 1
              // Missing return!
            })
          }
        >
          Increment object value with updater function (error!)
        </button>

        <p className="note">
          <strong>Error:</strong> Updater function must RETURN the new state!
          <br />
          TypeScript will catch this: "Type 'void' is not assignable to type..."
        </p>
      </div>

      <hr />

      <div className="section-box summary">
        <h3>📝 Summary</h3>
        <pre>
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

export default MutableVsImmutablePage