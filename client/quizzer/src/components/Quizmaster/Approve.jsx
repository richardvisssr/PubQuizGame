import React, { useState } from "react";
import SubmitButton from "../SubmitButton";

// TeamList component
const TeamList = ({ teams, onRemoveTeam }) => (
  <div>
    <h2 className="m-5">Teams</h2>
    <ul className="space-y-5">
  {teams.map((team) => (
    <li key={team.id} className="m-5flex items-center space-x-4 bg-green-500 p-3 rounded-full">
      <span className="text-white">{team.name}</span>
      <button
        className="text-white bg-red-500 rounded-full p-2"
        onClick={() => onRemoveTeam(team.id)}
      >
        X
      </button>
    </li>
  ))}
</ul>

  </div>
);

// QuestionSelect component
export const QuestionSelect = ({ questions, onSelectQuestion }) => (
<div className="mt-5">
  <h2 className="text-lg font-bold mb-2">Select Questions</h2>
  <select
    multiple
    onChange={onSelectQuestion}
    className="w-full border border-gray-300 rounded p-2 text-gray-800 bg-white focus:outline-none focus:ring focus:border-blue-500"
  >
    {questions.map((question) => (
      <option
        key={question.id}
        value={question.id}
        className="text-gray-800 hover:bg-blue-100"
      >
        {question.question}
      </option>
    ))}
  </select>
</div>

);

const Approve = () => {
    const [showTeams, setShowTeams] = useState(true);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
  
    const teams = [
      { id: 1, name: "Team A" },
      { id: 2, name: "Team B" },
      { id: 3, name: "Team C" },
    ];
  
    const questions = [
      { id: 1, question: "What is the capital of France?" },
      { id: 2, question: "What is the largest planet in our solar system?" },
      { id: 3, question: "What is the smallest country in the world?" },
      { id: 4, question: "What is the highest mountain in the world?" },
    ];
  
    const handleRemoveTeam = (id) => {
      const updatedTeams = teams.filter((team) => team.id !== id);
      // update teams state with updatedTeams
    };
  
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
  
    return (
      <div>
        <SubmitButton label="Show Teams" onClick={() => setShowTeams(true)} />
        <SubmitButton label="Select Questions" onClick={() => setShowTeams(false)} />
        {showTeams ? (
          <TeamList teams={teams} onRemoveTeam={handleRemoveTeam} />
        ) : (
          <QuestionSelect
            questions={questions}
            onSelectQuestion={handleSelectQuestion}
          />
        )}
        <SubmitButton label="Go back" onClick={() => console.log("Go back")} />
        <SubmitButton label="Start Game" onClick={handleStartGame} />
      </div>
    );
  };
  

export default Approve;
