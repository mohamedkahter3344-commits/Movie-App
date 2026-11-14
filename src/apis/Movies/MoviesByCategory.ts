import axios from "axios";

export async function getMoviesByCategory(
  category: "popular" | "top_rated" | "now_playing" | "upcoming",
) {
  return await axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
}
