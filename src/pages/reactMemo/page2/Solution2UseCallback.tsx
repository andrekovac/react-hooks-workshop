import { useCallback } from "react";
import movies, { MovieT } from "../components/movies";
import useViews from "../components/useViews";
import MemoizedMovie from "../components/MemoizedMovie";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();

  // Wrap the handler in useCallback to maintain a stable reference
  const handleMovieClick = useCallback((title: MovieT["title"]) => {
    alert(`Wonderful movie: ${title}`);
  }, []); // Empty deps: handler doesn't depend on any external values

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          <MemoizedMovie title={title} year={year} onClick={handleMovieClick} />
          <ViewsBasic views={views[id]} />
        </div>
      ))}
    </div>
  );
};

const Solution2UseCallback = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution 2: useCallback</h3>
        <p>By wrapping <code>handleMovieClick</code> in <code>useCallback</code>, we ensure the function reference stays the same across renders.</p>
        <p><strong>How it works:</strong></p>
        <ul>
          <li><code>useCallback</code> memoizes the function itself</li>
          <li>With an empty dependency array <code>[]</code>, the same function instance is reused</li>
          <li><code>React.memo</code> sees the same <code>onClick</code> reference and skips re-render</li>
        </ul>
        <p><strong>When to use:</strong> Use <code>useCallback</code> when passing callbacks to memoized child components.</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Solution2UseCallback;
