import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import UserCountSelector from "../components/UserCountSelector";

export default function GameModeSelector() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(1);

  function handleStartGame() {
    navigate("/select", { state: { userCount } });
  }

  return (
    <div>
      <h1>Fantasy Basketball Simulator</h1>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <UserCountSelector
          value={userCount}
          onChange={setUserCount}
        />

        <Button onClick={handleStartGame}>
          Start Game
        </Button>
      </div>
    </div>
  );
}