import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../../redux/questionSlice'

export default function AddQuestionForm() {
  const dispatch = useDispatch();
  const onSubmit = (values, form) => {
    const { type, question, answerText, correctAnswer, choiceA, choiceB, choiceC, choiceD } = values;
    dispatch(addNewTodo(type === 'text' ?
      {
        id: new Date().getTime(),
        question: question,
        type: type,
        answerText: answerText,
      } : 
      {
        id: new Date().getTime(),
        question: question,
        type: type,
        correctAnswer: correctAnswer,
        choices: [
          {
            key: 'A',
            answer: choiceA
          },
          {
            key: 'B',
            answer: choiceB
          },
          {
            key: 'C',
            answer: choiceC
          },
          {
            key: 'D',
            answer: choiceD
          }
        ]
      }
    ))
    // form.reset({ keepValues: true }); // this method will active validation
    values.question = "";
    values.answerText = "";
    values.correctAnswer = 'A';
    values.choiceA = "";
    values.choiceB = "";
    values.choiceC = "";
    values.choiceD = "";
  }

  const validate = values => {
    const errors = {};
    const { question, type, answerText, choiceA, choiceB, choiceC, choiceD } = values;
    if (!question) {
      errors.question = 'Please type question information'
    }
    if (type === 'text' && !answerText) {
      errors.answerText = 'Please type the correct answer'
    }
    else if (type === 'multi') {
      if (!choiceA || !choiceB || !choiceC || !choiceD) {
        errors.choiceD = 'Please type all the answers'
      }
    }
    return errors;
  }

  const initialValues = {
    type: 'text',
    correctAnswer: 'A'
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 w-full"
        >
          <h2 className="font-medium text-xl text-emerald-500">
            Add question to the collection
          </h2>
          <Field name="question">
            {({ input, meta }) => (
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3 justify-center items-center">
                  <label className="font-medium">Question</label>
                  <input
                    {...input}
                    type="text"
                    placeholder="Type your question ..."
                    className="border-1 border-black rounded p-3 shadow text-base w-full"
                  />
                </div>
                {meta.error && meta.touched && (
                  <span className="text-red-400 text-sm font-medium">
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <Field name="type">
            {({ input, meta }) => (
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <label className="font-medium">Types</label>
                  <div className="flex flex-row gap-3">
                    <label className="font-medium">Text</label>
                    <input
                      {...input}
                      type="radio"
                      value={"text"}
                      defaultChecked
                    />
                  </div>
                  <div className="flex flex-row gap-3">
                    <label className="font-medium">Multiple choices</label>
                    <input {...input} type="radio" value={"multi"} />
                  </div>
                </div>
                {meta.error && meta.touched && (
                  <span className="text-red-400 text-sm font-medium">
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          {values.type === "text" && (
            <Field name="answerText">
              {({ input, meta }) => (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3">
                    <label className="font-medium">Answer</label>
                    <textarea
                      {...input}
                      placeholder="Type your answer ..."
                      rows="13"
                      cols="50"
                      style={{ resize: "none" }}
                      className="border-1 border-black rounded p-3 shadow text-base w-full"
                    />
                  </div>
                  {meta.error && meta.touched && (
                    <span className="text-red-400 text-sm font-medium">
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>
          )}
          {values.type === "multi" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-blue-500 font-medium">Choices</h2>
              <Field name="choiceA">
                {({ input }) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <label className="font-medium w-fit">A</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Type your first choice ..."
                        className="border-1 border-black rounded p-3 shadow text-base w-full"
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name="choiceB">
                {({ input }) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <label className="font-medium w-fit">B</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Type your second choice ..."
                        className="border-1 border-black rounded p-3 shadow text-base w-full"
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name="choiceC">
                {({ input }) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <label className="font-medium w-fit">C</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Type your third choice ..."
                        className="border-1 border-black rounded p-3 shadow text-base w-full"
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name="choiceD">
                {({ input, meta }) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <label className="font-medium w-fit">D</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Type your last choice ..."
                        className="border-1 border-black rounded p-3 shadow text-base w-full"
                      />
                    </div>
                    {meta.error && meta.touched && (
                      <span className="text-red-400 text-sm font-medium">
                        {meta.error}
                      </span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="correctAnswer">
                {({ input }) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <label className="font-medium w-fit">Key:</label>
                      <select
                        {...input}
                        placeholder="Select key"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                  </div>
                )}
              </Field>
            </div>
          )}
          <button
            type="submit"
            className="py-2.5 px-5 mb-2 text-sm font-semibold text-emerald-400 focus:outline-none bg-transparent rounded-lg border border-[1.5px] border-emerald-400 hover:bg-emerald-400 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100"
          >
            Submit
          </button>
        </form>
      )}
    />
  );
}