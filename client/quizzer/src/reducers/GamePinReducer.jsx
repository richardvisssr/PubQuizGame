import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGamePin = createAsyncThunk("gamePin/fetchGamePin", async () => {
  const response = await fetch("http://localhost:3000/quiz");
  const data = await response.json();
  return data;
});

const gamePinSlice = createSlice({
  name: "gamePin",
  initialState: {
    gamePin: "",
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

export default gamePinSlice.reducer;