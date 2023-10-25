import React, { useState, useEffect } from "react"; // Add the import statement for useEffect
import Form from "../Form";

function QuizLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [websocket, setWebsocket] = useState(null);

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (websocket) {
      websocket.send(JSON.stringify({ type: "pincode", message: code }));
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
        console.log("Received:", data.message);
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
    <Form
      title="Code:"
      buttonLabel="Submit"
      value={code}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}

export default QuizLogin;
