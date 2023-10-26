import React, { useState } from "react"; // Add the import statement for useEffect
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import { fetchPinCode, fetchQuestions } from "../../reducers/quizmasterReducer";
import { useSelector, useDispatch } from "react-redux";

function QuizLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const pinCodeFromRedux = useSelector((state) => state.quizmaster.pinCode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(fetchPinCode());

    if (pinCodeFromRedux === code) {
      dispatch(fetchQuestions());

      navigate("/setup");
    } else {
      setError("Incorrect game pin");
    }
  };

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
