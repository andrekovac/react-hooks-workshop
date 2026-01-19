import { useCallback, useEffect, useState } from 'react'

type StarWarsCharacter = {
  name: string
  height: string
  mass: string
  birth_year: string
}

type Props = {
  id: number
}

/**
 * DataDisplayer Component - Race Condition Solution
 *
 * SOLUTION: This component uses the cleanup function in useEffect to prevent
 * race conditions when fetching data.
 *
 * KEY CONCEPTS:
 *
 * 1. CLOSURE: Each effect creates a new closure with its own `active` variable
 * 2. CLEANUP FUNCTION: When a new effect runs, the previous effect's cleanup
 *    function runs first, setting its `active` to false
 * 3. ACTIVE FLAG: Only update state if `active` is still true
 *
 * EFFECT LIFECYCLE:
 * - Effect runs → `active = true` in this closure
 * - Prop changes → cleanup runs → `active = false` in OLD closure
 * - New effect runs → `active = true` in NEW closure
 * - Old request completes → checks `active` → false → doesn't update state ✅
 * - New request completes → checks `active` → true → updates state ✅
 */
function DataDisplayer({ id }: Props) {
  const [data, setData] = useState<StarWarsCharacter | null>(null)
  const [fetchedId, setFetchedId] = useState<number | null>(null)

  // Helper state to visualize race conditions
  const [numReqs, setNumReqs] = useState(0)
  const increase = useCallback(() => setNumReqs((c) => c + 1), [])
  const decrease = useCallback(() => setNumReqs((c) => c - 1), [])

  useEffect(() => {
    // This `active` variable is specific to THIS effect closure
    let active = true

    console.log(`[(${id}) ENTERING] useEffect closure with id ${id}`)

    const fetchData = async () => {
      console.log(`[(${id}) INITIATE] data fetch`)
      increase()

      // Simulate variable network delay (0-12 seconds)
      setTimeout(async () => {
        try {
          const response = await fetch(`https://swapi.dev/api/people/${id}/`)
          const newData = await response.json()

          console.log(`[(${id}) INCOMING] async data fetch`, { active })
          decrease()

          // SOLUTION: Only update state if this effect is still active
          if (active) {
            setFetchedId(id)
            setData(newData)
          } else {
            console.log(`[(${id}) IGNORED] Stale data - effect was cleaned up`)
          }
        } catch (error) {
          decrease()
          console.error(`[(${id}) ERROR]`, error)
        }
      }, Math.round(Math.random() * 12000))
    }

    fetchData()

    // CLEANUP FUNCTION: This runs when the component unmounts
    // OR when the id prop changes (before the next effect runs)
    return () => {
      active = false
      console.log(`[(${id}) CLEANING up] closure with id ${id}`)
    }
  }, [id, increase, decrease])

  console.log('>>>>>>>>>>> NEW RENDER >>>>>>>>>>')

  // Color coding: Should always be green now!
  const isCorrectData = fetchedId === id
  const textColor = isCorrectData ? 'green' : 'red'

  return (
    <div style={{
      padding: '1.5rem',
      background: '#f0f0f0',
      borderRadius: '8px',
      color: '#333'
    }}>
      <p><strong>Number of requests in flight:</strong> {numReqs} (may take up to 12 seconds)</p>
      <hr style={{ margin: '1rem 0' }} />

      {data ? (
        <>
          <p style={{ color: textColor, fontSize: '1.2rem', fontWeight: 'bold' }}>
            Displaying Data for: {fetchedId}
            {isCorrectData && ' ✅'}
          </p>
          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Height:</strong> {data.height}</p>
            <p><strong>Mass:</strong> {data.mass}</p>
            <p><strong>Birth Year:</strong> {data.birth_year}</p>
          </div>
        </>
      ) : (
        <p>Loading initial data...</p>
      )}

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#d1ecf1',
        borderRadius: '8px',
        textAlign: 'left'
      }}>
        <h4>How the solution works:</h4>
        <ol style={{ marginTop: '0.5rem' }}>
          <li>Each effect creates a closure with <code>active = true</code></li>
          <li>When id changes, cleanup runs: <code>active = false</code> (old closure)</li>
          <li>New effect runs with <code>active = true</code> (new closure)</li>
          <li>Stale requests check <code>active</code> and don't update state</li>
          <li>Only the latest request updates state ✅</li>
        </ol>
      </div>
    </div>
  )
}

export default DataDisplayer
