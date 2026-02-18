import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import UserCountSelector from "../components/UserCountSelector";

export default function GameModeSelector({ setGameMode }) {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(1);


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
        <UserCountSelector
          value={userCount}
          onChange={setUserCount}
        />
        <Button onClick={() => navigate("/player-select", { state: { userCount } })}>
          Start Game
        </Button>
      </div>
    </div>
  );
}
