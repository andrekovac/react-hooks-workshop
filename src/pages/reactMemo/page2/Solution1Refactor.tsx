import movies from "../components/movies";
import useViews from "../components/useViews";
import MemoizeMovieWithHandler from "../components/MemoizeMovieWithHandler";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();

  // No handler passed down - it's defined inside the Movie component

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          <MemoizeMovieWithHandler title={title} year={year} />
          <ViewsBasic views={views[id]} />
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
        <h3>Solution 1: Move handler inside Movie</h3>
        <p>By defining the <code>onClick</code> handler inside the <code>Movie</code> component itself, we avoid passing a function prop from the parent.</p>
        <p>Since <code>title</code> and <code>year</code> are stable primitive props, <code>React.memo</code> works as expected.</p>
        <p><strong>Trade-off:</strong> The handler logic is now coupled to the <code>Movie</code> component. This might not be ideal if you need different click behaviors in different contexts.</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Solution1Refactor;
