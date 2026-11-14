import axios from "axios";

export async function getVideoMedia(id: string | undefined, type: string) {
  return await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
}
