import React, { useState } from "react";
import { Showtime } from "./movies";

type MovieProps = {
  title: string;
  year: number;
  showtimes: Showtime[];
};

const Movie: React.FC<MovieProps> = ({ title, year, showtimes }) => {
  console.log(`[Movie] ${title} re-rendered`);

  // Local state for watchlist - handler is inside the component
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleToggleWatchlist = () => {
    setIsInWatchlist((prev) => !prev);
  };

  return (
    <div className="movie-item">
      <div className="movie-header">
        <h3>{title}</h3>
        <button
          className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
          onClick={handleToggleWatchlist}
        >
          {isInWatchlist ? '★ In Watchlist' : '☆ Add to Watchlist'}
        </button>
      </div>
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

export default React.memo(Movie);
