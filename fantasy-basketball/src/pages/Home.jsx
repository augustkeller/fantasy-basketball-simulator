import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { players } from "../data/players";

export default function Home() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  function togglePlayer(player) {
    setSelected(prev =>
      prev.includes(player)
        ? prev.filter(p => p !== player)
        : prev.length < 5
        ? [...prev, player]
        : prev
    );
  }

  function handleSubmit() {
    navigate("/results", {
      state: { team: selected }
    });
  }

  return (
    <div>
      <h1>Select 5 Players</h1>

      <ul>
        {players.slice(0, 20).map(player => (
          <li key={player.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(player)}
                onChange={() => togglePlayer(player)}
              />
              {player.name}
            </label>
          </li>
        ))}
      </ul>

      <button disabled={selected.length !== 5} onClick={handleSubmit}>
        Submit Team
      </button>
    </div>
  );
}
