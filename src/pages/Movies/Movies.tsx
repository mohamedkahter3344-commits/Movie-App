import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../../apis/Movies/AllMovies";
import { useState } from "react";
import type { Movie } from "../../types/TrendingMovies.t";
import CardItem from "../../components/CardItem/CardItem";
import { ChevronLeft, ChevronRight, Clapperboard } from "lucide-react";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: ["Allmovies", currentPage],
    queryFn: () => getAllMovies(currentPage),
  });

  const movies: Movie[] = data?.data.results ?? [];

  // TMDB allows a maximum of 500 pages
  const totalPages = Math.min(data?.data.total_pages ?? 500, 500);
  const totalResults = data?.data.total_results ?? 0;
  const pageSize = 20;

  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalResults);

  function incrementPage() {
    setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
  }

  function decrementPage() {
    setCurrentPage((prev) => (prev <= 1 ? totalPages : prev - 1));
  }

  // Generate nearby page numbers
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-(--bg-primary) px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 h-10 w-48 animate-pulse rounded-lg bg-(--bg-card)" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-2/3 rounded-xl bg-(--bg-card)" />
                <div className="mt-3 h-4 w-3/4 rounded bg-(--bg-card)" />
                <div className="mt-2 h-3 w-1/2 rounded bg-(--bg-card)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
        <Clapperboard size={42} className="text-red-500" />
        <h2 className="text-xl font-bold text-(--text-primary)">
          Something went wrong
        </h2>
        <p className="text-(--text-secondary)">
          {error instanceof Error ? error.message : "Failed to load movies"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-(--bg-primary) px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-red-500">
              <Clapperboard size={17} />
              Discover
            </div>

            <h1 className="text-3xl font-extrabold text-(--text-primary) sm:text-4xl">
              Explore Movies
            </h1>

            <p className="mt-2 text-sm text-(--text-secondary)">
              Discover your next favorite movie.
            </p>
          </div>

          <div className="rounded-xl border border-(--border-color) bg-(--bg-card) px-4 py-3">
            <p className="text-xs text-(--text-secondary)">Total Movies</p>
            <p className="text-xl font-bold text-(--text-primary)">
              {totalResults.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="relative">
          {isFetching && (
            <div className="absolute inset-0 z-10 flex items-start justify-center bg-(--bg-primary)/40 pt-20 backdrop-blur-[2px]">
              <div className="rounded-full bg-(--bg-card) px-5 py-3 text-sm font-medium text-(--text-primary) shadow-lg">
                Loading movies...
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {movies.map((movie) => (
              <CardItem key={movie.id} type="movie" movie={movie} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 border-t border-(--border-color) pt-7">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Results Info */}
            <p className="text-center text-sm text-(--text-secondary)">
              Showing <span>{firstItem.toLocaleString()}</span> to{" "}
              <span>{lastItem.toLocaleString()}</span> of{" "}
              <span>{totalResults.toLocaleString()}</span> results
            </p>

            {/* Pagination Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {/* Previous */}
              <button
                onClick={decrementPage}
                disabled={isFetching}
                aria-label="Previous page"
                className="flex h-10 items-center gap-1 rounded-lg border border-(--border-color) bg-(--bg-card) px-3 text-sm font-medium text-(--text-primary) transition hover:border-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={18} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* First Page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={isFetching}
                    className="h-10 min-w-10 rounded-lg border border-(--border-color) bg-(--bg-card) px-3 text-sm text-(--text-primary) transition hover:border-red-500"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="px-1 text-(--text-secondary)">...</span>
                  )}
                </>
              )}

              {/* Nearby Pages */}
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  disabled={isFetching}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition ${
                    currentPage === page
                      ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "border-(--border-color) bg-(--bg-card) text-(--text-primary) hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Last Page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-1 text-(--text-secondary)">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={isFetching}
                    className="h-10 min-w-10 rounded-lg border border-(--border-color) bg-(--bg-card) px-3 text-sm text-(--text-primary) transition hover:border-red-500"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={incrementPage}
                disabled={isFetching}
                aria-label="Next page"
                className="flex h-10 items-center gap-1 rounded-lg border border-(--border-color) bg-(--bg-card) px-3 text-sm font-medium text-(--text-primary) transition hover:border-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-(--text-secondary)">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Movies;
