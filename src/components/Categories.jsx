import { useContext } from "react";
import QuizContext from "../context/quiz";

function Categories() {
  const { selectCategory } = useContext(QuizContext);
  return (
    <div>
      <h2>Select Category</h2>
      <div className="categoryButtons">
        <button value="general" onClick={selectCategory}>
          General
        </button>
        <button value="history" onClick={selectCategory}>
          History
        </button>
        <button value="art" onClick={selectCategory}>
          Art
        </button>
      </div>
    </div>
  );
}

export default Categories;
