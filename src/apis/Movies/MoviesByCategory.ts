import axios from "axios";

export async function getMoviesByCategory(
  category: "popular" | "top_rated" | "now_playing" | "upcoming",
  currentPage?: number
) {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${category}?page=${currentPage ?? 1}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
}