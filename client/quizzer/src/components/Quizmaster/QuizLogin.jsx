import { useState } from "react";
import Form from "../Form";

function QuizLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (code === "123"){
      console.log("success");
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
};

export default QuizLogin;
