import { useState, useEffect } from 'react';

type MovieData = {
  id: string;
  title: string;
  releaseYear: string;
};

function Solution() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MovieData[]>();

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="fetch-movies-example">
      <h3>Solution</h3>

      <div className="info-box success">
        <p>{isLoading && '...LOADING...'}</p>

        {data?.[0] && (
          <div>
            <h2>First Movie:</h2>
            <p><strong>Title:</strong> {data[0].title}</p>
            <p><strong>Release Year:</strong> {data[0].releaseYear}</p>
          </div>
        )}
      </div>

      <div className="key-concepts-box">
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>useState</strong>: Manages loading state and movie data</li>
          <li><strong>useEffect</strong>: Runs side effect (data fetching) after mount</li>
          <li><strong>Empty dependency array []</strong>: Effect runs only once on mount</li>
          <li><strong>async/await</strong>: Clean way to handle asynchronous operations</li>
          <li><strong>try/catch/finally</strong>: Proper error handling and cleanup</li>
        </ul>
      </div>
    </div>
  );
}

export default Solution;
