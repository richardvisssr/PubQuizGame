import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGamePin = createAsyncThunk("quiz/fetchGamePin", async () => {
  const response = await fetch("http://localhost:3000/quiz");
  const data = await response.json();
  return data;
});

const QuizSlice = createSlice({
  name: "quiz",
  initialState: {
    gamePins: ["123"],
    id: "",
    rounds: [],
    questions: [],
  },
  reducers: {},
  extraReducers: {
    [fetchGamePin.fulfilled]: (state, action) => {
      state.gamePins.push(action.payload);
    },
  },
});

export const { } = QuizSlice.actions;

export default QuizSlice.reducer;
