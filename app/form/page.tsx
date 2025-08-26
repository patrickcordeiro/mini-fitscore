"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const questions = [
    { id: "exp", label: "Experiência", block: "performance" },
    { id: "entregas", label: "Entregas", block: "performance" },
    { id: "habilidades", label: "Habilidades", block: "performance" },
    { id: "disponibilidade", label: "Disponibilidade", block: "energia" },
    { id: "prazos", label: "Cumprimento de prazos", block: "energia" },
    { id: "pressao", label: "Trabalho sob pressão", block: "energia" },
    { id: "valores", label: "Alinhamento com valores", block: "cultura" },
    { id: "etica", label: "Ética profissional", block: "cultura" },
    { id: "colaboracao", label: "Colaboração", block: "cultura" },
    { id: "adaptabilidade", label: "Adaptabilidade", block: "cultura" },
  ];

  function getClassification(total: number) {
    if (total >= 80) return "Fit Altíssimo";
    if (total >= 60) return "Fit Aprovado";
    if (total >= 40) return "Fit Questionável";
    return "Fora do Perfil";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const classification = getClassification(total);

    await supabase.from("candidates").insert({
      name,
      email,
      total_score: total,
      classification,
    });

    setLoading(false);
    alert(`Candidato avaliado! Classificação: ${classification}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Formulário FitScore</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />

      {questions.map((q) => (
        <div key={q.id} className="flex flex-col">
          <label className="font-medium">{q.label}</label>
          <select
            required
            value={scores[q.id] || ""}
            onChange={(e) =>
              setScores({ ...scores, [q.id]: parseInt(e.target.value) })
            }
            className="border p-2 rounded"
          >
            <option value="">Selecione</option>
            {[10, 20, 30, 40, 50].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Enviando..." : "Enviar Avaliação"}
      </button>
    </form>
  );
}
