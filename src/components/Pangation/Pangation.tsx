import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Dispatch, SetStateAction } from "react";
import { getVisiblePages } from "../../lib/getVisiblePagesPagnation";
import GenerateNearbyPages from "../../lib/GenerateNearbyPages";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  firstItem: number;
  lastItem: number;
  isFetching: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  incrementPage: () => void;
  decrementPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalResults,
  firstItem,
  lastItem,
  isFetching,
  setCurrentPage,
  incrementPage,
  decrementPage,
}: PaginationProps) => {
  return (
    <section className="mt-12 border-t border-(--border-color) pt-7">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Results Info */}
        <p className="text-center text-sm text-(--text-secondary)">
          Showing{" "}
          <span className="font-semibold text-(--text-primary)">
            {firstItem.toLocaleString()}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-(--text-primary)">
            {lastItem.toLocaleString()}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-(--text-primary)">
            {totalResults.toLocaleString()}
          </span>{" "}
          results
        </p>

        {/* Pagination Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Previous */}
          <button
            onClick={decrementPage}
            disabled={isFetching || totalPages <= 1}
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
          {getVisiblePages(currentPage, totalPages).map((page) => (
            <GenerateNearbyPages
              key={page}
              page={page}
              isFetching={isFetching}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
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
            disabled={isFetching || totalPages <= 1}
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
    </section>
  );
};

export default Pagination;
