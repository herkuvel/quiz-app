import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import PropTypes from "prop-types";

const QuizContext = createContext();

function Provider({ children }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Questions

  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("all");

  const getQuestions = () => {
    const q = query(
      collection(db, "questions"),
      where("Categories", "array-contains", category)
    );

    getDocs(q)
      .then((snap) => {
        if (snap.empty) {
          console.log("Bir hata oluştu.");
          setLoading(true);
        } else {
          let results = [];
          snap.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          const shuffle = (array) => {
            return array.sort(() => Math.random() - 0.5);
          };

          const newQuestions = shuffle(results);

          setQuestions(newQuestions);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  // Questions Filter

  const filteredQuestion = questions.slice(0, 10);

  // Categories

  const selectCategory = (e) => {
    setCategory(e.target.value);
    navigate("/start");
  };

  //   Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(1);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

  const question = filteredQuestion.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const lastQuestion = filteredQuestion[filteredQuestion.length - 1];
  const currentQuestion = filteredQuestion[currentPage - 1];

  const paginate = () => {
    isAnswerCorrect();
    setAnswer("");
    setCurrentPage(currentPage + 1);
  };

  // Answer

  const [answer, setAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [emptyAnswers, setEmptyAnswers] = useState(0);

  const selectAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const isAnswerCorrect = () => {
    if (currentQuestion.TrueAnswer === answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else if (answer === "") {
      setEmptyAnswers(emptyAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  // Finish Quiz

  const handleSubmitQuiz = () => {
    isAnswerCorrect();
    setAnswer("");
    setCurrentPage(1);
    navigate("/finish");
  };

  const saveScore = () => {
    addNewScore();
    setCategory("all");
    navigate("/scoreboard");
  };

  const resetAnswers = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setEmptyAnswers(0);
  };

  const tryAgain = () => {
    resetAnswers();
    setCategory("all");
    setName("");
    navigate("/");
  };

  // Name

  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Login

  const handleSubmitLogin = () => {
    navigate("/categories");
  };

  // Scoreboard

  const [scores, setScores] = useState([]);

  const newPoint = correctAnswers * 10;

  const getAllScores = () => {
    const s = query(collection(db, "userResults"));

    getDocs(s)
      .then((snap) => {
        if (snap.empty) {
          console.log("Bir hata oluştu.");
          setLoading(true);
        } else {
          let results = [];
          snap.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          const r = results.sort((a, b) => (a.point > b.point ? -1 : 1));
          r.sort((a, b) => {
            if (a.point === b.point) {
              return a.point - b.point;
            }
          });
          setScores(r);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  const addNewScore = () => {
    const ref = collection(db, "userResults");
    addDoc(ref, {
      username: name,
      point: newPoint,
      category: category,
    });
  };

  // Scoreboard Category Filter

  const categoryFilter = scores
    .filter((score) => score.category === category)
    .slice(0, 10);
  const allScores = scores.slice(0, 10);

  const selectScoreboardCategory = (e) => {
    setCategory(e.target.value);
  };

  const values = {
    loading,
    getQuestions,
    questions,
    selectCategory,
    category,
    paginate,
    question,
    questionsPerPage,
    handleNameChange,
    name,
    lastQuestion,
    currentQuestion,
    handleSubmitLogin,
    handleSubmitQuiz,
    selectAnswer,
    answer,
    correctAnswers,
    wrongAnswers,
    emptyAnswers,
    resetAnswers,
    tryAgain,
    scores,
    getAllScores,
    newPoint,
    saveScore,
    categoryFilter,
    selectScoreboardCategory,
    allScores,
  };

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
}

export { Provider };

Provider.propTypes = {
  children: PropTypes.any,
};

export default QuizContext;
