import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  perPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  data: T[];
  setPage: (page: number) => void;
}

// frontend pagination por motivos de preguiça
export function usePagination<T>({
  data,
  perPage = 10,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / perPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return data.slice(start, end);
  }, [currentPage, data, perPage]);

  const setPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  return {
    currentPage,
    totalPages,
    data: paginatedData,
    setPage,
  };
}
