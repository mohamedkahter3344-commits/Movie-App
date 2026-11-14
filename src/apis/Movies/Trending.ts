import axios from "axios";

export async function getAllTrendingMovies() {
  return await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
}
