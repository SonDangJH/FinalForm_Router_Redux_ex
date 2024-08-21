import { useSelector, } from 'react-redux'
import { totalAmountQuestion, singleQuestionSelector } from '../../redux/questionSlice'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function AnswerQuestionContainer() {
  const [ hasAnswered, setHasAnswer ] = useState(false);
  const [ result, setResult ] = useState("");
  const [ inputController, setInputController ] = useState("");

  const { index } = useParams();
  const navigate = useNavigate();
  const questionAmount = useSelector(totalAmountQuestion);
  const { question, type, answerText, correctAnswer,choices } = useSelector(state => singleQuestionSelector(state, parseInt(index)));
  const answerDivStyle = [
   "bg-[#ef476f] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-white font-medium p-3 w-full",
   "bg-[#ffd166] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-black font-medium p-3 w-full",
   "bg-[#06d6a0] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-black font-medium p-3 w-full",
   "bg-[#118ab2] rounded shadow transition ease-in-out duration-300 hover:scale-[1.03] text-white font-medium p-3 w-full"
  ]
  return (
    <div className="flex flex-col gap-4 w-full md:w-[500px] h-[500px]">
      <Toaster/>
      <div className="p-3 w-full rounded shadow text-start">{question}</div>
      {type === "text" && (
        <div class="mb-4">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
          >
            Your answer:
          </label>
          <input
            type="text"
            placeholder="Type your answer here..."
            value={inputController}
            onChange={(e)=>{
              setInputController(e.target.value);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      )}
      {type === "multi" && (
        <div className="grid grid-cols-2 gap-3">
          {
            choices.map((choice, index) => (
          <div
            className={answerDivStyle[index]}
            onClick={() => {
              if (!hasAnswered) {
                setHasAnswer(true);
                setResult(
                  `The answer key is ${correctAnswer}, choosing ${choice.key} is ${
                    choice.key === correctAnswer ? "correct" : "incorrect"
                  }`
                );
              }
            }}
          >
            {choice.answer}
          </div>
            ))
          }
        </div>
      )}
      {type === "text" && (
        <button
          className="py-2.5 px-5 mb-2 text-sm font-semibold text-emerald-400 focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-emerald-400 hover:bg-emerald-400 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
          onClick={() => {
            if (!inputController) {
              toast.error("Please type your answer")
            }
            else {
              setHasAnswer(true);
            }
          }}
        >
          Submit
        </button>
      )}
      {hasAnswered && (
        <div className="flex flex-col gap-3">
          <div className="text-blue-500 font-medium text-base flex flex-row gap-3">
            <span className="font-semibold text-black underline">
              {type === "text" ? "Answer text:" : "Answer key:"}
            </span>
            {type === "text" ? answerText : result}
          </div>
          <div className='flex flex-wrap justify-center gap-2'>
          {
            index !== "0" && <button
            className="basis-[48%] py-2.5 px-5 mb-2 text-sm font-semibold text-[#ff9f1c] focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-[#ff9f1c] hover:bg-[#ff9f1c] hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
            onClick={() => {
              setHasAnswer(false);
              setResult("")
              setInputController("")
              navigate(`/play/${parseInt(index)-1}`);
            }}
          >
            Previous
          </button>
          }
        {
          index !== (questionAmount -1 ).toString() && <button
          className="basis-[48%] py-2.5 px-5 mb-2 text-sm font-semibold text-[#2ec4b6] focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-[#2ec4b6] hover:bg-[#2ec4b6] hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
          onClick={() => {
            setHasAnswer(false);
            setResult("")
            setInputController("")
            navigate(`/play/${parseInt(index)+1}`);
          }}
        >
          Next
        </button>
        }
          </div>
        </div>
      )}
    </div>
  );
}