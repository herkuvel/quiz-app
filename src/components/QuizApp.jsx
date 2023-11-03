import { useContext } from "react";
import QuizContext from "../context/quiz";

export default function QuizApp() {
  const {
    loading,
    question,
    paginate,
    lastQuestion,
    currentQuestion,
    handleSubmitQuiz,
    selectAnswer,
  } = useContext(QuizContext);

  return (
    <div className="quizApp">
      {loading ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <>
          {question ? (
            <>
              {question.map((q) => (
                <div className="question" key={q.id}>
                  <h3 className="question-text">{q.Text}</h3>
                  {q.Answers.map((a, i) => (
                    <button
                      className="answer"
                      onClick={selectAnswer}
                      value={a}
                      key={i}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              ))}
              {currentQuestion.id === lastQuestion.id ? (
                <button className="finishBtn" onClick={handleSubmitQuiz}>
                  Finish
                </button>
              ) : (
                <button onClick={paginate}>Next Question</button>
              )}
            </>
          ) : (
            <div>
              <h3>Something went wrong.</h3>
              <button>Back Home</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
