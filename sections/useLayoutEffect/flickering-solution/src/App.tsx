import { useState, useLayoutEffect, useRef } from 'react'

/**
 * Solution: Using useLayoutEffect to Prevent Flickering
 *
 * This example fixes the flickering problem by using useLayoutEffect instead
 * of useEffect, and properly extracting ref dependencies.
 *
 * THE SOLUTION:
 * useLayoutEffect runs synchronously BEFORE the browser paints. When you
 * click the textarea and trigger a re-render, the dimensions are measured
 * and updated BEFORE you see anything, preventing the flicker.
 *
 * TIMING COMPARISON:
 * useEffect:       Render → Paint → Effect (flicker visible)
 * useLayoutEffect: Render → Effect → Paint (no flicker)
 *
 * DEPENDENCY ARRAY FIX:
 * We extract el.current properties into variables (cH, cW) so ESLint
 * can properly track dependencies. This solves the static analysis issue.
 */

function App() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const el = useRef<HTMLTextAreaElement>(null)

  // Extracted width and height ref values (so that eslint can statically analyze deps array)
  const cH = el?.current?.clientHeight
  const cW = el?.current?.clientWidth

  // ✅ SOLUTIONS:
  // 1. Extracting cH and cW allows proper dependency tracking
  //    - Still requires a re-render trigger (click), but at least eslint is happy
  //    - For automatic updates on resize, you'd need a ResizeObserver (advanced topic)
  // 2. useLayoutEffect runs BEFORE paint (vs useEffect which runs AFTER)
  //    - No flickering: measurements happen before you see anything

  useLayoutEffect(() => {
    if (el.current) {
      setWidth(el.current.clientWidth)
      setHeight(el.current.clientHeight)
    }
  }, [cH, cW])

  return (
    <div>
      <h1>useLayoutEffect Solution</h1>
      <h2>Resize the textarea</h2>
      <hr />
      <p>
        textarea width: <b>{width}px</b>
      </p>
      <p>
        textarea height: <b>{height}px</b>
      </p>
      <textarea
        onClick={() => {
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
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#d1ecf1',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#0c5460'
      }}>
        <h3>✅ No more flickering!</h3>
        <ol>
          <li>Resize the textarea by dragging the corner</li>
          <li><strong>Click inside the textarea</strong> (but don't type anything!)</li>
          <li>Watch the width/height numbers - they update smoothly with no flicker!</li>
          <li>Compare this to the problem example - the difference is subtle but important</li>
        </ol>
        <p><strong>Why it's smooth:</strong> useLayoutEffect runs BEFORE the browser paints, so the dimensions are updated before you see anything.</p>
        <p><strong>Tip:</strong> Open both examples side-by-side to compare the behavior!</p>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h3>What we fixed (partially):</h3>
        <ol>
          <li><strong>Timing fix:</strong> useEffect → useLayoutEffect (fixes flickering!)</li>
          <li><strong>ESLint fix:</strong> Extracted <code>cH</code> and <code>cW</code> variables</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          <strong>Still not perfect:</strong> You still need to click to trigger updates. For automatic updates on resize, you'd need a <code>ResizeObserver</code> API (advanced topic beyond this example).
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>The main lesson:</strong> useLayoutEffect prevents flickering by running before paint, which is crucial for DOM measurements!
        </p>
      </div>
    </div>
  )
}

export default App
