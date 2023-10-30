import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentQuestionsNumber } from "../../reducers/roundReducer";


function Game() {
  const [acceptedAnswers, setAcceptedAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { code } = useParams();
  const questionNumber = useSelector((state) => state.round.questionNumber);
  // const { roundNumber } = useParams();
  const roundNumber = useSelector((state) => state.round.roundNumber);
  const [websocket, setWebsocket] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //////??????? ALS score === 1 DAN verhoog score van team met 1
  function handleAcceptAnswer(answer) {
    // Voeg het geaccepteerde antwoord toe aan de 'acceptedAnswers'
    setAcceptedAnswers((prevAnswers) => [...prevAnswers, answer]);
    
    // Leeg de antwoorden voor hetzelfde team
    setAnswers((prevAnswers) =>
      prevAnswers.filter((a) => a.teamId !== answer.teamId)
    );
  
    // Stuur een verzoek om de score van het team met 1 te verhogen
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
    dispatch(fetchCurrentQuestionsNumber());
  }, [navigate]);

  const handleSubmit = () => {
    if (websocket) {
      if (questionNumber <= 12) {
        // Stuur een PUT-verzoek om het volgende vraagnummer bij te werken
        fetch(`/quizzes/${code}/${roundNumber}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questionNumber: questionNumber + 1 }),
        });
  
        // Verstuur een WebSocket-bericht om een nieuwe vraag aan te kondigen
        const message = {
          type: "newQuestion",
        };
        websocket.send(JSON.stringify(message));
  
        // Navigeer naar de volgende vraag
        setAnswers([]);
        setAcceptedAnswers([]);
        navigate(`/game/${code}/${roundNumber}/${questionNumber}`);
      } else {
        // Stuur een WebSocket-bericht om een nieuwe ronde aan te kondigen
        const message = {
          type: "newRound",
        };
        websocket.send(JSON.stringify(message));
  
        // Stuur een PUT-verzoek om de ronde bij te werken
        fetch(`/quizzes`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, round: roundNumber + 1 }),
        })
          .then(() => {
            // Navigeer naar de volgende ronde-setup
            navigate(`/setup/${code}/${roundNumber}`);
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
