import React from "react";
import ReactLoading from "react-loading";

const WaitingScreen = ({ waiting }) => {
  const questions = "5";
//   const questions = useSelector((state) => state.questions);

  return (
    <div className="waiting-screen flex items-center justify-center">
      {waiting === "questions" ? (
        <div className="text-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-10">
              {questions} questions good
            </h1>
            <ReactLoading type="spin" color="#00BFFF" height={50} width={50} />
            <p className="mt-10">Waiting for a new question</p>
          </div>
        </div>
      ) : waiting === "game" ? (
        <div className="text-center">
          <div className="flex flex-col items-center justify-center">
            <ReactLoading type="spin" color="#00BFFF" height={50} width={50} />
            <p className="mt-10">Waiting for the game to start</p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Default content when none of the conditions match</p>
        </div>
      )}
    </div>
  );
};

export default WaitingScreen;
