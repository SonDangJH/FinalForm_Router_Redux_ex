import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../../redux/questionSlice";
import { InputForm } from "./InputForm";
import { TextAreaForm } from "./TextAreaForm";
import { RadioComponent } from "./RadioComponent";
import { MetaError } from "./MetaError";
export default function AddQuestionForm() {
  const dispatch = useDispatch();

  const initialValues = {
    type: "text",
    correctAnswer: "A",
  };

  
  const onSubmit = (values, form) => {
    const {
      type,
      question,
      answerText,
      correctAnswer,
      choiceA,
      choiceB,
      choiceC,
      choiceD,
    } = values;
    const newQuestion = {
      id: new Date().getTime(),
      question: question,
      type: type,
    };
    if (type === "text") {
      newQuestion.answerText = answerText;
    } else {
      (newQuestion.correctAnswer = correctAnswer),
        (newQuestion.choices = [
          {
            key: "A",
            answer: choiceA,
          },
          {
            key: "B",
            answer: choiceB,
          },
          {
            key: "C",
            answer: choiceC,
          },
          {
            key: "D",
            answer: choiceD,
          },
        ]);
    }
    dispatch(addNewTodo(newQuestion));
    form.reset(initialValues); // this method will active validation
  };

  const required = (value) =>
    value ? undefined : "Please fill the information";

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-[500px]">
          <h2 className="font-medium text-xl text-emerald-500">
            Add question to the collection
          </h2>
          <InputForm
            name={"question"}
            validate={required}
            label={"Question"}
            placeholder={"Type your question ... "}
          />
          <Field name="type">
            {({ input, meta }) => (
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <label className="font-medium">Types</label>
                  <RadioComponent
                    label={"Text"}
                    input={input}
                    value={"text"}
                    checked={input.value === 'text' ? true: false}
                    defaultChecked={true}
                    
                  />
                  <RadioComponent
                    label={"Multiple choices"}
                    input={input}
                    value={"multi"}
                    checked={input.value === 'multi' ? true: false}
                    defaultChecked={false}
                  />
                </div>
                <MetaError error={meta.error} touched={meta.touched} />
              </div>
            )}
          </Field>
          {values.type === "text" && (
            <Field
              name="answerText"
              validate={required}
              component={TextAreaForm}
            ></Field>
          )}
          {values.type === "multi" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-blue-500 font-medium">Choices</h2>
              <InputForm
                name={"choiceA"}
                validate={required}
                label={"A"}
                placeholder={"Type your first choice ... "}
              />
              <InputForm
                name={"choiceB"}
                validate={required}
                label={"B"}
                placeholder={"Type your second choice ... "}
              />
              <InputForm
                name={"choiceC"}
                validate={required}
                label={"C"}
                placeholder={"Type your third choice ... "}
              />
              <InputForm
                name={"choiceD"}
                validate={required}
                label={"D"}
                placeholder={"Type your last choice ... "}
              />
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
