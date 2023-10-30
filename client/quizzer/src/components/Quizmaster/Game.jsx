import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SubmitButton from "../SubmitButton";

function Game() {
  const [acceptedAnswers, setAcceptedAnswers] = useState([]);
  const [answers, setAnswers] = useState([
    {
      teamId: 1,
      answer: "Dummy Answer 1",
      teamName: "Team A",
    },
    {
      teamId: 1,
      answer: "Dummy Answer 1",
      teamName: "Team A",
    },
    {
      teamId: 2,
      answer: "Dummy Answer 2",
      teamName: "Team B",
    },
    // Voeg meer dummy antwoorden toe zoals hierboven
  ]);
  const { code } = useParams();
  const { questionNumber } = useParams();
  let { roundNumber } = useParams();
  const [websocket, setWebsocket] = useState(null);

  const navigate = useNavigate();
  //////??????? ALS score === 1 DAN verhoog score van team met 1
  function handleAcceptAnswer(answer) {
    setAcceptedAnswers((prevAnswers) => [...prevAnswers, answer]);
    fetch(`/team/${answer.teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: 1 }),
    });
  }

  function handleRejectAnswer(answer) {
    // In dit voorbeeld doen we niets met verworpen antwoorden, maar je kunt hier je eigen logica toevoegen
  }

  const removeOldAnswersForTeam = (teamId) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.teamId !== teamId)
    );
  };

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Vervang dit door de juiste WebSocket URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "answer-ack":
            const newAnswer = JSON.parse(message.message);
            if (answers.some((answer) => answer.teamId === newAnswer.teamId)) {
              // Als hetzelfde team al een antwoord heeft ingediend, verwijder het oude antwoord
              removeOldAnswersForTeam(newAnswer.teamId);
            }
            setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
            break;

          default:
            break;
        }

        ws.onclose = () => {
          console.log("WebSocket connection is closed!");
        };

        setWebsocket(ws);
      };
    }
  };

  useEffect(() => {
    initWebSocket();
  }, []);

  const handleSubmit = () => {
    if (websocket) {
      if (questionNumber <= 12) {
        const nextQuestionNumber = questionNumber + 1;
        const message = {
          type: "newQuestion",
        };

        navigate(`/game/${code}/${roundNumber}/${nextQuestionNumber}`);
      } else {
        const message = {
          type: "newRound",
        };
        websocket.send(JSON.stringify(message));
        const nextRoundNumber = roundNumber + 1;
        fetch(`/quizzes`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, round: nextRoundNumber }),
        })
          .then(() => {
            navigate(`/setup/${code}/${nextRoundNumber}`);
          })
          .catch((error) => {
            console.error("Error updating round:", error);
          });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Answers submitted by teams:</h2>
      <ul className="space-y-4">
        {answers.map((answer) => (
          <li
            key={answer.teamId}
            className="flex text-black items-center justify-between bg-gray-100 p-3 rounded-lg"
          >
            <div>
              {answer.answer} - submitted by {answer.teamName}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleAcceptAnswer(answer)}
                className="bg-green-500 rounded-lg px-3 py-1"
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectAnswer(answer)}
                className="bg-red-500 rounded-lg px-3 py-1"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">Accepted answers:</h2>
      <ul className="space-y-4">
        {acceptedAnswers.map((answer) => (
          <li
            key={answer.teamId}
            className=" text-black bg-green-100 p-3 rounded-lg"
          >
            {answer.answer} - submitted by {answer.teamName}
          </li>
        ))}
      </ul>
      <SubmitButton label="Next Question" onClick={handleSubmit} />
    </div>
  );
}

export default Game;
