import React from "react";

type MovieProps = {
  title: string;
  year: number;
};

const MovieBasic: React.FC<MovieProps> = ({ title, year }) => {
  console.log(`[Movie 🎬] ${title} re-rendered`);

  return (
    <div className="movie-item">
      <h3>{title}</h3>
      <p>Year: {year}</p>
    </div>
  );
};

export default MovieBasic;
