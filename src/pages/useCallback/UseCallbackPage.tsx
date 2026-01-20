import React, { useEffect, useState, useCallback } from 'react';
import './UseCallbackPage.css';

interface Movie {
  id: string;
  title: string;
  releaseYear: string;
}

interface MoviesData {
  movies: Movie[];
}

const useFetch = (initUrl: string) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MoviesData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [url, setUrl] = useState(initUrl);

  const getSth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getSth();
  }, [getSth]);

  return [{ data, isLoading, errorMessage }, setUrl] as const;
};

function UseCallbackPage() {
  const [{ data, isLoading, errorMessage }, doFetch] = useFetch(
    "https://reactnative.dev/movies.json"
  );

  return (
    <div className="use-callback-page">
      <h1>useCallback Example</h1>
      <p>This example demonstrates using `useCallback` to memoize a function passed to a custom hook, preventing unnecessary re-renders of the hook's `useEffect`.</p>
      
      <div className="controls">
        <button onClick={() => doFetch("https://reactnative.dev/movies.json")}>
          Fetch movies
        </button>
      </div>

      <div className="results">
        {errorMessage && <p className="error">Fetch error: {errorMessage}</p>}
        {isLoading && <p>...LOADING...</p>}
        {data?.movies && (
          <div className="movie-info">
            <h3>First Movie:</h3>
            <p><strong>Title:</strong> {data.movies[0].title}</p>
            <p><strong>Release Year:</strong> {data.movies[0].releaseYear}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UseCallbackPage;
