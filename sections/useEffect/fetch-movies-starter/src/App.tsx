import { useEffect } from 'react'

/**
 * Starter Code: Fetch Movies on Mount
 *
 * Task: Complete the implementation to fetch movies from the API on component mount
 * and display the title and release year of the first movie.
 *
 * API endpoint: https://reactnative.dev/movies.json
 *
 * Steps:
 * 1. Create loading and data state variables
 * 2. Implement the getMovies function to fetch data from the API
 * 3. Store the movies array in local state
 * 4. Handle errors appropriately
 * 5. Set up the useEffect hook to run on mount
 * 6. Display the loading state and movie data
 */

type MovieData = {
  id: string
  title: string
  releaseYear: string
}

function App() {
  // TODO: Create loading and data states
  // const [isLoading, setLoading] = useState(???)
  // const [data, setData] = useState<???>()

  const getMovies = async () => {
    try {
      // TODO: fetch movies from https://reactnative.dev/movies.json
      // TODO: store movies array in local state
    } catch (error) {
      // TODO: handle error
      console.error(error)
    } finally {
      // TODO: Adjust loading state
    }
  }

  // TODO: Run effect after mount
  useEffect(() => {
    // What should happen here?
  }, [
    // TODO: What values should be in the dependency array?
  ])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fetch Movies - Starter Code</h1>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        color: '#333'
      }}>
        {/* TODO: Display loading state */}
        {/* <p>{isLoading && "...LOADING..."}</p> */}

        {/* TODO: Display movie data */}
        {/* {data?.[0] && (
          <div>
            <h2>First Movie:</h2>
            <p><strong>Title:</strong> {data[0].title}</p>
            <p><strong>Release Year:</strong> {data[0].releaseYear}</p>
          </div>
        )} */}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#fff3cd',
        borderRadius: '8px',
        textAlign: 'left',
        color: '#333'
      }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Create state for loading (boolean) and data (array of movies)</li>
          <li>Complete the <code>getMovies</code> function to fetch from the API</li>
          <li>Call <code>getMovies</code> inside the useEffect hook</li>
          <li>Make sure the effect runs only once on mount (check dependency array!)</li>
          <li>Uncomment the JSX to display loading state and movie data</li>
        </ol>
      </div>
    </div>
  )
}

export default App
