import React, { useState, useEffect } from "react";

export default function CountdownTimer({ time }) {
  const [remainingTime, setRemainingTime] = useState(time);

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

  return <div>{remainingTime} seconds left</div>;
}
