import React, { useState, useEffect } from "react";
import Header from "./Header";
import Answers from "./Answers";
import CountdownTimer from "./CountdownTimer";

export default function Quiz() {
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [websocket, setWebsocket] = useState(null);

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received:", data.type);

        if (data.type === "answer-ack") {
          setTotalAnswers((prevTotal) => prevTotal + 1);
        }
      };

      ws.onclose = (event) => {
        console.log(`WebSocket connection is closed! Code: ${event.code}, Clean: ${event.wasClean}`);
      };

      setWebsocket(ws);
    }
  };

  // Initialize the WebSocket when the component mounts
  useEffect(() => {
    initWebSocket();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-3xl mb-4">
        <Header question="Example question" />
      </div>
      <div className="">
        <div className="mt-4">
          Given Answers: {totalAnswers}
        </div> 
        <CountdownTimer />  
      </div>
      <div className="container mx-auto mt-4">
        <Answers />
      </div>
    </div>
  );
}
