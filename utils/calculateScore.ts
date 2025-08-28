import { SelectedOption } from "@/app/form/page";

function calculateScoreByQuestion(value: number) {
  // linear: 1=>0, 2=>2.5, 3=>5, 4=>7.5, 5=>10
  return (value - 1) * 2.5;
}

export function calculateTotalScore(questions: SelectedOption[]) {
  return questions.reduce((acc: number, curr) => {
    const score = calculateScoreByQuestion(curr.index + 1);
    return Math.ceil(acc + score);
  }, 0);
}
