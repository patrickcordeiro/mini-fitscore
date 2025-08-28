"use client";

import { useEffect, useState } from "react";

import Logo from "../../components/Logo/page";
import NavBarItem from "../../components/NavBarItem/page";
import { links } from "../../constants/links";
import Table from "../../components/Table/page";
import { createClient } from "@/lib/browser-client";
import ICandidate from "@/types/Candidate/ICandidate";

export default function DashboardPage() {
  const [candidatesList, setCandidatesList] = useState<ICandidate[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      setLoading(true);

      const supabase = createClient();

      const { data, error: errorSupabase } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

      if (errorSupabase) {
        setError(true);
        setLoading(false);
        return;
      }

      if (filter === "all") {
        setCandidatesList(data);
      } else {
        const filtered = data.filter(
          (candidate) => calculateFit(candidate.total_score) === filter
        );
        setCandidatesList(filtered);
      }

      setLoading(false);
    }
    load();
  }, [filter]);

  const calculateFit = (totalFit: number) => {
    if (totalFit >= 80) return "Fit Altíssimo";
    if (totalFit >= 60) return "Fit Aprovado";
    if (totalFit >= 40) return "Fit Questionável";
    return "Fora do Perfil";
  };

  return (
    <div className="flex flex-col w-4/5 gap-10 mb-20">
      {/* Header */}
      <div className="flex w-full items-center justify-between rounded-b-lg p-6 bg-white shadow-md">
        <Logo fontSize="text-2xl" />

        <nav className="">
          <ul className="flex gap-4">
            {links.map((link) => (
              <NavBarItem
                key={link.title}
                href={link.href}
                title={link.title}
              />
            ))}
          </ul>
        </nav>
      </div>

      {/* Filtros */}
      <div className="flex flex-col w-full items-start gap-5 rounded-lg p-6 bg-white shadow-md">
        <h3 className="text-black font-bold text-xl">
          Filtrar por classificação
        </h3>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all" ? "bg-[#1A56DB] text-white" : "bg-gray-200"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("Fit Altíssimo")}
            className={`px-4 py-2 rounded-md ${
              filter === "Fit Altíssimo"
                ? "bg-[#1A56DB] text-white"
                : "bg-gray-200"
            }`}
          >
            Fit Altíssimo {"(> 80)"}
          </button>

          <button
            onClick={() => setFilter("Fit Aprovado")}
            className={`px-4 py-2 rounded-md ${
              filter === "Fit Aprovado"
                ? "bg-[#1A56DB] text-white"
                : "bg-gray-200"
            }`}
          >
            Fit Aprovado {"(60-79)"}
          </button>

          <button
            onClick={() => setFilter("Fit Questionável")}
            className={`px-4 py-2 rounded-md ${
              filter === "Fit Questionável"
                ? "bg-[#1A56DB] text-white"
                : "bg-gray-200"
            }`}
          >
            Fit Questionável {"(40-59)"}
          </button>

          <button
            onClick={() => setFilter("Fora do Perfil")}
            className={`px-4 py-2 rounded-md ${
              filter === "Fora do Perfil"
                ? "bg-[#1A56DB] text-white"
                : "bg-gray-200"
            }`}
          >
            Fora do Perfil {"(< 40)"}
          </button>
        </div>
      </div>

      {/* Lista de Candidatos */}
      <Table
        filtered={candidatesList}
        calculateFit={calculateFit}
        loading={loading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
