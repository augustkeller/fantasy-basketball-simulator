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

      <div style={{ marginTop: "40px" }}>
        <button onClick={startSinglePlayer}>
          1 Player Mode
        </button>

        <button
          onClick={startTwoPlayer}
          style={{ marginLeft: "16px" }}
          disabled
        >
          Multiplayer (Coming Soon)
        </button>
      </div>
    </div>
  );
}
