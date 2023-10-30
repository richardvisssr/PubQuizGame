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
import NewRound from "../components/Quizmaster/NewRound";
import Game from "../components/Quizmaster/Game";

const Router = () => {

  return (
    <Routes>
      <Route path="/quizmaster" element={<QuizLogin />} />
      <Route path="/setup/:code/:roundNumber" element={<ChooseCategory />} />
      <Route path="/choose-questions/:code/:roundNumber" element={<Approve />} />
      <Route path="/game/:code/:roundNumber/:questionNumber" element={<Game />} />
      <Route path="/newRound/:code/:roundNumber" element={<NewRound />} />
      <Route path="/team" element={<GamePinInput />} />
      <Route path="/team-name-input/:code" element={<TeamNameInput />} />
      <Route path="/waitingScreen/:code" element={<WaitingScreen waiting={"game"} />}/>
      <Route path="/questionScreen/:code/:roundNumber" element={<QuestionAnswer />}/>
      <Route path="/waitingScreenQuestion/:code/:roundNumber" element={<WaitingScreen waiting={"questions"} />}/>
    </Routes>
  );
};

export default Router;
