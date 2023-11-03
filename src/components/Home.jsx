import { useContext } from "react";
import { Link } from "react-router-dom";
import QuizContext from "../context/quiz";

function Home() {
  const { name, handleNameChange, handleSubmitLogin, resetAnswers } =
    useContext(QuizContext);

  return (
    <div className="home">
      <h2>Welcome to Quiz App</h2>
      <form className="loginForm" onSubmit={handleSubmitLogin}>
        <div className="loginName">
          <label className="name-label">Your name:</label>
          <input
            className="name-input"
            value={name}
            onChange={handleNameChange}
            type="text"
            required
          />
        </div>
        <button className="submitBtn" onClick={resetAnswers}>Lets Go</button>
      </form>
      <Link to="/scoreboard">
        <button className="scoreboardBtn">Show Scoreboard</button>
      </Link>
    </div>
  );
}

export default Home;
