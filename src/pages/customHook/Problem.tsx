import { useState, useEffect } from "react";

type MovieDataT = {
  id: string;
  title: string;
  releaseYear: string;
};

const useFetch = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MovieDataT[]>();

  const getMovies = async () => {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
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

  return { data, isLoading };
};

const Problem = () => {
  const { data, isLoading } = useFetch();

  return (
    <div className="custom-hook-example">
      <h3>Problem: Non-reusable hook</h3>
      <p>This `useFetch` hook is hardcoded to fetch movies. How can we make it more generic?</p>
      <div className="results">
        <p>{isLoading && "...LOADING..."}</p>
        <div>
          {data?.[0] && (
            <div className="movie-info">
              <p>Title: {data[0].title}</p>
              <p>Release Year: {data[0].releaseYear}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem;
