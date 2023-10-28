import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
  name: "answer",
  initialState: [],
  reducers: {
    submitAnswer: (state, action) => {
      state.push(action.payload);
    },
    clearAnswers: (state) => {
      state.length = 0; // Clear the answers by resetting the array
    },
  },
});

export const { submitAnswer, clearAnswers } = answersSlice.actions;

export default answersSlice.reducer;
