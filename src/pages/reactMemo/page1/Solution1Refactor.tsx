import movies from "../components/movies";
import MovieBasic from "../components/MovieBasic";
import ViewsWithHook from "../components/ViewsWithHook";

const MoviesList = () => {
  // No useViews hook here anymore! It's been moved into the ViewsWithHook component.
  // This means MoviesList no longer re-renders when views change.

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          <MovieBasic title={title} year={year} />
          <ViewsWithHook movieId={id} />
        </div>
      ))}
    </div>
  );
};

const Solution1Refactor = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution 1: Refactor - Move useViews into Views</h3>
        <p>By moving the <code>useViews</code> hook into the <code>ViewsWithHook</code> component, we ensure that only that component re-renders when views change.</p>
        <p>The parent <code>MoviesList</code> no longer holds the <code>views</code> state, so it doesn't re-render and neither do the <code>Movie</code> components.</p>
        <p><strong>Trade-off:</strong> Each <code>ViewsWithHook</code> instance now runs its own interval. This might not be desirable for performance or consistency.</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Solution1Refactor;
