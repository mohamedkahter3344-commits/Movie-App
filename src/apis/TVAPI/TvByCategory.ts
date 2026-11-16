import axios from "axios";

export async function getTvByCategory(
  category: "popular" | "top_rated" | "airing_today" | "on_the_air",
  currentPage?:number
) {
  return await axios.get(`https://api.themoviedb.org/3/tv/${category}?page=${currentPage ?? 1}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
}
