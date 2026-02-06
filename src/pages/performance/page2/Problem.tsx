import { useState } from "react";
import movies from "../components/movies";
import useViews from "../components/useViews";
import MemoizedMovie from "../components/MemoizedMovie";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  // New feature: toggle watchlist
  // Naive approach: define handler in parent and pass down
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
          {/* Even though MemoizedMovie uses React.memo, it still re-renders! */}
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

const Problem = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box warning">
        <h3>New Feature: Add to Watchlist</h3>
        <p>A new feature was added: users can add movies to their watchlist by clicking the button.</p>
        <p><strong>Problem:</strong> Even though <code>Movie</code> is wrapped in <code>React.memo</code>, ALL movies re-render on every views update!</p>
        <p><strong>Why?</strong> The <code>handleToggleWatchlist</code> function is recreated on every render. Since it's a new function reference each time, <code>React.memo</code>'s shallow comparison sees it as a changed prop.</p>
        <p>Open the console to observe the log messages - all 4 movies re-render every second!</p>
      </div>
    </div>
  );
};

export default Problem;
