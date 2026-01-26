import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameModeSelector from "./pages/GameModeSelector";
import PlayerSelector from "./pages/PlayerSelector";
import Results from "./pages/Results";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameModeSelector />} />
        <Route path="/one-player" element={<PlayerSelector />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}
