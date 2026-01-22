import React from "react";

type MovieProps = {
  title: string;
  year: number;
  onClick?: (title: string) => void;
};

const Movie: React.FC<MovieProps> = ({ title, year, onClick }) => {
  console.log("[Movie 🎬] Component re-render");

  return (
    <div className="movie-item" onClick={() => onClick?.(title)}>
      <h3>{title}</h3>
      <p>Year: {year}</p>
    </div>
  );
};

export default Movie;
