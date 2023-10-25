import { useState, useEffect } from "react";
import Form from "../Form";
import { useNavigate } from "react-router-dom";

const GamePinInput = () => {
  const [gamePin, setGamePin] = useState("");
  const [error, setError] = useState("");
  const [ws, setWs] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setGamePin(event.target.value);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000"); // Vervang 'server-url' door de juiste URL van je WebSocket-server

    socket.onopen = () => {
      setWs(socket); // Sla de WebSocket-verbinding op in de state
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "gamePinResult") {
        if (message.isValid) {
          // De game-pin is geldig; je kunt naar '/team-name-input' navigeren
          navigate("/team-name-input");
        } else {
          setError("Incorrect game pin");
        }
      }
    };
    
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the game pin matches what was entered
    if (ws) {
      ws.send(JSON.stringify({ type: "checkGamePin", gamePin })); // Stuur een bericht naar de server om de game-pin te controleren
    } else {
      setError("Incorrect game pin");
    }
  };

  return (
    <Form
      title="Please enter the game pin here:"
      buttonLabel="Next"
      value={gamePin}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default GamePinInput;
