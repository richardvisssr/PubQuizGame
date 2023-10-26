import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitAnswer } from "../../reducers/answerReducer";
import Form from "../Form";

const QuestionAnswer = () => {
  const [answer, setAnswer] = useState(""); // Use an empty string as the initial state for the answer
  const teamId = useSelector((state) => state.team.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(""); // Define an error state
  const [websocket, setWebsocket] = useState(null);

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
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

      ws.onclose = () => {
        console.log(
          `WebSocket connection is closed! Code`
        );
      };

      setWebsocket(ws);
    }
  };

  useEffect(() => {
    initWebSocket();
  }, []);

  const handleInputChange = (event) => {
    setAnswer(event.target.value); // Update the answer state with the input value
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (answer.trim() === "") {
      setError("Answer cannot be empty"); // Set an error message if the answer is empty
      return;
    }
    console.log("Submitting answer:", answer);

    // Dispatch the submitAnswer action here to update the Redux state
    dispatch(submitAnswer({ teamId, answer })); // Pass an object with teamId and answer

    // Send a WebSocket message to notify the server that an answer has been submitted
    if (websocket) {
      const message = {
        type: "submitAnswer",
        data: { teamId, answer },
      };
      websocket.send(JSON.stringify(message));
    }

    // Navigate to the waiting screen
    navigate("/waitingScreenQuestion");
  };

  return (
    <Form
      title="Please enter your answer here:"
      buttonLabel="Submit"
      value={answer}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      error={error}
      required
    />
  );
};

export default QuestionAnswer;
