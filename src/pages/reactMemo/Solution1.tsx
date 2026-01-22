import useViews from "./components/useViews";
import Views from "./components/Views";
import movies from "./components/movies";
import MemoizeMovieWithHandler from "./components/MemoizeMovieWithHandler";

const MoviesList = () => {
  const views = useViews();

  return (
    <div>
      {movies.map(({ id, title, year }) => (
        <div key={id} className="movie-wrapper">
          <MemoizeMovieWithHandler title={title} year={year} />
          <Views views={views[id]} />
        </div>
      ))}
    </div>
  );
};

const Solution1 = () => {
  return (
    <div className="react-memo-example">
      <MoviesList />
      <div className="info-box success">
        <h3>Solution: `React.memo` + moving handler inside component</h3>
        <p>By wrapping the `MemoizeMovieWithHandler` component in `React.memo`, we prevent it from re-rendering as long as its props don't change.</p>
        <p>Open the console. You should see the `MemoizeMovieWithHandler` components render only once, while the "Views" continue to update.</p>
      </div>
    </div>
  );
};

export default Solution1;
