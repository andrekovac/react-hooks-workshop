import { useState } from "react";
import movies from "../components/movies";
import useViews from "../components/useViews";
import MemoizedMovieWithCustomCompare from "../components/MemoizedMovieWithCustomCompare";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  // Handler is recreated on every render - NOT wrapped in useCallback
  const handleToggleWatchlist = (title: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <div>
      {movies.map(({ id, title, year, showtimes }) => (
        <div key={id} className="movie-wrapper">
          {/* Uses custom compare function that ignores onToggleWatchlist */}
          <MemoizedMovieWithCustomCompare
            title={title}
            year={year}
            showtimes={showtimes}
            isInWatchlist={watchlist.has(title)}
            onToggleWatchlist={handleToggleWatchlist}
          />
          <ViewsBasic views={views[id]} />
        </div>
      ))}
    </div>
  );
};

const Solution3CustomCompare = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution 3: Custom Compare Function</h3>
        <p>Instead of using <code>useCallback</code>, we provide a custom comparison function to <code>React.memo</code>.</p>
        <p><strong>How it works:</strong></p>
        <pre className="code-block">{`React.memo(Movie, (prevProps, nextProps) => {
  // Only compare title, year, and isInWatchlist
  // Ignore onToggleWatchlist function reference
  return prevProps.title === nextProps.title
      && prevProps.year === nextProps.year
      && prevProps.isInWatchlist === nextProps.isInWatchlist;
});`}</pre>
        <p>The custom compare function returns <code>true</code> if props are "equal" (component should NOT re-render).</p>
        <p><strong>Trade-off:</strong> You must manually maintain the comparison logic. If you add new props that should trigger re-renders, you need to update the compare function.</p>
        <p><strong>When to use:</strong> When you want fine-grained control over what prop changes trigger re-renders, or when you can't easily memoize callback props.</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Solution3CustomCompare;
