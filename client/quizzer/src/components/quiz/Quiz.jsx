import React from "react";
import Header from "./Header"; // Import the Header component
import Answer from "./Answer"; // Import the Answer component

export default function Quiz() {
  return (
    <div>
      <Header question="Question" timer={30} />
      <Answer color="#4dcf0f" text="Answer 1" />
      <Answer color="#bf6dff" text="Answer 2" />
      <Answer color="#3bd6f8" text="Answer 3" />
      <Answer color="#fbff3d" text="Answer 4" />
    </div>
  );
}
