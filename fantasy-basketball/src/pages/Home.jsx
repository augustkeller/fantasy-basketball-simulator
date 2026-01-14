import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";

export default function Home() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [randomPlayers, setRandomPlayers] = useState([]);

  // Generate 20 random players on first load
  useEffect(() => {
    const randomSelection = getRandomPlayers(players, 20);
    setRandomPlayers(randomSelection);
  }, []);

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
    navigate("/results", { state: { team: selected } });
  }

  return (
    <div>
      <h1>Select 5 Players</h1>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Position</th>
            <th>Season</th>
            <th>Team</th>
            <th>FG%</th>
            <th>3P</th>
            <th>FT%</th>
            <th>TRB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {randomPlayers.map(player => (
            <tr key={player.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(player)}
                  onChange={() => togglePlayer(player)}
                />
              </td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.season}</td>
              <td>{player.team}</td>
              <td>{player.stats.fgPercent}</td>
              <td>{player.stats.threePt}</td>
              <td>{player.stats.ftPercent}</td>
              <td>{player.stats.rebounds}</td>
              <td>{player.stats.assists}</td>
              <td>{player.stats.steals}</td>
              <td>{player.stats.blocks}</td>
              <td>{player.stats.turnovers}</td>
              <td>{player.stats.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        disabled={selected.length !== 5}
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Submit Team
      </button>
    </div>
  );
}