// Form.js
import React from "react";
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";

const Form = ({ title, buttonLabel, value, onChange, onSubmit, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <h1 className="mb-10">{title}</h1>
      <TextInput value={value} onChange={onChange} placeholder={title} />
      <SubmitButton label={buttonLabel} />
      {error && <div>{error}</div>}
    </form>
  );
};

export default Form;
