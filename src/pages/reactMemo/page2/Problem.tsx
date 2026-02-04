import movies from "../components/movies";
import useViews from "../components/useViews";
import MemoizedMovie from "../components/MemoizedMovie";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();

  // Manager's new feature request: show alert when movie is clicked
  // Naive approach: define handler in parent and pass down
  const handleMovieClick = (title: string) => {
    alert(`Wonderful movie: ${title}`);
  };

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          {/* Even though MemoizedMovie uses React.memo, it still re-renders! */}
          <MemoizedMovie title={title} year={year} onClick={handleMovieClick} />
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
        <h3>New Feature Request: Click to show movie title</h3>
        <p>The manager wanted a new feature: clicking a movie shows an alert with the title.</p>
        <p><strong>Problem:</strong> Even though <code>Movie</code> is wrapped in <code>React.memo</code>, it re-renders on every views update!</p>
        <p><strong>Why?</strong> The <code>handleMovieClick</code> function is recreated on every render. Since it's a new function reference each time, <code>React.memo</code>'s shallow comparison sees it as a changed prop.</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Problem;
