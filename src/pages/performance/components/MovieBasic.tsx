import React from "react";
import { Showtime } from "./movies";

type MovieProps = {
  title: string;
  year: number;
  showtimes: Showtime[];
};

const MovieBasic: React.FC<MovieProps> = ({ title, year, showtimes }) => {
  console.log(`[Movie] ${title} re-rendered`);

  return (
    <div className="movie-item">
      <h3>{title}</h3>
      <p className="movie-year">({year})</p>
      <div className="showtimes">
        <p className="showtimes-label">Today's Showtimes:</p>
        <ul className="showtimes-list">
          {showtimes.map((showtime) => (
            <li key={`${showtime.time}-${showtime.room}`} className="showtime-item">
              <span className="showtime-time">{showtime.time}</span>
              <span className="showtime-room">{showtime.room}</span>
              <span className="showtime-format">{showtime.format}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieBasic;
