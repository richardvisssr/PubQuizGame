import React from "react";
import ReactLoading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchScore } from "../../reducers/teamReducer";

const WaitingScreen = ({ waiting }) => {
  const navigate = useNavigate();
  const score = useSelector((state) => state.team.score);
  const teamId = useSelector((state) => state.team.id);
  const [websocket, setWebsocket] = useState(null);
  const roundNumber = useSelector((state) => state.round.roundNumber);
  const { code } = useParams();

  const dispatch = useDispatch();

  const initWebSocket = () => {
    if (!websocket) {
      const ws = new WebSocket("ws://localhost:3000"); // Update with your server URL

      ws.onopen = () => {
        console.log("WebSocket connection is open!");
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        dispatch(fetchRound());

        if (message.type === "gameStart") {
          navigate(`/questionScreen/${code}/${roundNumber}`);
        } else if (message.type === "team-ack"){
          console.log(message.message);
        }
      };

      ws.onclose = () => {
        console.log(`WebSocket connection is closed!`);
      };

      setWebsocket(ws);
    }
  };

  // Initialize the WebSocket when the component mounts
  useEffect(() => {
    // dispatch(fetchScore(teamId));
    initWebSocket();

     // Add a timer for questions if waiting for questions
     if (waiting === "questions") {
      // Set a timer for 10 seconds
      const timer = setTimeout(() => {
        // Navigate to the next screen after the timer expires
        navigate(`/questionScreen/${code}/${roundNumber}`);
      }, 10000); // 10,000 milliseconds = 10 seconds

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  const renderContent = () => {
    switch (waiting) {
      case "questions":
        return (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-10">
                {score} questions good
              </h1>
              <ReactLoading
                type="spin"
                color="#00BFFF"
                height={50}
                width={50}
              />
              <p className="mt-10">Waiting for a new question</p>
            </div>
          </div>
        );

      case "game":
        return (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <ReactLoading
                type="spin"
                color="#00BFFF"
                height={50}
                width={50}
              />
              <p className="mt-10">Waiting for the game to start</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <p>Default content when none of the conditions match</p>
          </div>
        );
    }
  };

  return (
    <div className="waiting-screen flex items-center justify-center">
      {renderContent()}
    </div>
  );
};

export default WaitingScreen;
