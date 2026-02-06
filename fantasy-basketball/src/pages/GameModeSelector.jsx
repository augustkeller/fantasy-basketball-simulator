import { useNavigate } from "react-router-dom";

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
        <button onClick={startSinglePlayer}>
          1 Player Mode
        </button>

        <button onClick={startTwoPlayer}>
          2 Player Mode
        </button>
      </div>
    </div>
  );
}
