"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });
      setCandidates(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered =
    filter === "all"
      ? candidates
      : candidates.filter((c) => c.classification === filter);

  if (loading) return <p>Carregando...</p>;
  if (!candidates.length) return <p>Nenhum candidato avaliado ainda.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard de Candidatos</h2>

      <select
        className="mb-4 border p-2 rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="Fit Altíssimo">Fit Altíssimo</option>
        <option value="Fit Aprovado">Fit Aprovado</option>
        <option value="Fit Questionável">Fit Questionável</option>
        <option value="Fora do Perfil">Fora do Perfil</option>
      </select>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Classificação</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.total_score}</td>
              <td className="p-2 border">{c.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
