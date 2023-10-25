import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import { submitAnswer } from "../../reducers/answerReducer";

const colors = ["green", "purple", "blue", "yellow"];

const QuestionAnswer = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [answer, setAnswer] = useState(null);

  const teamId = useSelector((state) => state.team.teams.id);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    setAnswer(selectedColor);
    dispatch(submitAnswer(teamId, answer));
    navigate("/waitingScreen");
  };

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
