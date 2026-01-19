import { useState, useEffect } from 'react'

/**
 * Solution: Fetch Movies on Mount
 *
 * This example demonstrates:
 * 1. Using useState to manage loading and data states
 * 2. Using useEffect to run side effects after component mount
 * 3. Fetching data from an API
 * 4. Proper dependency array usage (empty array = run once on mount)
 */

type MovieData = {
  id: string
  title: string
  releaseYear: string
}

function App() {
  // State for tracking loading status
  const [isLoading, setLoading] = useState(true)
  // State for storing the fetched movies data
  const [data, setData] = useState<MovieData[]>()

  /**
   * Async function to fetch movies from the API
   * This is defined outside of useEffect so it could be reused if needed
   */
  const getMovies = async () => {
    try {
      // Fetch data from the API
      const response = await fetch('https://reactnative.dev/movies.json')
      const json = await response.json()
      // Store the movies array in state
      setData(json.movies)
    } catch (error) {
      // Log any errors that occur during fetch
      console.error(error)
    } finally {
      // Always set loading to false, whether fetch succeeded or failed
      setLoading(false)
    }
  }

  /**
   * useEffect with empty dependency array []
   * This means the effect runs ONLY ONCE after the initial mount
   * Similar to componentDidMount in class components
   */
  useEffect(() => {
    getMovies()
  }, []) // Empty array = run once on mount

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fetch Movies - Solution</h1>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        color: '#333'
      }}>
        {/* Show loading message while data is being fetched */}
        <p>{isLoading && '...LOADING...'}</p>

        {/* Display the first movie once data is available */}
        {data?.[0] && (
          <div>
            <h2>First Movie:</h2>
            <p><strong>Title:</strong> {data[0].title}</p>
            <p><strong>Release Year:</strong> {data[0].releaseYear}</p>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#d1ecf1',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h3>Key Concepts:</h3>
        <ul>
          <li><strong>useState</strong>: Manages loading state and movie data</li>
          <li><strong>useEffect</strong>: Runs side effect (data fetching) after mount</li>
          <li><strong>Empty dependency array []</strong>: Effect runs only once on mount</li>
          <li><strong>async/await</strong>: Clean way to handle asynchronous operations</li>
          <li><strong>try/catch/finally</strong>: Proper error handling and cleanup</li>
        </ul>
      </div>
    </div>
  )
}

export default App
