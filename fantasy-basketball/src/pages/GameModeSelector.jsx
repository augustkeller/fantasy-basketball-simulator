import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import UserCountSelector from "../components/UserCountSelector";

export default function GameModeSelector({
  setGameMode,
  setTeams,
  setCurrentPlayer,
  setRecord,
  setMatchHistory
}) {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(1);

  function startGame() {
    // ✅ RESET EVERYTHING
    setTeams({
      player1: [],
      player2: []
    });

    setCurrentPlayer(1);

    setRecord({ wins: 0, losses: 0 });
    setMatchHistory([]);

    // optional (if still using it)
    setGameMode(userCount === 1 ? "single" : "multi");

    navigate("/select", { state: { userCount } });
  }

  return (
    <div>
      <h1>Fantasy Basketball Simulator</h1>

      <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center" }}>
        <UserCountSelector
          value={userCount}
          onChange={setUserCount}
        />

        <Button onClick={startGame}>
          Start Game
        </Button>
      </div>
    </div>
  );
}