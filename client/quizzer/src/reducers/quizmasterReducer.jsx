import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPinCode = createAsyncThunk(
  "quizmaster/fetchPinCode",
  async () => {
    const response = await fetch("http://localhost:3000/quizmaster");
    const data = await response.json();
    return data;
  }
);

export const fetchQuestions = createAsyncThunk(
  "quizmaster/fetchQuestions",
  async () => {
    const response = await fetch("http://localhost:3000/questions");
    const data = await response.json();
    return data;
  }
);

const QuizmasterSlice = createSlice({
  name: "quizmaster",
  initialState: {
    pinCode: "123",
    showingQuestion: false,
    questions: [],
  },
  reducers: {
    showQuestion: (state, action) => {
      state.showingQuestion = true;
    },
    hideQuestion: (state, action) => {
      state.showingQuestion = false;
    },
  },
  extraReducers: {
    [fetchPinCode.fulfilled]: (state, action) => {
      state.gamepin = action.payload;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const {} = QuizmasterSlice.actions;

export default QuizmasterSlice.reducer;
