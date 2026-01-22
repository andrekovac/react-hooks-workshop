import React from "react";

type MovieProps = {
  title: string;
  year: number;
};

const Movie: React.FC<MovieProps> = ({ title, year }) => {
  console.log("[Movie 🎬] Component re-render");

  const handleMovieClick = () => {
    alert(`Wonderful movie: ${title}`);
  }

  return (
    <div className="movie-item" onClick={handleMovieClick}>
      <h3>{title}</h3>
      <p>Year: {year}</p>
    </div>
  );
};

export default React.memo(Movie);
