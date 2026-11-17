import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";
import type { ChangeEvent } from "react";
import { Clapperboard } from "lucide-react";

import { getAllMovies } from "../../apis/Movies/AllMovies";
import { getMoviesByCategory } from "../../apis/Movies/MoviesByCategory";

import type { Movie } from "../../types/TrendingMovies.t";

import LoadingSkeleton from "../../components/Loading Skeleton/LoadingSkeleton";
import ErrorState from "../../components/Error State/ErrorState";

import { usePagination } from "../../hooks/usePagination";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import MediaInformation from "../../components/MediaInformation/MediaInformation";
import MediaGrid from "../../components/MediaGrid/MediaGrid";
import Pagination from "../../components/Pangation/Pangation";
import SearchMedia from "../../components/SearchMedia/SearchMedia";
import { getAllSearchMedia } from "../../apis/SearchMedia/SearchMedia";

// Movie Categories
type MovieCategory =
  | "all"
  | "popular"
  | "top_rated"
  | "now_playing"
  | "upcoming";

// Movie Options
const movieCategories: {
  value: MovieCategory;
  label: string;
}[] = [
  { value: "all", label: "All Movies" },
  { value: "popular", label: "Popular Movies" },
  { value: "top_rated", label: "Top Rated" },
  { value: "now_playing", label: "Now Playing" },
  { value: "upcoming", label: "Upcoming" },
];

// Movie Titles
const categoryTitles: Record<MovieCategory, string> = {
  all: "All Movies",
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
  now_playing: "Now Playing Movies",
  upcoming: "Upcoming Movies",
};

const Movies = () => {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState<MovieCategory>("all");

  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    incrementPage,
    decrementPage,
    resetPage,
  } = usePagination();

  // Fetch Movies
  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: ["movies", category, currentPage, searchValue],

    queryFn: () =>
      searchValue
        ? getAllSearchMedia("movie", searchValue)
        : category === "all"
          ? getAllMovies(currentPage)
          : getMoviesByCategory(category, currentPage),
  });

  // Movies Data
  const movies: Movie[] = data?.data?.results ?? [];

  // Pagination Data
  const totalPages = Math.min(data?.data?.total_pages ?? 1, 500);
  const totalResults = data?.data?.total_results ?? 0;

  const pageSize = 20;

  const firstItem = totalResults > 0 ? (currentPage - 1) * pageSize + 1 : 0;

  const lastItem = Math.min(currentPage * pageSize, totalResults);

  // Change Category
  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value as MovieCategory);
    resetPage();
  }

  // Error
  if (isError) {
    return <ErrorState typeMedia="movies" errorState={error} />;
  }

  return (
    <main className="min-h-screen bg-(--bg-primary) px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            {/* Title & Description */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
                  <Clapperboard size={20} className="text-red-500" />
                </div>

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                  Discover Movies
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-(--text-primary) sm:text-4xl lg:text-5xl">
                {categoryTitles[category]}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-(--text-secondary) sm:text-base">
                Explore movies and discover your next favorite.
              </p>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              id="movie-category"
              label="Filter Movies"
              value={category}
              onChange={handleCategoryChange}
              options={movieCategories}
            />
          </div>
        </section>

        <SearchMedia
          mediaType="movie"
          isPending={isFetching}
          onSearch={(value) => {
            setSearchValue(value);
            resetPage();
          }}
          onReset={() => {
            setSearchValue("");
            resetPage();
          }}
        />

        {/* Movies Information */}
        <MediaInformation
          title={categoryTitles[category]}
          description="Browse and explore our movie collection."
          totalResults={totalResults}
          mediaType="movie"
        />

        {/* Movies Results */}
        {isError ? (
          <ErrorState typeMedia="movies" errorState={error} />
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : (
          <MediaGrid items={movies} mediaType="movie" isFetching={isFetching} />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          firstItem={firstItem}
          lastItem={lastItem}
          isFetching={isFetching}
          setCurrentPage={setCurrentPage}
          incrementPage={() => incrementPage(totalPages)}
          decrementPage={() => decrementPage(totalPages)}
        />
      </div>
    </main>
  );
};

export default Movies;
