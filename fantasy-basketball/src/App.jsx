import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameModeSelect from "./pages/GameModeSelect";
import PlayerSelector from "./pages/PlayerSelector";
import Results from "./pages/Results";

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
          element={<GameModeSelect setGameMode={setGameMode} />}
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
