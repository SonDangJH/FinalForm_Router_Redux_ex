import { createSlice } from '@reduxjs/toolkit'

// slice
export const questionSlice = createSlice({
  name: "questions",
  initialState: [
    {
      id: 1,
      question: "What color of the sky",
      type: "text",
      answerText: "Blue",
    },
    {
      id: 2,
      question: "What color of the sun",
      type: "multi",
      correctAnswer: "D",
      choices: [
        {
          key: "A",
          answer: "Yellow",
        },
        {
          key: "B",
          answer: "Orange",
        },
        {
          key: "C",
          answer: "Red",
        },
        {
          key: "D",
          answer: "All colors seem right",
        },
      ],
    },
  ],
  reducers: {
    addNewTodo: (state, action) => {
      const { payload } = action;
      state.push(payload);
    },
  },
});


// Action creators are generated for each case reducer function
export const { addNewTodo } = questionSlice.actions;

// export const { questionSelector } = questionSlice.selectors;
export const questionSelector = (state) => state.questions;

export const singleQuestionSelector = (state, index) => state.questions[index];

export const totalAmountQuestion = (state) => state.questions.length;

export default questionSlice.reducer