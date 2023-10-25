import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const QuizSlice = createSlice({
  name: "quiz",
  initialState: {
    gamePin: "123",
    id: "",
    teams: [],
    rounds: [],
    questions: [],
  },
  reducers: {
    addTeam: (state, action) => {
      state.teams = [...state.teams, action.payload];
    },
    updateTeam: (state, action) => {
      state.teams = state.teams.map((team) => {
        if (team.id === action.payload.id) {
          return {
            ...team,
            name: action.payload.name,
            score: action.payload.score,
          };
        }
        return team;
      });
    },
    deleteTeam: (state, action) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
    },
  },
});

export const { addTeam, updateTeam, deleteTeam } = QuizSlice.actions;

export default QuizSlice.reducer;