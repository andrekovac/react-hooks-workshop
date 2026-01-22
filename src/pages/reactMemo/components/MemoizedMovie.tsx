import React from "react";

type MovieProps = {
  title: string;
  year: number;
  onClick?: (title: string) => void;
};

const Movie: React.FC<MovieProps> = ({ title, year, onClick }) => {
  console.log(`[Movie 🎬] ${title} re-rendered`);

  return (
    <div className="movie-item" onClick={() => onClick?.(title)}>
      <h3>{title}</h3>
      <p>Year: {year}</p>
    </div>
  );
};

export default React.memo(Movie);

// --- Alternative ---
//
// export default React.memo(
//   Movie,
//   // function to decide whether two sets of props didn't change
//   // if true, component won't re-render.
//   (prevProps, nextProps) => {
//     prevProps.title === nextProps.title && prevProps.year === nextProps.year;
//   }
// );
