import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import { submitAnswer } from "../../reducers/answerReducer";

const colors = ["green", "purple", "blue", "yellow"];

const QuestionAnswer = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [answer, setAnswer] = useState(null);
  const teamId = useSelector((state) => state.team.teams.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Establish a WebSocket connection when the component mounts
    const ws = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    // Handle messages received from the server
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "answerSubmitted") {
        console.log("Answer submitted:", message.data);
        // Handle the server's acknowledgment of the answer submission
        // You might want to update the UI or trigger further actions here
      }
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    setAnswer(selectedColor);
    // Dispatch the submitAnswer action here to update the Redux state
    dispatch(submitAnswer(teamId, answer));

    // Send a WebSocket message to notify the server that an answer has been submitted
    const ws = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL
    ws.onopen = () => {
      const message = {
        type: "submitAnswer",
        data: { teamId, answer },
      };
      ws.send(JSON.stringify(message));
    };

    // Navigate to the waiting screen
    navigate("/waitingScreenQuestion");
  };

  return (
    <div className="lg:w-3/4 lg:mx-auto">
      <div className="text-center">
        <h2 className="mt-4">Answer:</h2>
        <h1 className="mt-2 mb-2">{selectedColor}</h1>
        <h2 className="mb-4">Choose your answer:</h2>
      </div>
      <SubmitButton label={"Submit"} onClick={handleSubmit}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div
            key={color}
            className={`bg-${color}-500 h-24 lg:h-32 w-full md:w-1/2 lg:w-1/4 rounded-lg p-4 cursor-pointer`}
            onClick={() => handleColorSelection(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswer;
