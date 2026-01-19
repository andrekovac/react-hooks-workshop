import { useState, useEffect, useRef } from 'react'

/**
 * Flickering Problem with useEffect
 *
 * This example demonstrates the visual flickering that can occur when using
 * useEffect to update state based on DOM measurements.
 *
 * THE PROBLEM:
 * When you click the textarea (which sets width to undefined), it triggers
 * a re-render. The effect then measures and updates the dimensions, but
 * because useEffect runs AFTER paint, you see a brief flash of the old/wrong
 * dimensions before they update.
 *
 * ORIGINAL ISSUE FROM CODESANDBOX:
 * The dependency array [el.current?.clientHeight, el.current?.clientWidth]
 * has problems:
 * 1. eslint will warn about this pattern
 * 2. ref.current mutations don't trigger re-renders
 * 3. The values are only checked when a re-render happens from elsewhere
 */

function App() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const el = useRef<HTMLTextAreaElement>(null)

  // Hook dependency array: react-hooks/exhaustive-deps rule is complaining!
  // -> Fix the issues until eslint is happy.
  //
  // Follow these two steps:
  // 1. Add all dependencies to the deps array
  // 2. Fix all eslint errors until everything works and you see no eslint warnings anymore

  // ⚠️ DOUBLE PROBLEM with this code:
  // 1. Just resizing the textarea WON'T trigger this effect!
  //    - el.current is the same object, so deps don't change
  //    - You must click to trigger a re-render from elsewhere
  //    - That's why values don't update when you just resize (especially when increasing)
  // 2. Even when it does run (after click), useEffect runs AFTER paint
  //    - This causes flickering: you see undefined/old values briefly

  // update of width and height
  useEffect(() => {
    if (el.current) {
      setWidth(el.current.clientWidth)
      setHeight(el.current.clientHeight)
    }
  }, [el.current?.clientHeight, el.current?.clientWidth])

  return (
    <div>
      <h1>useEffect Flickering</h1>
      <h2>Resize the textarea</h2>
      <hr />
      <p>
        textarea width: <b>{width}px</b>
      </p>
      <p>
        textarea height: <b>{height}px</b>
      </p>
      <textarea
        // NOTE: Doesn't work properly in Safari
        onClick={() => {
          // Trick to cause re-renders 😉
          // Bonus question: Which value could you set to stop re-renderings?
          // @ts-expect-error - intentionally setting undefined to trigger re-render
          setWidth(undefined)
        }}
        ref={el}
        style={{
          width: '300px',
          height: '150px',
          resize: 'both',
          padding: '1rem',
          fontSize: '1rem',
        }}
      />
      <hr />
      <p>Can you observe any unpleasant behavior in the UI?</p>
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#fff3cd',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#856404'
      }}>
        <h3>⚠️ TWO Problems in this example:</h3>

        <h4>Problem 1: Values don't update when resizing</h4>
        <ul>
          <li>Resize the textarea - notice values often DON'T update</li>
          <li>The effect only runs when something ELSE causes a re-render (like clicking)</li>
          <li>This is because <code>el.current</code> is the same object - resizing doesn't change the reference</li>
        </ul>

        <h4>Problem 2: Flickering when values DO update</h4>
        <ol>
          <li>Resize the textarea</li>
          <li><strong>Click inside</strong> (don't type!) - this triggers re-render and effect</li>
          <li>Watch the numbers briefly show "px" (undefined) then update</li>
          <li>This flicker happens because useEffect runs AFTER paint</li>
        </ol>

        <p><strong>Why clicking sets width to undefined:</strong> It's a trick to force a re-render so the effect runs. In the real world, you'd want the effect to run automatically when resizing!</p>
      </div>
    </div>
  )
}

export default App
