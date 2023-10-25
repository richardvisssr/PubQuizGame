// router/router.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizLogin from "../components/Quizmaster/QuizLogin";
import GamePinInput from "../components/Team/GamePinInput";

const Router = () => {
  return (
    <Routes>
      <Route path="/quizmaster" element={<QuizLogin />} />
      <Route path="/team" element={<GamePinInput />} />
      {/* Define other routes here */}
    </Routes>
  );
};

export default Router;
