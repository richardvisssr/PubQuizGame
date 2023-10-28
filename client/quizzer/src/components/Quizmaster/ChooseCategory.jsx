import React, { useState, useEffect } from "react";
import SubmitButton from "../SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../reducers/roundReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestions } from "../../reducers/quizmasterReducer";

const ChooseCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState([]); // Geselecteerde categorieën als een array
  const [error, setError] = useState("");
  const questions = useSelector((state) => state.quizmaster.questions);
  const categories = [
    ...new Set(questions.map((question) => question.category)),
  ];
  const { code } = useParams();
  const { roundNumber } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const handleCategoryChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCategories(selected.slice(0, 3)); // Maximaal drie categorieën selecteren
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (selectedCategories.length < 3) {
    //   setError("Please select at least three categories.");
    // } else {
    dispatch(setQuestions({ questions, categories: selectedCategories }));

    navigate(`/choose-questions/${code}/${roundNumber}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-10">Choose up to 3 categories:</h1>
      <select
        id="category-select"
        value={selectedCategories} // De geselecteerde categorieën worden bijgehouden in een array
        onChange={handleCategoryChange}
        multiple
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <SubmitButton label={"Submit"} />
    </form>
  );
};

export default ChooseCategory;
