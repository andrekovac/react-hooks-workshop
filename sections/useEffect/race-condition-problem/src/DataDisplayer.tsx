import { useEffect, useState } from 'react'

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
 * DataDisplayer Component - Demonstrates Race Condition Bug
 *
 * BUG: This component doesn't handle race conditions properly.
 * When the id prop changes rapidly, multiple fetch requests are initiated.
 * Whichever request completes LAST will update the state, even if it's
 * not the LATEST id that was requested.
 *
 * The text color indicates the problem:
 * - GREEN: The displayed data matches the current id prop (correct!)
 * - RED: The displayed data is from a different id (race condition bug!)
 */
function DataDisplayer({ id }: Props) {
  const [data, setData] = useState<StarWarsCharacter | null>(null)
  const [fetchedId, setFetchedId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      // Simulate variable network delay (0-12 seconds)
      // This makes race conditions more obvious
      setTimeout(async () => {
        try {
          const response = await fetch(`https://swapi.dev/api/people/${id}/`)
          const newData = await response.json()

          // BUG: We always update state, even if this is stale data
          // from an old request that just happened to complete late
          setFetchedId(id)
          setData(newData)
        } catch (error) {
          console.error('Fetch error:', error)
        }
      }, Math.round(Math.random() * 12000))
    }

    fetchData()

    // BUG: No cleanup function!
    // We should cancel or ignore stale requests
  }, [id])

  if (!data) {
    return (
      <div style={{
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        color: '#333'
      }}>
        <p>Loading... (may take up to 12 seconds)</p>
      </div>
    )
  }

  // Color coding to highlight the race condition:
  // Green = correct data, Red = stale data
  const isCorrectData = fetchedId === id
  const textColor = isCorrectData ? 'green' : 'red'

  return (
    <div style={{
      padding: '1.5rem',
      background: '#f0f0f0',
      borderRadius: '8px',
      color: '#333'
    }}>
      <p style={{ color: textColor, fontSize: '1.2rem', fontWeight: 'bold' }}>
        Displaying Data for: {fetchedId}
        {!isCorrectData && ' ⚠️ RACE CONDITION!'}
      </p>
      <div style={{ textAlign: 'left', marginTop: '1rem' }}>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Height:</strong> {data.height}</p>
        <p><strong>Mass:</strong> {data.mass}</p>
        <p><strong>Birth Year:</strong> {data.birth_year}</p>
      </div>
    </div>
  )
}

export default DataDisplayer
