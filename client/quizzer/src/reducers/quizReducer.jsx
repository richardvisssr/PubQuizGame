import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGamePin = createAsyncThunk("quiz/fetchGamePin", async () => {
  const response = await fetch("http://localhost:3000/quiz");
  const data = await response.json();
  return data;
});

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
  extraReducers(builder) {
    builder
      .addCase(fetchGamePin.fulfilled, (state, action) => {
        state.gamePin = Object.values(action.payload);
      })
      .addCase(fetchGamePin.rejected, (state, action) => {
        console.log("rejected", action.error);
      })
      .addCase(fetchGamePin.pending, (state, action) => {
        console.log("pending");
      });
  },
});

export const { addTeam, updateTeam, deleteTeam } = QuizSlice.actions;

export default QuizSlice.reducer;