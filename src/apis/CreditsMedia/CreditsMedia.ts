import axios from "axios";

export async function getCreditsMedia(CardId: string | undefined, type: "movie" | "tv") {
  return await axios.get(
    `https://api.themoviedb.org/3/${type}/${CardId}/credits`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
}
