import { useState, useMemo } from "react";

export const usePagination = <T>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = useMemo(() => {
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, startIndex, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    paginatedData,
    startIndex,
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage,
  };
};
