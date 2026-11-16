
export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
): number[] => {
  const pages: number[] = [];

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  return pages;
};
