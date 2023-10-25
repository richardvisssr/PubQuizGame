import React from "react";

export default function Header({ question }) {
  return (
    <div>
      <p className="text-3xl font-bold mt-4">{question}</p>
    </div>
  );
}
