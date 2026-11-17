import axios from "axios";

export async function addToFavorites(
  account_id: string,
  MediaId: string,
  typeMedia: "movie" | "tv",
  isFavorite: boolean,
) {
  return await axios.post(
    `https://api.themoviedb.org/3/account/${account_id}/favorite`,
    {
      media_type: typeMedia,
      media_id: MediaId,
      favorite: isFavorite,
    },
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
}
