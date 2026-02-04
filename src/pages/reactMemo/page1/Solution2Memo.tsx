import movies from "../components/movies";
import useViews from "../components/useViews";
import MovieMemoizedBasic from "../components/MovieMemoizedBasic";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          {/* MovieMemoizedBasic is wrapped in React.memo */}
          <MovieMemoizedBasic title={title} year={year} />
          <ViewsBasic views={views[id]} />
        </div>
      ))}
    </div>
  );
};

const Solution2Memo = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution 2: React.memo</h3>
        <p>By wrapping the <code>Movie</code> component in <code>React.memo</code>, React will skip re-rendering it if its props haven't changed.</p>
        <p>The <code>title</code> and <code>year</code> props remain the same across renders, so <code>Movie</code> doesn't re-render.</p>
        <p><strong>How it works:</strong> <code>React.memo</code> performs a shallow comparison of props. If all props are equal, the component is not re-rendered.</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Solution2Memo;
