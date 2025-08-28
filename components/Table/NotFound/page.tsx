import { ScrollText } from "lucide-react";
import Link from "next/link";

export default function NotFoundCandidatesTable() {
  return (
    <tbody className="flex flex-col w-full items-center justify-center">
      <tr className="flex flex-col w-full items-center justify-center p-20 gap-5">
        <td>
          <ScrollText size={58} />
        </td>
        <td className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-black text-2xl font-bold">
            Nenhum candidato encontrado
          </h3>
          <p className="text-gray-500 w-8/12 font-medium text-center">
            Não há candidatos correspondentes aos filtros selecionados. Tente
            ajustar seus critérios de busca ou adicione novos candidatos.
          </p>
        </td>

        <td>
          <Link href="/form">
            <button
              type="button"
              className="bg-[#1A56DB] text-white w-48 h-12 rounded-lg align-self-center mb-10 hover:bg-[#093186] transition-colors"
            >
              Adicionar Candidato
            </button>
          </Link>
        </td>
      </tr>
    </tbody>
  );
}
