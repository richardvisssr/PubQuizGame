import React from "react";

export default function Answer({ color, text }) {
  return (
    <div style={{ backgroundColor: color }}>
      <p>{text}</p>
    </div>
  );
}
