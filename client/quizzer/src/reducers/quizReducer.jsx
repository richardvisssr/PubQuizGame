import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGamePin = createAsyncThunk("quiz/fetchGamePin", async () => {
  const response = await fetch("http://localhost:3000/quiz");
  const data = await response.json();
  return data;
});

const QuizSlice = createSlice({
  name: "quiz",
  initialState: {
    gamePin: "",
    id: "",
    rounds: [],
    questions: [],
  },
  reducers: {},
  extraReducers: {
    [fetchGamePin.fulfilled]: (state, action) => {
      state.gamepin = action.payload;
    },
  },
});

export const { addTeam, updateTeam, deleteTeam } = QuizSlice.actions;

export default QuizSlice.reducer;
