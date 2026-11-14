
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Label, Select } from "flowbite-react";
import {
  Film,
  AlertCircle,
  ArrowRight,
  Tv,
} from "lucide-react";
import { Link } from "react-router-dom";
import SkelltonCard from "../SkelltonCard/SkelltonCard";

import { getMoviesByCategory } from "../../apis/Movies/MoviesByCategory";
import { getTvByCategory } from "../../apis/TVAPI/TvByCategory";

import type { Movie } from "../../types/TrendingMovies.t";
import type { TV } from "../../types/TV.t";
import CardItem from "../CardItem/CardItem";

// Movie Categories
type MovieCategory =
  | "popular"
  | "top_rated"
  | "now_playing"
  | "upcoming";

// TV Categories
type TvCategory =
  | "popular"
  | "top_rated"
  | "on_the_air"
  | "airing_today";

// Movie Titles
const categoryTitles: Record<MovieCategory, string> = {
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
  now_playing: "Now Playing Movies",
  upcoming: "Upcoming Movies",
};

// TV Titles
const categoryTitlesTV: Record<TvCategory, string> = {
  popular: "Popular TV Shows",
  top_rated: "Top Rated TV Shows",
  airing_today: "Airing Today TV",
  on_the_air: "On The Air TV",
};

const MediaCategorySection = () => {
  const [category, setCategory] =
    useState<MovieCategory>("popular");

  const [tvCategory, setTvCategory] =
    useState<TvCategory>("popular");

  // ================= MOVIES QUERY =================

  const {
    data: moviesData,
    isLoading: moviesLoading,
    isError: moviesIsError,
    error: moviesError,
  } = useQuery({
    queryKey: ["moviesCategory", category],
    queryFn: () => getMoviesByCategory(category),
  });

  const movies: Movie[] = moviesData?.data?.results ?? [];

  // ================= TV QUERY =================

  const {
    data: tvData,
    isLoading: tvLoading,
    isError: tvIsError,
    error: tvError,
  } = useQuery({
    queryKey: ["tvCategory", tvCategory],
    queryFn: () => getTvByCategory(tvCategory),
  });

  const tvShows: TV[] = tvData?.data?.results ?? [];

  return (
    <section className="w-full py-10 md:py-14 bg-(--bg-primary) transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= MOVIES SECTION ================= */}

        <div>
          {/* Movies Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Film className="text-red-600" size={23} />

                <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                  Discover Movies
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-(--text-primary)">
                {categoryTitles[category]}
              </h2>

              <p className="text-sm text-(--text-secondary) mt-2">
                Explore movies and discover your next favorite.
              </p>
            </div>

            {/* Movies Select */}
            <div className="w-full sm:w-64">
              <Label
                htmlFor="movie-category"
                className="mb-2.5 block text-sm font-semibold text-(--text-primary)"
              >
                Filter Movies
              </Label>

              <div className="relative">
                <div className="absolute inset-y-0 -left-8 flex items-center pointer-events-none z-10">
                  <Film size={20} className="text-red-500" />
                </div>

                <Select
                  id="movie-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as MovieCategory)
                  }
                  className="w-full"
                >
                  <option value="popular">Popular Movies</option>
                  <option value="top_rated">Top Rated</option>
                  <option value="now_playing">Now Playing</option>
                  <option value="upcoming">Upcoming</option>
                </Select>
              </div>

              <p className="mt-2 text-xs text-(--text-secondary)">
                Choose a category to explore movies
              </p>
            </div>
          </div>

          {/* Movies Loading */}
          {moviesLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkelltonCard key={index} />
              ))}
            </div>
          )}

          {/* Movies Error */}
          {moviesIsError && (
            <div className="min-h-64 flex flex-col items-center justify-center gap-3 text-center">
              <AlertCircle size={45} className="text-red-500" />

              <h3 className="text-xl font-bold text-(--text-primary)">
                Something went wrong!
              </h3>

              <p className="text-sm text-(--text-secondary)">
                {moviesError instanceof Error
                  ? moviesError.message
                  : "Failed to load movies. Please try again."}
              </p>
            </div>
          )}

          {/* Movies Grid */}
          {!moviesLoading && !moviesIsError && movies.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {movies.slice(0,10).map((movie) => (
                <CardItem
                  key={movie.id}
                  type="movie"
                  movie={movie}
                />
              ))}
            </div>
          )}

          {/* Movies Empty State */}
          {!moviesLoading && !moviesIsError && movies.length === 0 && (
            <div className="min-h-64 flex flex-col items-center justify-center gap-3 text-center">
              <Film size={45} className="text-gray-400" />

              <h3 className="text-xl font-bold text-(--text-primary)">
                No Movies Found
              </h3>

              <p className="text-sm text-(--text-secondary)">
                There are no movies available in this category.
              </p>
            </div>
          )}

          {/* Show All Movies */}
          <div className="flex justify-center mt-10">
            <Link
              to="/movies"
              className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm md:text-base shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-300"
            >
              Show All Movies

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ================= TV SHOWS SECTION ================= */}

        <div className="mt-20 md:mt-28">

          {/* TV Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tv className="text-red-600" size={23} />

                <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                  Discover TV Shows
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-(--text-primary)">
                {categoryTitlesTV[tvCategory]}
              </h2>

              <p className="text-sm text-(--text-secondary) mt-2">
                Discover popular TV shows and explore new series.
              </p>
            </div>

            {/* TV Select */}
            <div className="w-full sm:w-64">
              <Label
                htmlFor="tv-category"
                className="mb-2.5 block text-sm font-semibold text-(--text-primary)"
              >
                Filter TV Shows
              </Label>

              <div className="relative">
                <div className="absolute inset-y-0 -left-8 flex items-center pointer-events-none z-10">
                  <Tv size={20} className="text-red-500" />
                </div>

                <Select
                  id="tv-category"
                  value={tvCategory}
                  onChange={(event) =>
                    setTvCategory(event.target.value as TvCategory)
                  }
                  className="w-full"
                >
                  <option value="popular">Popular TV</option>
                  <option value="top_rated">Top Rated</option>
                  <option value="airing_today">Airing Today</option>
                  <option value="on_the_air">On The Air</option>
                </Select>
              </div>

              <p className="mt-2 text-xs text-(--text-secondary)">
                Choose a category to explore TV shows
              </p>
            </div>
          </div>

          {/* TV Loading */}
          {tvLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkelltonCard key={index} />
              ))}
            </div>
          )}

          {/* TV Error */}
          {tvIsError && (
            <div className="min-h-64 flex flex-col items-center justify-center gap-3 text-center">
              <AlertCircle size={45} className="text-red-500" />

              <h3 className="text-xl font-bold text-(--text-primary)">
                Something went wrong!
              </h3>

              <p className="text-sm text-(--text-secondary)">
                {tvError instanceof Error
                  ? tvError.message
                  : "Failed to load TV shows. Please try again."}
              </p>
            </div>
          )}

          {/* TV Shows Grid */}
          {!tvLoading && !tvIsError && tvShows.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {tvShows.slice(0,10).map((show) => (
                <CardItem
                  key={show.id}
                  type="tv"
                  movie={show}
                />
              ))}
            </div>
          )}

          {/* TV Empty State */}
          {!tvLoading && !tvIsError && tvShows.length === 0 && (
            <div className="min-h-64 flex flex-col items-center justify-center gap-3 text-center">
              <Tv size={45} className="text-gray-400" />

              <h3 className="text-xl font-bold text-(--text-primary)">
                No TV Shows Found
              </h3>

              <p className="text-sm text-(--text-secondary)">
                There are no TV shows available in this category.
              </p>
            </div>
          )}

          {/* Show All TV */}
          <div className="flex justify-center mt-10">
            <Link
              to="/tvShows"
              className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm md:text-base shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-1 transition-all duration-300"
            >
              Show All TV Shows

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MediaCategorySection;
