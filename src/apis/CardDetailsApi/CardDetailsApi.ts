import axios from "axios";

export async function getCardDetails(CardId: string, type: string) {
  return await axios.get(
    `https://api.themoviedb.org/3/${type}/${CardId}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
}
