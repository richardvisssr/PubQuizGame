import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducers/quizReducer";
import teamReducer from "./reducers/teamReducer";
import answerReducer from "./reducers/answerReducer";

export default configureStore({
  reducer: {
    quiz: quizReducer,
    team: teamReducer,
    answer: answerReducer,
  },
});
