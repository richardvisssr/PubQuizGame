import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const totalSeconds = 30;
  const [remainingTime, setRemainingTime] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      clearInterval(timer);
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
        ></div>
      </div>
    </div>
  );
}