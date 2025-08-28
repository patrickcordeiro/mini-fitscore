import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorSearchCandidatesTable() {
  const router = useRouter();

  return (
    <tbody className="flex flex-col w-full items-center justify-center">
      <tr className="flex flex-col w-full items-center justify-center p-20 gap-5">
        <td>
          <CircleAlert size={58} />
        </td>
        <td className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-black text-2xl font-bold">
            Erro ao carregar dados
          </h3>
          <p className="text-gray-500 w-8/12 font-medium text-center">
            Não foi possível carregar os dados dos candidatos. Verifique sua
            conexão com a internet e tente novamente.
          </p>
        </td>

        <td>
          <button
            type="button"
            className="bg-[#1A56DB] text-white w-48 h-12 rounded-lg align-self-center mb-10 hover:bg-[#093186] transition-colors"
            onClick={() => router.replace("/dashboard")}
          >
            Tentar novamente
          </button>
        </td>
      </tr>
    </tbody>
  );
}
