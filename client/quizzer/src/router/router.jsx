// router/router.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizLogin from "../components/Quizmaster/QuizLogin";
import GamePinInput from "../components/Team/GamePinInput";
import TeamNameInput from "../components/team/TeamNameInput";
import WaitingScreen from "../components/team/WaitingScreen";
import QuestionAnswer from "../components/team/QuestionAnswer";
import ChooseCategory from "../components/Quizmaster/ChooseCategory";
import Approve from "../components/Quizmaster/Approve";

const Router = () => {
  return (
    <Routes>
      <Route path="/quizmaster" element={<QuizLogin />} />
      <Route path="/setup" element={<ChooseCategory />} />
      <Route path="/choose-questions" element={<Approve />} />
      <Route path="/team" element={<GamePinInput />} />
      <Route path="/team-name-input" element={<TeamNameInput />} />
      <Route path="/waitingScreen" element={<WaitingScreen waiting={"game"} />}/>
      <Route path="/questionScreen" element={<QuestionAnswer />}/>
      <Route path="/waitingScreenQuestion" element={<WaitingScreen waiting={"questions"} />}/>
    </Routes>
  );
};

export default Router;
