import { configureStore } from "@reduxjs/toolkit";
import gamePinReducer from "./reducers/GamePinReducer";

export default configureStore({
  reducer: {
    gamePin: gamePinReducer,
  },
});