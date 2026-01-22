import useViews from "./components/useViews";
import MemoizedMovie from "./components/MemoizedMovie";
import Views from "./components/Views";
import movies, { MovieT } from "./components/movies";
import { useCallback } from "react";

const MoviesList = () => {
  const views = useViews();

  const handleMovieClick = useCallback((title: MovieT["title"]) => {
    alert(`Wonderful movie: ${title}`);
  }, []);

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          <MemoizedMovie title={title} year={year} onClick={handleMovieClick} />
          <Views views={views[id]} />
        </div>
      ))}
    </div>
  );
};

const Solution2 = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution: `React.memo` and `useCallback`</h3>
        <p>By wrapping the `MemoizedMovie` component in `React.memo`, we prevent it from re-rendering as long as its props don't change.</p>
        <p>We also introduce an `onClick` handler. To ensure this new function prop doesn't break memoization, we wrap it in `useCallback` so its reference remains stable across renders.</p>
        <p>Open the console. You should see the `Movie` components render only once, while the "Views" continue to update.</p>
      </div>
    </div>
  );
};

export default Solution2;
