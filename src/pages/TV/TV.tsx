
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Clapperboard } from "lucide-react";

import { getTvByCategory } from "../../apis/TVAPI/TvByCategory";
import { getAllTv } from "../../apis/TVAPI/AllTv";

import type { TV } from "../../types/TV.t";

import LoadingSkeleton from "../../components/Loading Skeleton/LoadingSkeleton";
import ErrorState from "../../components/Error State/ErrorState";

import { usePagination } from "../../hooks/usePagination";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import MediaInformation from "../../components/MediaInformation/MediaInformation";
import MediaGrid from "../../components/MediaGrid/MediaGrid";
import Pagination from "../../components/Pangation/Pangation";

// TV Categories
type TvCategory =
  | "all"
  | "popular"
  | "top_rated"
  | "on_the_air"
  | "airing_today";

// TV Options
const tvCategories: {
  value: TvCategory;
  label: string;
}[] = [
  { value: "all", label: "All TV" },
  { value: "popular", label: "Popular TV" },
  { value: "top_rated", label: "Top Rated TV" },
  { value: "on_the_air", label: "On The Air" },
  { value: "airing_today", label: "Airing Today" },
];

// TV Titles
const tvTitles: Record<TvCategory, string> = {
  all: "All TV",
  popular: "Popular TV",
  top_rated: "Top Rated TV",
  on_the_air: "On The Air TV",
  airing_today: "Airing TV",
};

const Tv = () => {
  const [category, setCategory] = useState<TvCategory>("all");

  // Pagination Hook
  const {
    currentPage,
    setCurrentPage,
    incrementPage,
    decrementPage,
    resetPage,
  } = usePagination();

  // Fetch TV
  const {
    isLoading,
    isFetching,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ["tv", category, currentPage],
    queryFn: () =>
      category === "all"
        ? getAllTv(currentPage)
        : getTvByCategory(category, currentPage),
  });

  // TV Data
  const tvShows: TV[] = data?.data?.results ?? [];

  // Pagination Data
  const totalPages = Math.min(
    data?.data?.total_pages ?? 1,
    500,
  );

  const totalResults = data?.data?.total_results ?? 0;
  const pageSize = 20;

  const firstItem =
    totalResults > 0
      ? (currentPage - 1) * pageSize + 1
      : 0;

  const lastItem = Math.min(
    currentPage * pageSize,
    totalResults,
  );

  // Change Category
  function handleCategoryChange(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    setCategory(event.target.value as TvCategory);
    resetPage();
  }

  // Loading
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Error
  if (isError) {
    return <ErrorState typeMedia="tv" errorState={error} />;
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
                  Discover TV
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-(--text-primary) sm:text-4xl lg:text-5xl">
                {tvTitles[category]}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-(--text-secondary) sm:text-base">
                Explore TV and discover your next favorite.
              </p>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              id="tv-category"
              label="Filter TV"
              value={category}
              onChange={handleCategoryChange}
              options={tvCategories}
            />
          </div>
        </section>

        {/* TV Information */}
        <MediaInformation
          title={tvTitles[category]}
          description="Browse and explore our TV collection."
          totalResults={totalResults}
          mediaType="tv"
        />

        {/* TV Grid */}
        <MediaGrid
          items={tvShows}
          mediaType="tv"
          isFetching={isFetching}
        />

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

export default Tv;
