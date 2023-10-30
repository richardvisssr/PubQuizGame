import React, { useState, useEffect } from "react";
import SubmitButton from "../SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuestionsReducer } from "../../reducers/roundReducer";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionSelect } from "./Approve";

const Approve = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [websocket, setWebsocket] = useState(null);
  const { code } = useParams();
  const { roundNumber } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questions = useSelector((state) =>
    state.round.filterdQuestionsFromCategory.map((item) => item.question)
  );

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
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

  const handleRemoveQuiz = () => {
    fetch(`/quizzes/${code}`, {
      method: "DELETE",
    });
  };

  const handleSelectQuestion = (event) => {
    // Haal de geselecteerde vraag-ID's op uit het geselecteerde opties-element
    const selectedQuestionIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    // Filter de vragen op basis van de geselecteerde vraag-ID's
    const selectedQuestions = questions.filter((question) =>
      selectedQuestionIds.includes(question)
    );

    // Stel de geselecteerde vragen in als de nieuwe staat
    setSelectedQuestions(selectedQuestions);
  };

  const handleStartGame = () => {
    if (websocket) {
      const message = {
        type: "gameStart",
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
    navigate(`/game/${code}/${roundNumber}/1`);
    console.log(selectedQuestions);
  };

  return (
    <div>
      <QuestionSelect
        questions={questions}
        onSelectQuestion={handleSelectQuestion}
      />

      <SubmitButton label="Delete Quiz" onClick={handleRemoveQuiz} />
      <SubmitButton label="Start Game" onClick={handleStartGame} />
    </div>
  );
};

export default Approve;
