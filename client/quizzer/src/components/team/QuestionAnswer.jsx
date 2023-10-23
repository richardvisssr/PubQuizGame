import React, { useState } from "react";

const QuestionAnswer = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [answer, setAnswer] = useState(null);
  const question = "This is the question text.";

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    switch (selectedColor) {
      case "red":
        setAnswer("Incorrect");
        break;
      case "green":
        setAnswer("Correct");
        break;
      case "blue":
        setAnswer("Incorrect");
        break;
      case "yellow":
        setAnswer("Incorrect");
        break;
      default:
        setAnswer(null);
    }
  };

  return (
    <div className="lg:w-3/4 lg:mx-auto">
      <div className="text-center">
        <h2 className="mt-4">Answer:</h2>
        <h1 className="mt-2 mb-2">{selectedColor}</h1>
        <h2 className="mb-4">Choose your answer:</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["green", "purple", "blue", "yellow"].map((color) => (
          <div
            key={color}
            className={`bg-${color}-500 h-24 lg:h-32 w-full md:w-1/2 lg:w-1/4 rounded-lg p-4 cursor-pointer`}
            onClick={() => handleColorSelection(color)}
          ></div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit</button>
      {answer && (
        <div className="text-center">
          <h2>Answer:</h2>
          <p>{answer}</p>
          <div
            style={{ backgroundColor: selectedColor }}
            className="h-12 lg:h-16 w-1/2 lg:w-1/4 mx-auto mt-4 rounded-lg"
          ></div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;
