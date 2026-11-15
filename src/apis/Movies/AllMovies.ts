import axios from "axios";

export async function getAllMovies(page:number) {
  return await axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
}
