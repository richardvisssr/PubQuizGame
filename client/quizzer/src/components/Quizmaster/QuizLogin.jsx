import React, { useState } from "react"; // Add the import statement for useEffect
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "../../reducers/quizmasterReducer";
import { useDispatch } from "react-redux";

function QuizLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code) {
      setError("Please enter a code.");
      return; // Prevent further execution
    }

    try {
      await fetch("/quizzes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, round: '1' }),
      });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error creating quiz:", error);
    }

    dispatch(fetchQuestions());

    navigate(`/setup/${code}/1`);

  };

  return (
    <Form
      title="Enter a pincode for the quiz:"
      buttonLabel="Submit"
      value={code}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}

export default QuizLogin;
