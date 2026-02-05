import { useState, useCallback } from "react";
import movies from "../components/movies";
import useViews from "../components/useViews";
import MemoizedMovie from "../components/MemoizedMovie";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  // Wrap the handler in useCallback to maintain a stable reference
  const handleToggleWatchlist = useCallback((title: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }, []); // Empty deps: handler uses functional update, no external dependencies

  return (
    <div>
      {movies.map(({ id, title, year, showtimes }) => (
        <div key={id} className="movie-wrapper">
          <MemoizedMovie
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

const Solution2UseCallback = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution 2: useCallback</h3>
        <p>By wrapping <code>handleToggleWatchlist</code> in <code>useCallback</code>, we ensure the function reference stays the same across renders.</p>
        <p><strong>How it works:</strong></p>
        <ul>
          <li><code>useCallback</code> memoizes the function itself</li>
          <li>With an empty dependency array <code>[]</code>, the same function instance is reused</li>
          <li>We use the functional form of <code>setWatchlist</code> to avoid needing <code>watchlist</code> in deps</li>
          <li><code>React.memo</code> sees the same <code>onToggleWatchlist</code> reference and skips re-render</li>
        </ul>
        <p><strong>Note:</strong> Movies still re-render when their <code>isInWatchlist</code> prop changes - that's correct behavior!</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Solution2UseCallback;
