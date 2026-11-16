
import type { Dispatch, SetStateAction } from "react";

interface GenerateNearbyPagesProps {
  page: number;
  isFetching: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const GenerateNearbyPages = ({
  page,
  isFetching,
  currentPage,
  setCurrentPage,
}: GenerateNearbyPagesProps) => {
  return (
    <button
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
  );
};

export default GenerateNearbyPages;
