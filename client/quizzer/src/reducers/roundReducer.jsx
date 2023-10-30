import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const filterQuestionsOnCategory = (questions, categories) => {
  return questions.filter((question) => categories.includes(question.category));
};

export const fetchRound = createAsyncThunk("round/fetchRound", async () => {
  const response = await fetch(`http://localhost:3000/quiz/round`);
  const data = await response.json();
  return data;
});

export const fetchCurrentQuestionsNumber = createAsyncThunk(
  "round/fetchCurrentQuestionsNumber",
  async () => {
    const response = await fetch(`http://localhost:3000/quiz/round/questions`);
    const data = await response.json();
    return data;
  }
);

const roundSlice = createSlice({
  name: "round",
  initialState: {
    filterdQuestionsFromCategory: [],
    selectedQuestions: [],
    roundNumber: 1,
    questionNumber: 1,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.filterdQuestionsFromCategory = filterQuestionsOnCategory(
        action.payload.questions,
        action.payload.categories
      );
    },
    setSelectedQuestionsReducer: (state, action) => {
      state.selectedQuestions = action.payload;
    },
  },
  extraReducers: {
    [fetchRound.fulfilled]: (state, action) => {
      state.roundNumber = action.payload;
    },
    [fetchCurrentQuestionsNumber.fulfilled]: (state, action) => {
      state.questionNumber = action.payload;
    },
  },
});

export const { setQuestions, setSelectedQuestionsReducer } = roundSlice.actions;

export default roundSlice.reducer;
