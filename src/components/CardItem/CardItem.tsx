
import {
  Star,
  CalendarDays,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Movie } from "../../types/TrendingMovies.t";
import type { TV } from "../../types/TV.t";
import FavoriteButtonUi from "../FavoriteButtonUi/FavoriteButtonUi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type MovieCardProps =
  | {
      type: "movie";
      movie: Movie;
    }
  | {
      type: "tv";
      movie: TV;
    };

const CardItem = ({ type, movie }: MovieCardProps) => {
  const isTV = type === "tv";

  // Poster
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "/placeholder-movie.png";

  // Title
  const title = isTV ? movie.name : movie.title;

  // Release Year
  const releaseDate = isTV
    ? movie.first_air_date
    : movie.release_date;

  const releaseYear = releaseDate
    ? new Date(releaseDate).getFullYear()
    : "Coming Soon";

  // Rating
  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  // Details Route
  const detailsPath = isTV
    ? `/tv/${movie.id}`
    : `/movie/${movie.id}`;

  return (
    <Link
      to={detailsPath}
      className="group relative block w-full overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-card) shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20"
    >
      {/* Poster */}
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/10 opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
          {/* Release Year */}
          <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <CalendarDays size={13} />
            {releaseYear}
          </span>

          {/* Rating */}
          <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-xs font-bold text-yellow-400 backdrop-blur-md">
            <Star size={14} fill="currentColor" />
            {rating}
          </span>
        </div>

        {/* Favorite Button */}

        <FavoriteButtonUi/>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-red-600 text-white shadow-xl shadow-red-600/30 transition-transform duration-500 group-hover:scale-100">
            <Play size={23} fill="currentColor" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-5">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-extrabold text-white transition-colors duration-300 group-hover:text-red-400 sm:text-xl">
            {title}
          </h3>

          {/* Overview */}
          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-300 sm:text-sm">
            {movie.overview || "No description available."}
          </p>

          {/* Details */}
          <div className="flex items-center justify-between border-t border-white/20 pt-3">
            <span className="text-sm font-semibold text-white">
              View Details
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-red-600">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardItem;
