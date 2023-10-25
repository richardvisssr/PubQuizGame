import React from "react";

export default function Answer({ color, text }) {
  return (
    <div className="p-4 border rounded-lg shadow-lg" style={{ backgroundColor: color }}>
      <p className="p-4 text-white">
        {text}
      </p>
    </div>
  );
}
