import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeam } from "../../reducers/quizReducer";
import Form from "../Form";

const TeamNameInput = ({ gamePinFromRedux }) => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const id = Math.floor(Math.random() * 1000000).toString();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTeam({ id, name: teamName, score: 0 }));
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
    />
  );
};

export default TeamNameInput;
