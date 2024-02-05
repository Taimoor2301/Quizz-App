import Quiz from "./components/Quiz";

import { Route, Routes } from "react-router-dom";
import Intro from "./components/Intro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
