import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { submitAnswer } from "../../reducers/answerReducer";
import Form from "../Form";

const QuestionAnswer = () => {
  const [answer, setAnswer] = useState(""); // Use an empty string as the initial state for the answer
  const teamId = useSelector((state) => state.team.id);
  const teamName = useSelector((state) => state.team.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(""); // Define an error state
  const [websocket, setWebsocket] = useState(null);
  const { code } = useParams();
  const { roundNumber } = useParams();

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      // Handle messages received from the server
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "timerDone":
            // Wanneer de timer klaar is, stuur een antwoord naar de server
            const submitMessage = {
              type: "submitAnswer",
              data: { teamId, teamName, answer },
            };
            websocket.send(JSON.stringify(submitMessage));
            navigate(`/waitingScreenQuestion/${code}/${roundNumber}`);
            break;

          // Voeg hier extra gevallen toe om andere soorten berichten te verwerken

          default:
            // Handel onbekende berichten af of voer andere relevante logica uit
            break;
        }
      };

      ws.onclose = () => {
        console.log(`WebSocket connection is closed! Code`);
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
    } else {
      websocket.send(
        JSON.stringify({
          type: "submitAnswer",
          data: { teamId, teamName, answer },
        })
      );

      setAnswer(answer);

      // Dispatch the submitAnswer action here to update the Redux state
      dispatch(submitAnswer({ teamId, teamName, answer })); // Pass an object with teamId and answer
    }
  };

  // Initialize the WebSocket when the component mounts
  useEffect(() => {
    initWebSocket();
  }, []);

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
