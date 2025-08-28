import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems = 30,
  start = 0,
  end = 10,
}: {
  start: number;
  end: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
}) {
  return (
    <tr className="flex items-center justify-between gap-10">
      <th className="flex w-full items-center justify-between">
        <p className="flex items-center min-w-max">
          Mostrando {start + 1} - {end} de {totalItems} resultados
        </p>

        <div className="flex w-full gap-3">
          <button
            disabled={currentPage === 1}
            className="w-11 h-11 rounded-md p-3 border border-gray-300 hover:bg-[#1A56DB] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`w-11 h-11 rounded-md p-3 border border-gray-300 hover:bg-[#1A56DB] hover:text-white ${
                    page === currentPage
                      ? "bg-[#1A56DB] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <button
            disabled={currentPage === totalPages}
            className="w-11 h-11 rounded-md p-3 border border-gray-300 hover:bg-[#1A56DB] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </th>
    </tr>
  );
}
