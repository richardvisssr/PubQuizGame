import React from "react";

const SubmitButton = ({ label, onClick }) => {
  return (
    <button
      className={`mt-10 mb-10 ${
        label === "Submit" ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-green-700"
      } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
