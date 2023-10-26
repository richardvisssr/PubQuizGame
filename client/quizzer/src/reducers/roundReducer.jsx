import { createSlice } from "@reduxjs/toolkit";

export const filterQuestionsOnCategory = (questions, categories) => {
  return questions.filter((question) => categories.includes(question.category));
};

const roundSlice = createSlice({
  name: "round",
  initialState: {
    filterdQuestionsFromCategory: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.filterdQuestionsFromCategory = filterQuestionsOnCategory(
        action.payload.questions,
        action.payload.categories
      );
    },
  },
});

export const { setQuestions } = roundSlice.actions;

export default roundSlice.reducer;
