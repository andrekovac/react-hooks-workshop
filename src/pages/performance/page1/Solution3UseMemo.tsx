import { useMemo } from "react";
import movies from "../components/movies";
import useViews from "../components/useViews";
import MovieBasic from "../components/MovieBasic";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();

  // Memoize the Movie components so they don't re-render when views change
  const memoizedMovies = useMemo(
    () =>
      movies.map(({ id, title, year, showtimes }) => (
        <MovieBasic key={id} title={title} year={year} showtimes={showtimes} />
      )),
    []
  );

  return (
    <div>
      {movies.map(({ id }, index) => (
        <div key={id} className="movie-wrapper">
          {memoizedMovies[index]}
          <ViewsBasic views={views[id]} />
        </div>
      ))}
    </div>
  );
};

const Solution3UseMemo = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution 3: useMemo</h3>
        <p>By wrapping the Movie elements in <code>useMemo</code>, we memoize the rendered JSX elements themselves.</p>
        <p>Since the <code>movies</code> array never changes, the memoized elements are reused across renders.</p>
        <p><strong>Difference from React.memo:</strong></p>
        <ul>
          <li><code>React.memo</code> memoizes a component and its behavior</li>
          <li><code>useMemo</code> memoizes a computed value (in this case, JSX elements)</li>
        </ul>
        <p><strong>When to use which:</strong> <code>React.memo</code> is generally preferred for component memoization. <code>useMemo</code> is useful when you want to memoize specific parts of render output.</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Solution3UseMemo;
