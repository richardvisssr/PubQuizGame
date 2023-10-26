import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    id: "",
    name: "",
    score: 0,
  },
  reducers: {
    addTeam: (state, action) => {
      // Actie om team toe te voegen
      state.id=action.payload.id;
      state.name=action.payload.name;
      state.score=action.payload.score; 
    },
    updateTeamScore: (state, action) => {
      // Actie om team scores bij te werken
      const { teamId, score } = action.payload;
      const teamToUpdate = state.teams.find((team) => team.id === teamId);
      if (teamToUpdate) {
        teamToUpdate.score = score;
      }
    },
  },
});

export const { addTeam, updateTeamScore } = teamSlice.actions;

export default teamSlice.reducer;
