
import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  function incrementPage(totalPages: number) {
    setCurrentPage((prev) =>
      prev >= totalPages ? 1 : prev + 1
    );
  }

  function decrementPage(totalPages: number) {
    setCurrentPage((prev) =>
      prev <= 1 ? totalPages : prev - 1
    );
  }

  function resetPage() {
    setCurrentPage(1);
  }

  return {
    currentPage,
    setCurrentPage,
    incrementPage,
    decrementPage,
    resetPage,
  };
};
