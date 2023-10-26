import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducers/quizReducer";
import teamReducer from "./reducers/teamReducer";
import answerReducer from "./reducers/answerReducer";
import quizmasterReducer from "./reducers/quizmasterReducer";
import roundReducer from "./reducers/roundReducer";

export default configureStore({
  reducer: {
    quiz: quizReducer,
    team: teamReducer,
    answer: answerReducer,
    quizmaster: quizmasterReducer,
    round: roundReducer,
  },
});
