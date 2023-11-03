import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Categories from "./components/Categories";
import QuizApp from "./components/QuizApp";
import { Provider } from "./context/quiz";
import Start from "./components/Start";
import Scoreboard from "./components/Scoreboard";
import Finish from "./components/Finish";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/start" element={<Start />} />
            <Route path="/quizapp" element={<QuizApp />} />
            <Route path="/finish" element={<Finish />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
