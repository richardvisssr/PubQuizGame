// Form.js
import React from "react";
import TextInput from "./TextInput";

const Form = ({ title, buttonLabel, value, onChange, onSubmit, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <h1 className="mb-10">{title}</h1>
      <TextInput value={value} onChange={onChange} placeholder={title} />
      <button
        type="submit"
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        {buttonLabel}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Form;
