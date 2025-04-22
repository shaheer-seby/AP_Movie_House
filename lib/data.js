import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "data.json");

export function getAllData() {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export function getMovieById(id) {
  const data = getAllData();
  return data.movies.find((movie) => movie.id === id);
}

export function getAllMovieIds() {
  const data = getAllData();
  return data.movies.map((movie) => ({ params: { id: movie.id } }));
}

export function getGenreById(id) {
  const data = getAllData();
  return data.genres.find((g) => g.id === id);
}

export function getDirectorById(id) {
  const data = getAllData();
  return data.directors.find((d) => d.id === id);
}
