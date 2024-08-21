import './App.css'
import AddQuestionPage from './containers/AddQuestionPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AnswerQuestionPage from './containers/AnswerQuestionPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddQuestionPage />,
  },
  {
    path: "/play/:index",
    element: <AnswerQuestionPage />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
