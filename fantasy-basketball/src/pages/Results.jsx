import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";
import { calculateTeamTotals } from "../utils/teamStats";
import TeamComparison from "../components/TeamComparison";
import WinLossTracker from "../components/WinLossTracker";

export default function Results({ teams, gameMode }) {
  const navigate = useNavigate();
  const userTeam = teams.player1;

  if (!userTeam || userTeam.length !== 5) {
    return <p>No team found. Please select a team first.</p>;
  }

  const userIds = userTeam.map(p => p.id);

  const [opponentTeam, setOpponentTeam] = useState(() =>
    getRandomPlayers(players, 5, userIds)
  );

  function nextOpponent() {
    setOpponentTeam(getRandomPlayers(players, 5, userIds));
  }

  const userTotals = useMemo(
    () => calculateTeamTotals(userTeam),
    [userTeam]
  );

  const opponentTotals = useMemo(
    () => calculateTeamTotals(opponentTeam),
    [opponentTeam]
  );

  function renderTeamTable(team) {
    return (
      <table border="1" cellPadding="5" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Player</th>
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
          {team.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
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
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/select")}>Back</button>
        {gameMode === "single" && (
          <button onClick={nextOpponent}>Next Opponent</button>
        )}
      </div>

      <h1>Matchup</h1>

      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 1 }}>
          <h2>Your Team</h2>
          {renderTeamTable(userTeam)}
        </div>

        <div style={{ flex: 1 }}>
          <h2>Opponent Team</h2>
          {renderTeamTable(opponentTeam)}
        </div>
      </div>

      <TeamComparison
        userTotals={userTotals}
        opponentTotals={opponentTotals}
      />

      <WinLossTracker
        userTotals={userTotals}
        opponentTotals={opponentTotals}
        opponentTeam={opponentTeam}
      />
    </div>
  );
}
