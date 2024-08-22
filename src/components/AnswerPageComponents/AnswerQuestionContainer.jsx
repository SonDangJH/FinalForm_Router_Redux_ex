import { useSelector } from "react-redux";
import {
  totalAmountQuestion,
  singleQuestionSelector,
} from "../../redux/questionSlice";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Form, Field } from "react-final-form";
import { InputForm } from "../QuestionPageComponents/InputForm";

export default function AnswerQuestionContainer() {
  const [hasAnswered, setHasAnswer] = useState(false);
  const [result, setResult] = useState("");

  const { index } = useParams();
  const navigate = useNavigate();
  const questionAmount = useSelector(totalAmountQuestion);

  
  const indexPage = parseInt(index);
  const questionSelectKey = useMemo(
    () => singleQuestionSelector(indexPage),
    [indexPage]
  );
  const { question, type, answerText, correctAnswer, choices } =
    useSelector(questionSelectKey);


  const answerDivStyle = [
    "bg-[#ef476f] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-white font-medium p-3 w-full",
    "bg-[#ffd166] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-black font-medium p-3 w-full",
    "bg-[#06d6a0] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-black font-medium p-3 w-full",
    "bg-[#118ab2] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-white font-medium p-3 w-full",
  ];

  const required = (value) =>
    value ? undefined : "Please fill the information";

  const onSubmit = (values, form) => {
    if (hasAnswered) {
      toast.success(
        "You have answered the question with the answer is " + values.answer ||
          values.selectKey
      );
    } else {
      setHasAnswer(true);
      setResult(
        `Your answer is ${values.selectKey || values.answer}, the answer is ${
          correctAnswer || answerText
        }`
      );
      form.reset();
    }
  };

  const onNavigate = (navigateIndex) => {
    setHasAnswer(false);
    setResult("");
    navigate(`/play/${navigateIndex}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-[500px] h-[500px]">
      <Toaster />
      <div className="p-3 w-full rounded shadow text-start">{question}</div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
            {type === "text" && (
              <div className="flex flex-col gap-6">
                <InputForm
                  name={"answer"}
                  validate={required}
                  label={"Your answer:"}
                  placeholder={"Type your answer here ... "}
                />
                <button
                  type="submit"
                  className="py-2.5 px-5 mb-2 text-sm font-semibold text-purple-400 focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-purple-400 hover:bg-purple-400 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
                >
                  Submit
                </button>
              </div>
            )}
            {type === "multi" && (
              <div className="grid grid-cols-2 gap-3">
                {choices.map((choice, index) => (
                  <div
                    className={answerDivStyle[index]}
                    onClick={() => {
                      if (!hasAnswered) {
                        setHasAnswer(true);
                        values.selectKey = choice.key;
                        onSubmit(values, form);
                      }
                    }}
                  >
                    {choice.answer}
                  </div>
                ))}
              </div>
            )}
          </form>
        )}
      />

      {hasAnswered && (
        <div className="flex flex-col gap-3">
          <div className="text-blue-500 font-medium text-base flex flex-row gap-3">
            <span className="font-semibold text-black underline">
              {type === "text" ? "Answer text:" : "Answer key:"}
            </span>
            {type === "text" ? answerText : result}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {index !== "0" && (
              <button
                className="basis-[48%] py-2.5 px-5 mb-2 text-sm font-semibold text-[#ff9f1c] focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-[#ff9f1c] hover:bg-[#ff9f1c] hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
                onClick={() => {
                  onNavigate(parseInt(index) - 1);
                }}
              >
                Previous
              </button>
            )}
            {index !== (questionAmount - 1).toString() && (
              <button
                className="basis-[48%] py-2.5 px-5 mb-2 text-sm font-semibold text-[#2ec4b6] focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-[#2ec4b6] hover:bg-[#2ec4b6] hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
                onClick={() => {
                  onNavigate(parseInt(index) + 1);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
