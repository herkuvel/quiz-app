import { useContext, useEffect } from "react";
import QuizContext from "../context/quiz";

function Scoreboard() {
  const {
    loading,
    getAllScores,
    tryAgain,
    selectScoreboardCategory,
    categoryFilter,
    category,
    allScores,
  } = useContext(QuizContext);

  useEffect(() => {
    getAllScores();
  }, []);

  return (
    <div>
      <div>
        <h3>Scoreboard</h3>
        <button
          className="scoreboardCategory"
          value="all"
          onClick={selectScoreboardCategory}
          autoFocus
        >
          All
        </button>
        <button
          className="scoreboardCategory"
          value="general"
          onClick={selectScoreboardCategory}
        >
          General
        </button>
        <button
          className="scoreboardCategory"
          value="history"
          onClick={selectScoreboardCategory}
        >
          History
        </button>
        <button
          className="scoreboardCategory"
          value="art"
          onClick={selectScoreboardCategory}
        >
          Art
        </button>
        {loading ? (
          <>
            <h3>Loading...</h3>
          </>
        ) : (
          <ul className="scoreList">
            {category === "all" ? (
              <>
                {allScores.map((score) => (
                  <div key={score.id}>
                    {score.username} : {score.point} Puan
                  </div>
                ))}
              </>
            ) : (
              <>
                {categoryFilter.map((score) => (
                  <div key={score.id}>
                    {score.username} : {score.point} Puan
                  </div>
                ))}
              </>
            )}
          </ul>
        )}
        <button className="scoreboardBtn" onClick={tryAgain}>
          Back Home
        </button>
      </div>
    </div>
  );
}

export default Scoreboard;
