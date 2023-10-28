import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTeam } from "../../reducers/teamReducer";
import Form from "../Form";

const TeamNameInput = () => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const [websocket, setWebsocket] = useState(null);
  const { code } = useParams();
  const id = Math.floor(Math.random() * 1000000).toString();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

          // Listen for messages from the server
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "team-ack") {
          dispatch(addTeam({ id, name: teamName, score: 0 }));
          navigate(`/waitingScreen/${code}`);
        }
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

  const handleInputChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (websocket) {
      // Use the existing WebSocket connection to send the message
      const message = {
        type: "newTeamRegistered",
        data: { id, name: teamName, score: 0 },
      };
      websocket.send(JSON.stringify(message));
    }
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
