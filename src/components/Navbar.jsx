import { useContext } from "react";
import { Link } from "react-router-dom";
import QuizContext from "../context/quiz";

function Navbar() {
  const { name } = useContext(QuizContext);
  return (
    <div>
      <Link to="/">Home</Link>
      {name && <p>Welcome {name} </p>}
    </div>
  );
}

export default Navbar;
