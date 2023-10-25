import React from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const WaitingScreen = ({ waiting }) => {
  const navigate = useNavigate();
  const questions = "5";

  const socket = new WebSocket("ws://localhost:3000"); // Vervang 'server-url' door de URL van je WebSocket-server

  socket.onmessage = (event) => {
    if (event.data === "gameStart") {
      // Hier kun je de navigatie activeren
      // Bijvoorbeeld, gebruik React Router om naar het volgende scherm te navigeren
      navigate("/questionScreen");
    } else if (event.data === "newQuestion") {
      // Hier kun je de navigatie activeren
      // Bijvoorbeeld, gebruik React Router om naar het volgende scherm te navigeren
      navigate("/questionScreen");
    }
  };

  const renderContent = () => {
    switch (waiting) {
      case "questions":
        return (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-10">
                {questions} questions good
              </h1>
              <ReactLoading
                type="spin"
                color="#00BFFF"
                height={50}
                width={50}
              />
              <p className="mt-10">Waiting for a new question</p>
            </div>
          </div>
        );

      case "game":
        return (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <ReactLoading
                type="spin"
                color="#00BFFF"
                height={50}
                width={50}
              />
              <p className="mt-10">Waiting for the game to start</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <p>Default content when none of the conditions match</p>
          </div>
        );
    }
  };

  return (
    <div className="waiting-screen flex items-center justify-center">
      {renderContent()}
    </div>
  );
};

export default WaitingScreen;
