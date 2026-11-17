import axios from "axios";

export async function getAllSearchMedia(
  typeMedia: "movie" | "tv",
  query: string
) {
  return await axios.get(
    `https://api.themoviedb.org/3/search/${typeMedia}`,
    {
      params: {
        query: query,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
}