import { Route, Routes } from "react-router-dom";

import Intro from "./Pages/Intro.jsx";
import Quiz from "./Pages/Quiz.jsx";
//
function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
