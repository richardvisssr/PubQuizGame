// router/router.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizLogin from "../components/Quizmaster/QuizLogin";
import GamePinInput from "../components/Team/GamePinInput";
import Quiz from "../components/quiz/Quiz";
import Leaderboard from "../components/quiz/Leaderboard";
import QuestionAnswer from "../components/team/QuestionAnswer";

const Router = () => {
  const teams = [
    { name: 'Team A', score: 100 },
    { name: 'Team B', score: 80 },
    { name: 'Team C', score: 120 },
    { name: 'Team D', score: 90 },
    { name: 'Team E', score: 110 },
  ];
  return (
    <Routes>
      <Route path="/quizmaster" element={<QuizLogin />} />
      <Route path="/team" element={<GamePinInput />} />
      <Route path="/team/:id" element={<QuestionAnswer />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/leaderboard/:id" element={<Leaderboard teams={teams}/>} />
    </Routes>
  );
};

export default Router;
