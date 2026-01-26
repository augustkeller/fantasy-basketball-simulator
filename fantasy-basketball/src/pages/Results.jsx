import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";
import { calculateTeamTotals } from "../utils/teamStats";
import TeamComparison from "../components/TeamComparison";
import WinLossTracker from "../components/WinLossTracker";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Redirect if user refreshes or lands here directly
  if (!state?.team) {
    return <Navigate to="/" replace />;
  }

  const userTeam = state.team;
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
      {/* Navigation buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/one-player")}>Back</button>
        <button onClick={nextOpponent}>Next Opponent</button>
      </div>

      <h1>Matchup</h1>

      {/* Team Tables */}
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

      {/* Team Totals */}
      <h2 style={{ marginTop: "30px" }}>Team Totals</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Category</th>
            <th>Your Team</th>
            <th>Opponent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FG%</td>
            <td>{userTotals.fgPercent}</td>
            <td>{opponentTotals.fgPercent}</td>
          </tr>
          <tr>
            <td>3P</td>
            <td>{userTotals.threePt}</td>
            <td>{opponentTotals.threePt}</td>
          </tr>
          <tr>
            <td>FT%</td>
            <td>{userTotals.ftPercent}</td>
            <td>{opponentTotals.ftPercent}</td>
          </tr>
          <tr>
            <td>TRB</td>
            <td>{userTotals.rebounds}</td>
            <td>{opponentTotals.rebounds}</td>
          </tr>
          <tr>
            <td>AST</td>
            <td>{userTotals.assists}</td>
            <td>{opponentTotals.assists}</td>
          </tr>
          <tr>
            <td>STL</td>
            <td>{userTotals.steals}</td>
            <td>{opponentTotals.steals}</td>
          </tr>
          <tr>
            <td>BLK</td>
            <td>{userTotals.blocks}</td>
            <td>{opponentTotals.blocks}</td>
          </tr>
          <tr>
            <td>TOV</td>
            <td>{userTotals.turnovers}</td>
            <td>{opponentTotals.turnovers}</td>
          </tr>
          <tr>
            <td>PTS</td>
            <td>{userTotals.points}</td>
            <td>{opponentTotals.points}</td>
          </tr>
        </tbody>
      </table>

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
