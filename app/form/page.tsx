"use client";

import { JSX, useState } from "react";

import Question from "../../components/Question/page";
import { questions } from "../../constants/questions";
import Logo from "../../components/Logo/page";
import { BatteryCharging, ChartLine, Medal, UsersRound } from "lucide-react";
import { fits } from "../../constants/fits";
import { calculateTotalScore } from "@/utils/calculateScore";
import { createClient } from "@/lib/browser-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export type Category = "Performance" | "Energia" | "Cultura";
export interface SelectedOption {
  questionId: number;
  option: string;
  category: string;
  index: number;
}

export default function FormPage() {
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Performance");
  const router = useRouter();

  const percentageByCategory = (category: Category) => {
    const selected = getSelectedOptionsByCategory(category).length;
    const total = getQuestionsByCategory(category).length;
    return total > 0 ? (selected / total) * 100 : 0;
  };

  const categories: Category[] = Array.from(
    new Set(
      questions.map((question) => question.category)
    ) as unknown as Category[]
  );

  const categoryIcons: Record<Category, JSX.Element> = {
    Performance: <ChartLine color="#1A56DB" strokeWidth={3} />,
    Energia: <BatteryCharging color="#1A56DB" strokeWidth={3} />,
    Cultura: <UsersRound color="#1A56DB" strokeWidth={3} />,
  };

  const changeSelectedOption = (
    questionId: number,
    option: string,
    category: string,
    index: number
  ) => {
    setSelectedOptions((prev) => {
      const existing = prev.find((opt) => opt.questionId === questionId);
      if (existing) {
        if (existing.option === option) {
          return prev.filter((opt) => opt.questionId !== questionId);
        }
        return prev.map((opt) =>
          opt.questionId === questionId
            ? { questionId, option, category, index }
            : opt
        );
      }
      return [...prev, { questionId, option, category, index }];
    });
  };

  const getQuestionsByCategory = (category: string) => {
    return questions.filter((question) => question.category === category);
  };

  const getSelectedOptionsByCategory = (category: string) => {
    return selectedOptions.filter((opt) => opt.category === category);
  };

  const calculateFitByTotalScore = (totalScore: number) => {
    if (totalScore >= 80) return "Fit Altíssimo";
    if (totalScore >= 60) return "Fit Aprovado";
    if (totalScore >= 40) return "Fit Questionável";
    return "Fora do Perfil";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const totalScore = calculateTotalScore(selectedOptions);

    // const supabase = createClient();

    // await supabase.from("candidates").insert({
    //   name: "name",
    //   email: "email@example.com",
    //   total_score: totalScore,
    //   classification: calculateFitByTotalScore(totalScore),
    // });

    const dataToSend = {
      name: "Fulano da Silva",
      email: "fulano@example.com",
      answers: selectedOptions.map((opt) => opt.index),
      meta: {
        source: "mini-fitscore-frontend",
        candidateId: null,
      },
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_N8N_URL}/fitscore-candidato`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_N8N_API_KEY}`,
        },
        body: JSON.stringify(dataToSend),
      }
    );

    if (!response.ok) {
      toast.error("Erro ao avaliar candidato.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/dashboard");
    toast.success(
      `Candidato avaliado! \n
      Classificação: ${calculateFitByTotalScore(totalScore)}`
    );
  };

  return (
    <div className="flex flex-col items-center bg-white w-4/5 gap-3 shadow-md">
      <div className="flex flex-col items-center gap-3 pt-6 pb-3 px-12">
        <Logo />
        <p className="w-3/5 text-center text-[#64748b] text-lg">
          Avaliação de candidatos baseada em três pilares fundamentais: Cultura,
          Performance e Comportamento. Este algoritmo ajuda a identificar os
          candidatos que melhor se alinham aos valores e necessidades da LEGAL.
        </p>
      </div>

      <div className="flex flex-col w-11/12 bg-[#F0F9FF] p-6 rounded-lg gap-3">
        <div className="flex gap-2">
          <Medal color="#0369A1" strokeWidth={2} />
          <h3 className=" text-[#0369A1] font-semibold text-xl">
            Sistema de Classificação FitScore
          </h3>
        </div>

        <div className="flex w-full justify-between gap-3">
          {fits.map((fit) => (
            <div
              className={`flex flex-col p-4  rounded-lg w-1/4 `}
              style={{
                backgroundColor: fit.color,
                color: fit.textColor,
              }}
              key={fit.label}
            >
              <p className="font-semibold">{fit.label}</p>
              <p className="text-[#967F8B]">{">"} 80 pontos</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="w-11/12 my-6 border-t border-gray-300 " />

      <div className="flex items-center justify-between w-full px-8">
        {categories.map((category, index) => (
          <>
            <div key={category}>
              <div className="flex flex-col items-center gap-3" key={category}>
                <span
                  className={`${
                    category === selectedCategory ||
                    getSelectedOptionsByCategory(category).length ===
                      getQuestionsByCategory(category).length
                      ? "bg-[#1A56DB]"
                      : "bg-gray-200"
                  } w-8 h-8 rounded-full flex items-center justify-center text-white z-10`}
                >
                  {index + 1}
                </span>

                <p className="text-[#64748b] text-md">{category}</p>
              </div>
            </div>

            {index < categories.length - 1 && (
              <div
                className="bg-gray-200 h-1 mb-6 w-full -ms-[28px] -me-6"
                id={category}
              >
                <div
                  className={`bg-[#1A56DB] h-full`}
                  style={{
                    width: `${percentageByCategory(category)}%`,
                  }}
                />
              </div>
            )}
          </>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center gap-16 mt-5"
      >
        {
          <Question
            key={selectedCategory}
            category={selectedCategory}
            iconCategory={categoryIcons[selectedCategory]}
            questionsByCategory={getQuestionsByCategory(selectedCategory)}
            selectedOptions={selectedOptions}
            changeSelectedOption={changeSelectedOption}
          />
        }

        {selectedOptions.length === questions.length ? (
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1A56DB] text-white w-48 h-12 rounded align-self-center mb-10 hover:bg-blue-700 transition-colors"
          >
            {loading ? "Calculando..." : "Calcular FitScore"}
          </button>
        ) : (
          <div className="flex gap-5">
            <button
              type="button"
              disabled={
                categories.findIndex((cat) => cat === selectedCategory) === 0
              }
              onClick={() =>
                setSelectedCategory(
                  categories[
                    categories.findIndex((cat) => cat === selectedCategory) - 1
                  ]
                )
              }
              className="bg-[#1A56DB] text-white w-48 h-12 rounded align-self-center mb-10 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Voltar
            </button>

            <button
              type="button"
              disabled={
                categories.findIndex((cat) => cat === selectedCategory) ===
                categories.length - 1
              }
              onClick={() =>
                setSelectedCategory(
                  categories[
                    categories.findIndex((cat) => cat === selectedCategory) + 1
                  ]
                )
              }
              className="bg-[#1A56DB] text-white w-48 h-12 rounded align-self-center mb-10 hover:bg-blue-700 transition-colors disabled:opacity-50 "
            >
              Avançar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
