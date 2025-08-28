import Logo from "@/components/Logo/page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center p-10">
      <Logo />
      <p className="text-gray-600">Escolha uma opção:</p>
      <div className="flex gap-4">
        <Link
          href="/form"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Avaliar Candidato
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-green-600 text-white rounded-xl"
        >
          Ver Dashboard
        </Link>
      </div>
    </div>
  );
}
