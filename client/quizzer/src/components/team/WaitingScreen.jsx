import React from "react";
import ReactLoading from "react-loading";

const WaitingScreen = ({ waiting }) => {
  const questions = "5";

  const renderContent = () => {
    switch (waiting) {
      case "questions":
        return (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-10">
                {questions} questions good
              </h1>
              <ReactLoading type="spin" color="#00BFFF" height={50} width={50} />
              <p className="mt-10">Waiting for a new question</p>
            </div>
          </div>
        );

      case "game":
        return (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <ReactLoading type="spin" color="#00BFFF" height={50} width={50} />
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

  return <div className="waiting-screen flex items-center justify-center">{renderContent()}</div>;
};

export default WaitingScreen;
