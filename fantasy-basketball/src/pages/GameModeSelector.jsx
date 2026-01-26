import { useNavigate } from "react-router-dom";

export default function GameModeSelector() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Fantasy Basketball Simulator</h1>

      <div style={{ marginTop: "40px" }}>
        <button onClick={() => navigate("/one-player")}>
          1 Player Mode
        </button>

        {/* Future modes */}
        <button disabled style={{ marginLeft: "16px" }}>
          Multiplayer (Coming Soon)
        </button>
      </div>
    </div>
  );
}
