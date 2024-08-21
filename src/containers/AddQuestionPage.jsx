import AddQuestionForm from "../components/QuestionPageComponents/AddQuestionForm";
import QuestionContainer from "../components/QuestionPageComponents/QuestionContainer";

export default function AddQuestionPage() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AddQuestionForm />
      <QuestionContainer />
    </div>
  );
}