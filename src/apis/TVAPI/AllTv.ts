import axios from "axios";

export async function getAllTv(page:number) {
  return await axios.get(`https://api.themoviedb.org/3/discover/tv?page=${page}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
}
