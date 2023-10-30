import React, { useState, useEffect } from "react";
import SubmitButton from "../SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuestionsReducer } from "../../reducers/roundReducer";
import { useNavigate, useParams } from "react-router-dom";


// TeamList component
const TeamList = ({ teams, onRemoveTeam }) => (
  <div>
    <h2 className="m-5">Teams</h2>
    <ul className="space-y-5">
    {teams.map((team) => {
      console.log("Team Data:", team); // Add this line to log the team data

      return (
        <li key={team.teamId} className="m-5 flex items-center space-x-4 bg-green-500 p-3 rounded-full"        >
          <span className="text-white">Team Name: {team.name}</span>
          <button className="text-white bg-red-500 rounded-full p-2" onClick={() => onRemoveTeam(team.teamId)}>
            X
          </button>
        </li>
      );
    })}
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
          {question}
        </option>
      ))}
    </select>
  </div>
);

const Approve = () => {
  const [showTeams, setShowTeams] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [teams, setTeams] = useState([]); // Initialize teams as an empty array
  const [websocket, setWebsocket] = useState(null);
  const { code } = useParams();
  const { roundNumber } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questions = useSelector(
    (state) => state.round.filterdQuestionsFromCategory.map((item) => item.question)
  );

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Check the type of the message and process the updated teams
        if (data.type === "newTeam") {
          // Assuming the teams data is provided in the message
          const teamData = JSON.parse(data.message);
          setTeams((prevTeams) => [...prevTeams, teamData]);
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

  const handleRemoveTeam = (id) => {
    fetch(`/teams/${id}`, {
      method: "DELETE",
    });
  };

  const handleRemoveQuiz = () => {
    fetch(`/quizzes/${code}`, {
      method: "DELETE",
    });
  };

  const handleSelectQuestion = (event) => {
    // Haal de geselecteerde vraag-ID's op uit het geselecteerde opties-element
    const selectedQuestionIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
  
    // Filter de vragen op basis van de geselecteerde vraag-ID's
    const selectedQuestions = questions.filter((question) =>
      selectedQuestionIds.includes(question)
    );
  
    // Stel de geselecteerde vragen in als de nieuwe staat
    setSelectedQuestions(selectedQuestions);
  };
  

  const handleStartGame = () => {
    if (websocket) {
      const message = {
        type: "gameStart",
      };

      websocket.send(JSON.stringify(message));
    }
    fetch(`/quizzes/${code}/${roundNumber}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teams: teams, question: selectedQuestions }),
    };
    dispatch(setSelectedQuestionsReducer(selectedQuestions)); // Now it should pass the entire question objects
    navigate(`/game/${code}/${roundNumber}/1`);
    console.log(selectedQuestions);
  };

  return (
    <div>
      <SubmitButton label="Show Teams" onClick={() => setShowTeams(true)} />
      <SubmitButton
        label="Select Questions"
        onClick={() => setShowTeams(false)}
      />
      {showTeams ? (
        <TeamList teams={teams} onRemoveTeam={handleRemoveTeam} />
      ) : (
        <QuestionSelect
          questions={questions}
          onSelectQuestion={handleSelectQuestion}
        />
      )}
      <SubmitButton label="Delete Quiz" onClick={handleRemoveQuiz} />
      <SubmitButton label="Start Game" onClick={handleStartGame} />
    </div>
  );
};

export default Approve;
