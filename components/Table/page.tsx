import ICandidate from "../../types/Candidate/ICandidate";
import Pagination from "../Pagination/page";
import { Dot } from "lucide-react";
import { fits } from "../../constants/fits";
import LoadingCandidatesTable from "./Loading/page";
import NotFoundCandidatesTable from "./NotFound/page";
import ErrorSearchCandidatesTable from "./Error/page";
import { getPagination } from "@/utils/pagination";

interface TableProps {
  filtered: ICandidate[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  calculateFit: (fitScore: number) => string;
  loading: boolean;
  error: boolean;
}

export default function Table({
  filtered,
  currentPage,
  setCurrentPage,
  calculateFit,
  loading,
  error,
}: TableProps) {
  const columns = ["Nome", "Email", "FitScore", "Classificação"];
  const columnWidths = ["w-2/5", "w-2/5", "w-1/5", "w-2/5"];

  const pagination = getPagination(currentPage, filtered.length, 5);

  return (
    <div className="flex flex-col w-full items-start gap-5 rounded-lg p-6 bg-white shadow-md">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-black font-bold text-xl">Lista de Candidatos</h3>

        <input
          type="text"
          placeholder="Buscar candidatos"
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      <table className="flex flex-col w-full rounded-lg text-gray-500 font-bold">
        <thead className="flex justify-between w-full">
          <tr className="flex bg-gray-100 border-b w-full">
            {columns.map((column, index) => (
              <th
                key={column}
                className={`p-4 text-left ${columnWidths[index]}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        {loading && <LoadingCandidatesTable />}

        {error && <ErrorSearchCandidatesTable />}

        {filtered.length === 0 && !loading && !error && (
          <NotFoundCandidatesTable />
        )}

        {filtered.length > 0 && !loading && !error && (
          <tbody className="flex flex-col w-full ">
            {filtered
              .slice(pagination.start, pagination.end)
              .map((candidate) => (
                <tr
                  key={candidate.id}
                  className="flex w-full items-center justify-between  border-b hover:bg-gray-50"
                >
                  <td className={`py-2 px-4  ${columnWidths[0]}`}>
                    <p className="font-medium w-full">{candidate.name}</p>
                  </td>
                  <td className={`py-2 px-4  ${columnWidths[1]}`}>
                    <p className="font-medium w-full">{candidate.email}</p>
                  </td>
                  <td className={`py-2 px-4 text-black ${columnWidths[2]}`}>
                    <p className="font-semibold w-full">
                      {candidate.total_score}
                    </p>
                  </td>
                  <td className={`py-2 px-4  ${columnWidths[3]}`}>
                    <p
                      className="flex items-center font-semibold w-full"
                      style={{
                        color: fits.find(
                          (fit) =>
                            fit.label === calculateFit(candidate.total_score)
                        )?.textColor,
                      }}
                    >
                      <Dot
                        size={58}
                        color={
                          fits.find(
                            (fit) =>
                              fit.label === calculateFit(candidate.total_score)
                          )?.textColor
                        }
                      />
                      {calculateFit(candidate.total_score)}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        )}

        {filtered.length > 0 && !loading && (
          <tfoot className="flex w-full items-center justify-end mt-4">
            <Pagination
              start={pagination.start}
              end={
                pagination.end > filtered.length
                  ? filtered.length
                  : pagination.end
              }
              currentPage={pagination.currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={pagination.totalPages}
              totalItems={filtered.length}
            />
          </tfoot>
        )}
      </table>
    </div>
  );
}
