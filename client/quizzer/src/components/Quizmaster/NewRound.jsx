import React, { useState, useEffect } from "react";
import { QuestionSelect } from "./Approve";
import SubmitButton from "../SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedQuestionsReducer } from "../../reducers/roundReducer";

const NewRound = () => {
  const questions = useSelector(
    (state) => state.round.filterdQuestionsFromCategory
  );
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const { code } = useParams();
  const { roundNumber } = useParams();
  const [websocket, setWebsocket] = useState(null);
  const dispatch = useDispatch();

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Check the type of the message and process the updated teams
        if (data.type === "newTeamRegistered") {
          // Assuming the teams data is provided in the message
          const updatedTeams = data.teams; // Update the teams state with the new team data
          setTeams(updatedTeams);
        }
      };

      ws.onclose = () => {
        console.log(`WebSocket connection is closed!`);
      };

      setWebsocket(ws);
    }
  };

  useEffect(() => {
    initWebSocket();
  }, []);

  const handleSelectQuestion = (event) => {
    const selectedQuestionIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const selectedQuestions = questions.filter((question) =>
      selectedQuestionIds.includes(question.question)
    );
    setSelectedQuestions(selectedQuestions);
  };
  const handleStartGame = () => {
    if (websocket) {
      const message = {
        type: "startGame",
      };

      websocket.send(JSON.stringify(message));
    }
    fetch(`/quizzes/${code}/${roundNumber}`),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: selectedQuestions }),
      };
    dispatch(setSelectedQuestionsReducer(selectedQuestions)); // Now it should pass the entire question objects
    navigate(`/game/${code}/${roundNumber}`);
  };

  const handleRemoveQuiz = () => {
    fetch(`/quizzes/${code}`, {
      method: "DELETE",
    });
  };

  return (
    <div>
      <QuestionSelect
        questions={questions}
        onSelectQuestion={handleSelectQuestion}
      />
      <SubmitButton label="End Game" onClick={handleRemoveQuiz} />
      <SubmitButton label="Start Game" onClick={handleStartGame} />
    </div>
  );
};

export default NewRound;
