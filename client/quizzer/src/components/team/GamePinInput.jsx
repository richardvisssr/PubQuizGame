import { useState } from "react";
import Form from "../Form";

const GamePinInput = () => {
  const [gamePin, setGamePin] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setGamePin(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your game pin submission logic here
  };

  return (
    <Form
      title="Please enter the game pin here:"
      buttonLabel="Join Game"
      value={gamePin}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};



export default GamePinInput;
