import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameModeSelect from "./pages/GameModeSelect";
import PlayerSelector from "./pages/PlayerSelector";
import Results from "./pages/Results";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameModeSelect />} />
        <Route path="/one-player" element={<PlayerSelector />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}
