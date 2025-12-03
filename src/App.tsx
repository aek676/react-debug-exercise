import "./index.css";

import { Routes, Route } from "react-router-dom";
import Exercise1 from "./pages/Exercise1";
import { HomeContent } from "./pages/Home";
import Exercise2 from "./pages/Exercise2";



export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/exercise1" element={<Exercise1 />} />
        <Route path="/exercise2" element={<Exercise2 />} />
      </Routes>
    </div>
  );
}

export default App;
