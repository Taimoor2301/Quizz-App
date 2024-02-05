import { Route, Routes } from "react-router-dom";

import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
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
