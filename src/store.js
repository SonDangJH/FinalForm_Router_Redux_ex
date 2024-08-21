import { configureStore } from '@reduxjs/toolkit'
import questionReducer from './redux/questionSlice'

export default configureStore({
  reducer: {
    questions: questionReducer,
  },
})