import { createSlice } from "@reduxjs/toolkit";

export const fetchScore = async (teamId) => {
  const response = await fetch(`http://localhost:3000/team/${teamId}`);
  const data = await response.json();
  return data;
}

const teamSlice = createSlice({
  name: "team",
  initialState: {
    id: "1",
    name: "teamA",
    score: 0,
  },
  reducers: {
    addTeam: (state, action) => {
      // Actie om team toe te voegen
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.score = action.payload.score;
    },
  },
  extraReducers: {
    // Extra reducers om de score op te halen
    [fetchScore.fulfilled]: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { addTeam } = teamSlice.actions;

export default teamSlice.reducer;
