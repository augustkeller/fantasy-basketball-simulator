import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameModeSelect from "./pages/GameModeSelect";
import Home from "./pages/Home";
import Results from "./pages/Results";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameModeSelect />} />
        <Route path="/one-player" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}
