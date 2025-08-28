export function getPagination(
  currentPage: number,
  arrayLength: number,
  itemsPerPage: number
) {
  const totalPages = Math.ceil(arrayLength / itemsPerPage);

  const pagination = {
    start: (currentPage - 1) * itemsPerPage,
    end: currentPage * itemsPerPage,
    totalPages,
    currentPage,
    itemsPerPage,
  };

  return pagination;
}
