import { useSelector } from "react-redux";
import { questionSelector } from "../../redux/questionSlice";
import { useNavigate } from "react-router-dom";
export default function QuestionContainer() {
  const questions = useSelector(questionSelector);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3.5 w-full justify-between">
      <h2 className="font-medium text-xl text-blue-500">Question collection</h2>
      <div className="flex flex-col gap-3 lg:h-[540px] w-full overflow-y-scroll">
        {questions.map((question) => (
          <div
            key={question.id}
            className="w-full p-3 shadow rounded flex flex-row gap-3 transition ease-in-out duration-300 hover:scale-[1.03]"
          >
            <span className="font-semibold text-sm w-[150px] text-start">
              {question.type === "text" ? "Text" : "Multiple choice"}
            </span>
            <span
              className="text-ellipsis overflow-hidden w-[270px] text-start"
              style={{ maxLines: 1 }}
            >
              {question.question}
            </span>
          </div>
        ))}
      </div>
      <button
        className="py-2.5 px-5 mb-2 text-sm font-semibold text-blue-400 focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-blue-400 hover:bg-blue-400 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
        onClick={() => {
          navigate("/play/0");
        }}
      >
        Go play
      </button>
    </div>
  );
}
