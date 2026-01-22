export type MovieT = {
  id: number;
  title: string;
  year: number;
};

const movies: MovieT[] = [
  { id: 1, title: "Forrest Gump", year: 1994 },
  { id: 2, title: "The Shawshank Redemption", year: 1994 },
  { id: 3, title: "Saving Private Ryan", year: 1998 },
  { id: 4, title: "Toy Story", year: 1995 }
];

export default movies;
