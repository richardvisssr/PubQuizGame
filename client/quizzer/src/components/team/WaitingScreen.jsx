import React from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WaitingScreen = ({ waiting }) => {
  const navigate = useNavigate();
  const score = useSelector((state) => state.quiz.score);

  const socket = new WebSocket("ws://localhost:3000"); // Vervang 'server-url' door de URL van je WebSocket-server

  useEffect(() => {
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        handleWebSocketMessage(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    if (message.type === "gameStart") {
      navigate("/questionScreen");
    } else if (message.type === "newQuestion") {
      navigate("/questionScreen");
    }
    // Add more cases for other message types you expect
  };

  const renderContent = () => {
    switch (waiting) {
      case "questions":
        return (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-10">
                {score} questions good
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
