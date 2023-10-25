import React from "react";
import Header from "./Header";
import Answers from "./Answers";

import CountdownTimer from "./CountdownTimer";

export default function Quiz() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-3xl mb-4">
        <Header question="Example question" />
      </div>
      <div className="">
      <div className="mt-4">Given Answers: 5</div> 
        <CountdownTimer />  
      </div>
      <div className="container mx-auto mt-4">
        <Answers />
      </div>
    </div>
  );
}
