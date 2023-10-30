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

        if (message.type === "gameStart" || message.type === "newQuestion") {
          navigate(`/questionScreen/${code}/${roundNumber}`);
        } else if( message.type === "newQuestion"){
          navigate(`/questionScreen/${code}/${roundNumber}`);
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
