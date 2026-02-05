import movies from "../components/movies";
import useViews from "../components/useViews";
import MovieBasic from "../components/MovieBasic";
import ViewsBasic from "../components/ViewsBasic";

const MoviesList = () => {
  const views = useViews();

  return (
    <div>
      {movies.map(({ id, title, year, showtimes }) => (
        <div key={id} className="movie-wrapper">
          {/* Question: What actually causes `Movie` to re-render although only `views` change? */}
          <MovieBasic title={title} year={year} showtimes={showtimes} />
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
        <h3>Live view counter</h3>
        <p>The <code>views</code> state updates every second, causing re-renders.</p>
        <p><strong>Question:</strong> What actually causes <code>Movie</code> to re-render although only <code>views</code> change?</p>
        <p><strong>Hint:</strong> Think about what happens when the parent component re-renders.</p>
        <p>Open the console to observe the log messages - notice how all movies re-render their entire showtime lists unnecessarily!</p>
      </div>
    </div>
  );
};

export default Problem;
