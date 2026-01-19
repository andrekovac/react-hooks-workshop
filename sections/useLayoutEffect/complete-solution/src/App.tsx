import { useState, useLayoutEffect, useRef } from 'react'

/**
 * Complete Solution: ResizeObserver + useLayoutEffect
 *
 * This example shows the COMPLETE solution to both problems:
 * 1. Automatic updates on resize (using ResizeObserver API)
 * 2. No flickering (using useLayoutEffect)
 *
 * KEY TECHNOLOGIES:
 *
 * ResizeObserver API:
 * - Browser API that watches for size changes on DOM elements
 * - Fires a callback whenever the observed element is resized
 * - More efficient than polling or manual resize event listeners
 * - Supported in all modern browsers
 *
 * useLayoutEffect:
 * - Runs synchronously BEFORE browser paint
 * - Prevents visual flickering when updating based on measurements
 * - Perfect for DOM measurement updates
 *
 * HOW IT WORKS:
 * 1. Create ResizeObserver on mount
 * 2. Observe the textarea element
 * 3. When textarea resizes, observer callback fires
 * 4. Update state with new dimensions
 * 5. useLayoutEffect ensures updates happen before paint
 * 6. Cleanup: disconnect observer on unmount
 */

function App() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const el = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    // Get the textarea element
    const element = el.current
    if (!element) return

    // Set initial dimensions
    setWidth(element.clientWidth)
    setHeight(element.clientHeight)

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver((entries) => {
      // This callback fires whenever the observed element resizes
      for (const entry of entries) {
        // entry.contentRect contains the new dimensions
        const { width: newWidth, height: newHeight } = entry.contentRect

        // Update state with new dimensions
        // Since we're in useLayoutEffect, this happens BEFORE paint
        setWidth(Math.round(newWidth))
        setHeight(Math.round(newHeight))
      }
    })

    // Start observing the textarea
    resizeObserver.observe(element)

    // Cleanup: disconnect observer when component unmounts
    return () => {
      resizeObserver.disconnect()
    }
  }, []) // Empty array: only run on mount/unmount

  return (
    <div>
      <h1>Complete Solution 🎉</h1>
      <h2>Resize the textarea - automatic updates!</h2>
      <hr />
      <p>
        textarea width: <b>{width}px</b>
      </p>
      <p>
        textarea height: <b>{height}px</b>
      </p>
      <textarea
        ref={el}
        placeholder="Resize me - no clicking needed!"
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
        background: '#d4edda',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#155724',
        borderLeft: '4px solid #28a745'
      }}>
        <h3>✅ Perfect solution!</h3>
        <ol>
          <li><strong>Just resize</strong> the textarea by dragging the corner</li>
          <li>Watch the numbers update <strong>automatically and smoothly</strong></li>
          <li>No clicking needed!</li>
          <li>No flickering!</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          <strong>This is the proper production-ready approach!</strong>
        </p>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#d1ecf1',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#0c5460'
      }}>
        <h3>How this solution works:</h3>
        <ol>
          <li>
            <strong>ResizeObserver API:</strong> Browser-native way to watch for element size changes
          </li>
          <li>
            <strong>Automatic detection:</strong> Observer fires callback whenever textarea resizes
          </li>
          <li>
            <strong>useLayoutEffect:</strong> Updates happen before paint (no flicker!)
          </li>
          <li>
            <strong>Proper cleanup:</strong> Observer is disconnected on unmount
          </li>
        </ol>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h3>Why ResizeObserver?</h3>
        <ul>
          <li><strong>Efficient:</strong> Only fires when element actually resizes</li>
          <li><strong>Accurate:</strong> Reports exact new dimensions</li>
          <li><strong>Native:</strong> Built into modern browsers (no library needed)</li>
          <li><strong>Better than alternatives:</strong>
            <ul>
              <li>window.resize only fires for window, not individual elements</li>
              <li>MutationObserver watches DOM changes, not size changes</li>
              <li>Polling/setInterval is inefficient and inaccurate</li>
            </ul>
          </li>
        </ul>
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#fff3cd',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#856404'
      }}>
        <h3>Code pattern (simplified):</h3>
        <pre style={{
          background: '#222',
          color: '#0f0',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.85rem'
        }}>
{`useLayoutEffect(() => {
  const element = ref.current
  if (!element) return

  const observer = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect
    setWidth(width)
    setHeight(height)
  })

  observer.observe(element)

  return () => observer.disconnect()
}, [])`}
        </pre>
      </div>
    </div>
  )
}

export default App
