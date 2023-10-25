import React from "react";

const SelectInput = ({ id, value, onChange, options }) => {
  return (
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      value={value}
      onChange={onChange}
    >
      <option value="">--Please choose a category--</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
