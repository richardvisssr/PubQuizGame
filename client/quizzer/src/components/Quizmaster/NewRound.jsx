import React from "react";
import { QuestionSelect } from "./Approve";
import SubmitButton from "../SubmitButton";

const questions = [
  { id: 1, question: "What is the capital of France?" },
  { id: 2, question: "What is the largest planet in our solar system?" },
  { id: 3, question: "Who is the current president of the United States?" },
];

const handleSelectQuestion = (event) => {
  const selectedQuestionIds = Array.from(
    event.target.selectedOptions,
    (option) => option.value
  );
  const selectedQuestions = questions.filter((question) =>
    selectedQuestionIds.includes(question.id.toString())
  );
  setSelectedQuestions(selectedQuestions);
};

  
const handleStartGame = () => {
    // submit all information and start the game
  };

const NewRound = () => {
  return (
    <div>
      <QuestionSelect
        questions={questions}
        onSelectQuestion={handleSelectQuestion}
      />
      <SubmitButton label="Start Game" onClick={handleStartGame} />
    </div>
  );
};

export default NewRound;
