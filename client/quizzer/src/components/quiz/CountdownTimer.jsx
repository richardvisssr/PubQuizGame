import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CountdownTimer() {
  const navigate = useNavigate();
  const totalSeconds = 60;
  const [remainingTime, setRemainingTime] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      clearInterval(timer);

      navigate("/leaderboard/1");
    }

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  const progressBarWidth = ((totalSeconds - remainingTime) / totalSeconds) * 100;

  return (
    <div>
      <p>{remainingTime} seconds left</p>
      <div className="relative h-2 bg-green-500 mt-2">
        <div
          className="absolute h-full bg-green-700"
          style={{ width: `${progressBarWidth}%`, right: "0" }}
        >
        </div>
      </div>
    </div>
  );
}
