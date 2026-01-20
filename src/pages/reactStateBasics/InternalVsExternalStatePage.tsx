/**
 * Internal vs External State Variables
 *
 * This example demonstrates the difference between:
 * 1. Internal variables (inside component function)
 * 2. External variables (outside component function)
 *
 * And why neither persist across re-renders!
 *
 * KEY CONCEPTS:
 * - Component functions re-execute on every render
 * - Internal variables are recreated each render
 * - External variables persist BUT don't trigger re-renders
 * - This is why we need useState!
 */

// External variable - lives outside the component
// Persists across renders, but changes don't trigger re-renders
let countOutside = 0

import { useState } from 'react'; // Added useState import
import './InternalVsExternalStatePage.css';

function InternalVsExternalStatePage() {
  // Internal variable - recreated on every render
  // Always resets to 0 when component re-renders
  let countInside = 0

  console.log('Component rendered')

  return (
    <div className="internal-vs-external-state-page">
      <h1>Internal vs External State</h1>

      <div className="count-display-section">
        <p>
          [inside] You clicked <b>{countInside}</b> times
        </p>
        <p>
          [outside] You clicked <b>{countOutside}</b> times
        </p>
      </div>

      <button
        onClick={() => {
          countInside++
          countOutside++
          console.log({ countInside, countOutside })
        }}
        className="click-button"
      >
        Click me
      </button>

      <div className="explanation-box warning">
        <h3>⚠️ What's happening?</h3>
        <ul>
          <li>
            <strong>Internal variable (countInside):</strong> Always shows 0!
            <br />
            The function re-executes on each render, resetting <code>countInside = 0</code>
          </li>
          <li>
            <strong>External variable (countOutside):</strong> Also shows 0!
            <br />
            It increments correctly (check console), but changes don't trigger re-renders
          </li>
        </ul>
        <p>
          <strong>Check the console:</strong> You'll see <code>countOutside</code> incrementing,
          but the UI doesn't update because changing it doesn't trigger a re-render!
        </p>
      </div>

      <div className="explanation-box solution">
        <h3>💡 The Solution</h3>
        <p>
          We need a variable that:
        </p>
        <ol>
          <li>Persists across re-renders (like external variable)</li>
          <li>Triggers re-renders when changed (unlike external variable)</li>
        </ol>
        <p>
          <strong>This is exactly what <code>useState</code> does!</strong>
          <br />
          See the next example: useState-basic
        </p>
      </div>
    </div>
  )
}

export default InternalVsExternalStatePage;
