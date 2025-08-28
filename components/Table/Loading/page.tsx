import { LoaderCircle } from "lucide-react";

export default function LoadingCandidatesTable() {
  return (
    <tbody className="flex flex-col w-full items-center justify-center">
      <tr className="flex flex-col w-full items-center justify-center p-20 gap-5">
        <td>
          <LoaderCircle size={58} color="#1A56DB" className="animate-spin" />
        </td>
        <td className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-black text-2xl font-bold">
            Carregando Candidatos
          </h3>
          <p className="text-gray-500 font-medium">
            Por favor, aguarde enquanto buscamos os dados dos candidatos.
          </p>
        </td>
      </tr>
    </tbody>
  );
}
