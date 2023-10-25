import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [], // Een array om de teamgegevens bij te houden
  },
  reducers: {
    addTeam: (state, action) => {
      // Actie om een nieuw team toe te voegen
      state.teams.push(action.payload);
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
