import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameModeSelector from "./pages/GameModeSelector";
import PlayerSelector from "./pages/PlayerSelector";
import Results from "./pages/Results";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [teams, setTeams] = useState([]);

  // ✅ Single-player persistent state
  const [record, setRecord] = useState({ wins: 0, losses: 0 });
  const [matchHistory, setMatchHistory] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GameModeSelector
              setTeams={setTeams}
              setCurrentPlayer={setCurrentPlayer}
              setRecord={setRecord}
              setMatchHistory={setMatchHistory}
            />
          }
        />

        <Route
          path="/select"
          element={
            <PlayerSelector
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              teams={teams}
              setTeams={setTeams}
            />
          }
        />

        <Route
          path="/results"
          element={
            <Results
              teams={teams}
              record={record}
              setRecord={setRecord}
              matchHistory={matchHistory}
              setMatchHistory={setMatchHistory}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;