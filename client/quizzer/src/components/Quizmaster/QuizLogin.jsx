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
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        // Redirect to next screen
        // window.location.href = '/quizmaster/dashboard';
      } else {
        setError("Invalid code");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred");
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
