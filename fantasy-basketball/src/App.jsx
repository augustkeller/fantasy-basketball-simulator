import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameModeSelector from "./pages/GameModeSelector";
import PlayerSelector from "./pages/PlayerSelector";
import Results from "./pages/Results";

const [record, setRecord] = useState({ wins: 0, losses: 0 });
const [matchHistory, setMatchHistory] = useState([]);

function App() {
  const [gameMode, setGameMode] = useState(null); // "single" | "two-player"
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [teams, setTeams] = useState({
    player1: [],
    player2: []
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<GameModeSelector setGameMode={setGameMode} />}
        />

        <Route
          path="/select"
          element={
            <PlayerSelector
              gameMode={gameMode}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              teams={teams}
              setTeams={setTeams}
            />
          }
        />

        <Route
          path="/results"
          element={<Results teams={teams} gameMode={gameMode} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
