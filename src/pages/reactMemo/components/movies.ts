export type Showtime = {
  time: string;
  room: string;
  format: string;
};

export type MovieT = {
  id: number;
  title: string;
  year: number;
  showtimes: Showtime[];
};

const movies: MovieT[] = [
  {
    id: 1,
    title: "28 Years Later: The Bone Temple",
    year: 2026,
    showtimes: [
      { time: "14:30", room: "Hall 1", format: "2D" },
      { time: "17:15", room: "Hall 3", format: "IMAX" },
      { time: "20:00", room: "Hall 1", format: "2D" },
      { time: "22:45", room: "Hall 5", format: "Dolby Atmos" },
    ],
  },
  {
    id: 2,
    title: "Avatar: Fire & Ash",
    year: 2026,
    showtimes: [
      { time: "13:00", room: "Hall 2", format: "3D" },
      { time: "16:30", room: "Hall 4", format: "IMAX 3D" },
      { time: "19:45", room: "Hall 2", format: "3D" },
      { time: "23:00", room: "Hall 4", format: "IMAX 3D" },
    ],
  },
  {
    id: 3,
    title: "Sinners",
    year: 2026,
    showtimes: [
      { time: "15:00", room: "Hall 6", format: "2D" },
      { time: "18:00", room: "Hall 3", format: "Dolby Atmos" },
      { time: "21:00", room: "Hall 6", format: "2D" },
    ],
  },
  {
    id: 4,
    title: "The Housemaid",
    year: 2026,
    showtimes: [
      { time: "14:00", room: "Hall 7", format: "2D" },
      { time: "16:45", room: "Hall 7", format: "2D" },
      { time: "19:30", room: "Hall 5", format: "Dolby Atmos" },
      { time: "22:00", room: "Hall 7", format: "2D" },
    ],
  },
];

export default movies;
