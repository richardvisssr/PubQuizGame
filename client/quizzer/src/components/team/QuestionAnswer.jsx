import React, { useState, useEffect } from "react";
import SubmitButton from "../SubmitButton";

const colors = ["green", "purple", "blue", "yellow"];

const QuestionAnswer = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [websocket, setWebsocket] = useState(null);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    if (websocket){
      websocket.send(JSON.stringify({ type: "answer", message: selectedColor }))
      setAnswer(selectedColor);
    }
  };

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received:", data.type);
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
