import movies from "./components/movies";
import useViews from "./components/useViews";
import Movie from "./components/Movie";
import Views from "./components/Views";

const MoviesList = () => {
  const views = useViews();

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          {/* Question: What actually causes `Movie` to re-render although only `views` change? */}
          {/* New feature request: Pass `onClick` handler to Movie component */}
          <Movie title={title} year={year} />
          <Views views={views[id]} />
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
        <h3>Live view of movies world-wide</h3>
        <p>The `views` state updates every second, causing re-renders.</p>
        <p><strong>Question 1:</strong> What actually causes `Movie` to re-render although only `views` change?</p>
        <p><strong>Question 2:</strong> New feature request: Whenever user clicks on Movie name show alert with title of movie. How to implement?</p>
        <p>Open the console to observe the log messages.</p>
      </div>
    </div>
  );
};

export default Problem;
