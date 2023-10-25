import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
  name: "answers",
  initialState: {
    answers: [], // Een array om de antwoorden bij te houden
  },
  reducers: {
    submitAnswer: (state, action) => {
      // Actie om een antwoord in te dienen
      const newAnswer = {
        teamId: action.payload.teamId, // ID van het team dat het antwoord indient
        questionId: action.payload.questionId, // ID van de vraag waarop wordt geantwoord
        answerText: action.payload.answerText, // De tekst van het antwoord
      };
      state.answers.push(newAnswer);
    },
    clearAnswers: (state) => {
      // Actie om alle antwoorden te wissen (bijvoorbeeld voor de volgende vraag)
      state.answers = [];
    },
  },
});

export const { submitAnswer, clearAnswers } = answersSlice.actions;

export default answersSlice.reducer;
