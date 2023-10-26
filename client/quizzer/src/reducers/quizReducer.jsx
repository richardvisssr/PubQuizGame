import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuizSlice = createSlice({
  name: "quiz",
  initialState: {
    id: "",
    rounds: [],
    questions: [],
  },
  reducers: {
  },
});

export const { addTeam, updateTeam, deleteTeam } = QuizSlice.actions;

export default QuizSlice.reducer;