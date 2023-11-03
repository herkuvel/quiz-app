import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizContext from "../context/quiz";

function Start() {
  const { getQuestions, loading } = useContext(QuizContext);

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <>
          <Link to="/quizapp">
            <button className="startBtn">Start</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Start;
