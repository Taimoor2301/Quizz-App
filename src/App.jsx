import { useState } from "react";
import Intro from "./components/pages/intro";
import Quiz from "./components/pages/quiz";

function App() {
  const [start, setStart] = useState(false);
  function startGame() {
    setStart((old) => !old);
  }

  return (
    <main>
      {start ? <Quiz startGame={startGame} /> : <Intro start={startGame} />}
    </main>
  );
}

export default App;
