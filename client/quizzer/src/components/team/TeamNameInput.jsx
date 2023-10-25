import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeam } from "../../reducers/quizReducer";
import Form from "../Form";

const TeamNameInput = () => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const id = Math.floor(Math.random() * 1000000).toString();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Establish a WebSocket connection when the component mounts
    const ws = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const handleInputChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch the addTeam action to update the Redux state
    dispatch(addTeam({ id, name: teamName, score: 0 }));

    if (ws) {
      // Use the existing WebSocket connection to send the message
      const message = {
        type: "newTeamRegistered",
        data: { id, name: teamName, score: 0 },
      };
      ws.send(JSON.stringify(message));
    }

    // Navigate to the waiting screen
    navigate("/waitingScreen");
  };

  return (
    <Form
      title="Please enter your team name here:"
      buttonLabel="Next"
      value={teamName}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      error={error}
      required
    />
  );
};

export default TeamNameInput;
