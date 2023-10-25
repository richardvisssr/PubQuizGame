import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import SelectInput from "../SelectInput";

const ChooseCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [
    "history",
    "geography",
    "science",
    "music",
    "movies",
    "sports",
    "literature",
    "art",
    "food",
    "animals",
    "language",
    "miscellaneous",
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedCategory);
  };

  return (
    <form onSubmit={handleSubmit}>
     <h1 className="mb-10">Choose a category:</h1>
     <SelectInput
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={categories}
      />
     <SubmitButton label={"Submit"}/>
    </form>
  );
};

export default ChooseCategory;
