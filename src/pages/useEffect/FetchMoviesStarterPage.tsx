import { useEffect } from 'react';
import './FetchMoviesStarterPage.css';

type MovieData = {
  id: string;
  title: string;
  releaseYear: string;
};

function FetchMoviesStarterPage() {
  // TODO: Create loading and data states
  // const [isLoading, setLoading] = useState(???)
  // const [data, setData] = useState<???>()

  const getMovies = async () => {
    try {
      // TODO: fetch movies from https://reactnative.dev/movies.json
      // TODO: store movies array in local state
    } catch (error) {
      // TODO: handle error
      console.error(error);
    } finally {
      // TODO: Adjust loading state
    }
  };

  // TODO: Run effect after mount
  useEffect(() => {
    // What should happen here?
  }, [
    // TODO: What values should be in the dependency array?
  ]);

  return (
    <div className="fetch-movies-starter-page">
      <h1>Fetch Movies - Starter Code</h1>

      <div className="info-box">
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

      <div className="instructions-box">
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
  );
}

export default FetchMoviesStarterPage;
