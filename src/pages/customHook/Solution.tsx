import { useState, useEffect } from "react";

type MovieDataT = {
  id: string;
  title: string;
  releaseYear: string;
};

type MoviesDataT = {
  movies: MovieDataT[];
};

const useFetch = <DataT extends object>(initUrl: string) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<DataT>();
  const [errorMessage, setErrorMessage] = useState<unknown>();
  const [url, setUrl] = useState(initUrl);

  useEffect(() => {
    const getSth = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    getSth();
  }, [url]);

  return [{ data, isLoading, errorMessage }, setUrl] as const;
};

const Solution = () => {
  const [{ data, isLoading, errorMessage }, doFetch] = useFetch<MoviesDataT>(
    "https://reactnative.dev/movies.json"
  );

  return (
    <div className="custom-hook-example">
        <h3>Solution: Generic `useFetch` hook</h3>
        <p>This version of `useFetch` can fetch any data and allows re-fetching with a new URL.</p>
        <div className="controls">
            <button onClick={() => doFetch("https://reactnative.dev/movies.json")}>
              Fetch movies
            </button>
        </div>
        <div className="results">
            {errorMessage && <p className="error">Fetch error</p>}
            {isLoading && <p>...LOADING...</p>}
            <div>
                {data?.movies && (
                <div className="movie-info">
                    <p>Title: {data.movies[0].title}</p>
                    <p>Release Year: {data.movies[0].releaseYear}</p>
                </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Solution;
