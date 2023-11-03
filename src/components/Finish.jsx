import { useContext } from "react";
import QuizContext from "../context/quiz";

function Finish() {
  const {
    correctAnswers,
    wrongAnswers,
    emptyAnswers,
    tryAgain,
    newPoint,
    saveScore,
  } = useContext(QuizContext);
  return (
    <div className="finish">
      <div className="results">
        <h2>Results</h2>
        <p>{correctAnswers} True</p>
        <p>{wrongAnswers} False</p>
        <p>{emptyAnswers} Empty</p>
        <p className="score">Score: {newPoint}</p>
      </div>
      <button className="saveBtn" onClick={saveScore}>Save Score</button>
      <button className="tryAgainBtn" onClick={tryAgain}>Try Again</button>
    </div>
  );
}

export default Finish;
