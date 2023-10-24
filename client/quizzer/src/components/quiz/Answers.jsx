import React from "react";
import Answer from "./Answer";

export default function Answers() {
  const answers = [
    { color: "#9756e2", text: "Answer 1" },
    { color: "#56b1e2", text: "Answer 2" },
    { color: "#82e256", text: "Answer 3" },
    { color: "#dbe256", text: "Answer 4" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {answers.map((answer, index) => (
        <Answer key={index} {...answer} />
      ))}
    </div>
  );
}
