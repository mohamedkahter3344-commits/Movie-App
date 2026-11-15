import axios from "axios";

export async function getAllTrendingMedia(type:"movie" | "tv") {
  return await axios.get(
    `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
}
