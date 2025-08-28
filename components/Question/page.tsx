import IQuestion from "../../types/Question/IQuestion";
import { SelectedOption } from "../../app/form/page";

interface QuestionProps {
  category: string;
  iconCategory: React.ReactNode;
  questionsByCategory: IQuestion[];
  selectedOptions: SelectedOption[];
  changeSelectedOption: (
    questionId: number,
    option: string,
    category: string,
    index: number
  ) => void;
}

export default function Question({
  category,
  iconCategory,
  questionsByCategory,
  selectedOptions,
  changeSelectedOption,
}: QuestionProps) {
  return (
    <div className="flex flex-col gap-10 w-11/12 bg-[#F8FAFC] p-10  border-l-4 rounded-lg border-[#1A56DB]">
      <div className="flex items-center gap-2">
        {iconCategory}
        <h3 className="text-[#1A56DB] text-2xl font-bold">{category}</h3>
      </div>

      {questionsByCategory.map((question) => (
        <div
          className="flex flex-col gap-5 w-full bg-white shadow-md items-start py-6 px-5 rounded-lg"
          key={question.id}
        >
          <p className="font-extrabold text-[#334155] text-lg">
            {question.id}. {question.question}
          </p>

          <div className="flex w-full self-center justify-between gap-6">
            {question.options.map((option: string, index: number) => (
              <div
                className="flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition-transform hover:bg-gray-100 p-4 rounded-lg w-full"
                key={index}
                onClick={() => {
                  changeSelectedOption(question.id, option, category, index);
                }}
              >
                <span
                  className={`border-2 border-gray-200 border-solid ${
                    selectedOptions.find(
                      (opt) => opt.questionId === question.id
                    )?.option === option
                      ? "bg-[#1A56DB] text-white"
                      : "bg-white text-gray-500"
                  } w-8 h-8 p-5 rounded-full flex items-center justify-center`}
                >
                  {index + 1}
                </span>
                <p
                  className={`text-md ${
                    selectedOptions.find(
                      (opt) => opt.questionId === question.id
                    )?.option === option
                      ? "text-[#1A56DB]"
                      : "text-gray-600"
                  }`}
                >
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
