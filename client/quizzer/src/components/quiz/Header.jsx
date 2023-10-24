import React from "react";
import CountdownTimer from "./CountdownTimer";

export default function Header({ question, timer }) {
  return (
    <div>
      <p>{question}</p>
      <CountdownTimer time={timer}/>
    </div>
  );
}
