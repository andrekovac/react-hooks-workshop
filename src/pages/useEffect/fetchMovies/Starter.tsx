import { useEffect } from 'react';

type MovieData = {
  id: string;
  title: string;
  releaseYear: string;
};

function Starter() {
  // TODO: Create loading and data states
  // const [isLoading, setLoading] = useState(???)
  // const [data, setData] = useState<MovieData[]>()

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

  // Suppress unused variable warnings for workshop
  void getMovies;
  void ({} as MovieData);

  return (
    <div className="fetch-movies-example">
      <h3>Starter Code</h3>

      <div className="info-box warning">
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
        <p>Complete the TODOs in the code to fetch and display movies.</p>
      </div>

      <div className="instructions-box">
        <h4>Instructions:</h4>
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

export default Starter;
