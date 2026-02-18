import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";
import Button from "../components/Button";
import SeasonRangeSelector from "../components/SeasonRangeSelector";

export default function PlayerSelector({ teams, setTeams }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user count from GameModeSelector page
  const userCount = location.state?.userCount || 1;

  // Track which user is currently drafting
  const [currentUser, setCurrentUser] = useState(1);

  // Draft state
  const [selected, setSelected] = useState([]);
  const [randomPlayers, setRandomPlayers] = useState([]);

  // Season filter state
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  // Generate 20 random players when:
  // - season range changes
  // - current user changes
  useEffect(() => {
    const yearRange =
      startYear &&
      endYear &&
      Number(startYear) <= Number(endYear)
        ? { start: Number(startYear), end: Number(endYear) }
        : null;

    const randomSelection = getRandomPlayers(
      players,
      20,
      [],
      yearRange
    );

    setRandomPlayers(randomSelection);
    setSelected([]);
  }, [startYear, endYear, currentUser]);

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
    // Save team dynamically (player1, player2, etc.)
    setTeams(prev => ({
      ...prev,
      [`player${currentUser}`]: selected
    }));

    // Move to next user or go to results
    if (currentUser < userCount) {
      setSelected([]);
      setCurrentUser(prev => prev + 1);
    } else {
      navigate("/results");
    }
  }

  function handleBack() {
    navigate("/");
  }

  return (
    <div>
      <h1>{`Player ${currentUser}: Select 5 Players`}</h1>

      <SeasonRangeSelector
        startYear={startYear}
        endYear={endYear}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
      />

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

      <div className="button-row">
        <Button
          disabled={selected.length !== 5}
          onClick={handleSubmit}
        >
          {currentUser < userCount
            ? `Confirm Player ${currentUser} Team`
            : "Submit Final Team"}
        </Button>

        <Button onClick={handleBack}>
          ← Back to Game Modes
        </Button>
      </div>
    </div>
  );
}