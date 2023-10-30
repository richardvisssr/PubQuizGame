import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const round = useSelector((state) => state.round.roundNumber);
  const { code } = useParams();
  const selectedQuestions = useSelector((state) => state.round.selectedQuestions);

  const [websocket, setWebsocket] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  console.log(selectedQuestions);

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "newQuestion") {
          // Update de huidige vraagindex
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection is closed!");
      };

      setWebsocket(ws);
    }
  };

  useEffect(() => {
    initWebSocket();
  }, []);

  // Controleer of de huidige vraagindex binnen het bereik van de vragen ligt
  const currentQuestion =
    currentQuestionIndex < selectedQuestions.length
      ? selectedQuestions[currentQuestionIndex]
      : null;

  return (
    <div>
      {round <= 12 ? (
        <p className="text-3xl font-bold mt-4">
          Ronde {round}: {currentQuestion || "Wachten op de volgende vraag..."}
        </p>
      ) : (
        <p className="text-3xl font-bold mt-4">De quiz is afgelopen.</p>
      )}
    </div>
  );
}
