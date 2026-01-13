import { useState, useEffect, useEffectEvent } from 'react'

/**
 * ADVANCED: Multiple Effect Events, return values, etc.
 */
function Advanced() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)

  // Effect Event for logging
  const logOperation = useEffectEvent((operation: string) => {
    console.log(`${operation}: count=${count}, multiplier=${multiplier}`)
  })

  // Effect Event for calculations
  const calculateResult = useEffectEvent(() => {
    return count * multiplier
  })

  useEffect(() => {
    logOperation('Effect triggered')

    const result = calculateResult()
    console.log('Calculated result:', result)

    // Only Effect Events can be called inside Effects
    // ✅ Correct: called inside Effect
    // ❌ Wrong: calling outside Effect would violate rules

  }, [count]) // Only count triggers re-run, but we read latest multiplier

  return (
    <div className="example">
      <div className="explanation">
        <h2>🚀 Advanced Patterns</h2>
        <ul>
          <li>Multiple Effect Events in one Effect</li>
          <li>Effect Events that return values</li>
          <li>Reading multiple non-reactive values</li>
        </ul>
        <p className="note">
          Watch the console: incrementing count triggers the Effect,
          but incrementing multiplier doesn't. Both values are used
          in the calculation through Effect Events.
        </p>
      </div>

      <div className="controls">
        <button onClick={() => setCount(c => c + 1)}>
          Increment Count (triggers Effect): {count}
        </button>
        <button onClick={() => setMultiplier(m => m + 1)}>
          Increment Multiplier (no Effect): {multiplier}
        </button>
      </div>

      <div className="result">
        <strong>Result:</strong> {count * multiplier}
      </div>
    </div>
  )
}

export default Advanced
