import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function GameModeSelector({ setGameMode }) {
  const navigate = useNavigate();

  function startSinglePlayer() {
    setGameMode("single");
    navigate("/select");
  }

  function startTwoPlayer() {
    setGameMode("two-player");
    navigate("/select");
  }

  return (
    <div>
      <h1>Fantasy Basketball Simulator</h1>

      <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center" }}>
        <Button onClick={startSinglePlayer}>
          1 Player Mode
        </Button>

        <Button onClick={startTwoPlayer}>
          2 Player Mode
        </Button>
      </div>
    </div>
  );
}
