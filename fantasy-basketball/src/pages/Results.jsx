import { useLocation, Navigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";
import { calculateTeamTotals } from "../utils/teamStats";
import TeamComparison from "../components/TeamComparison";

export default function Results() {
  const { state } = useLocation();

  // Redirect if user refreshes or lands here directly
  if (!state?.team) {
    return <Navigate to="/" replace />;
  }

  const userTeam = state.team;
  const userIds = userTeam.map(player => player.id);

  // Opponent lives in state now
  const [opponentTeam, setOpponentTeam] = useState(() =>
    getRandomPlayers(players, 5, userIds)
  );

  // Button handler to generate a new opponent
  function nextOpponent() {
    setOpponentTeam(getRandomPlayers(players, 5, userIds));
  }

  // Calculate totals (memoized for efficiency)
  const userTotals = useMemo(() => calculateTeamTotals(userTeam), [userTeam]);
  const opponentTotals = useMemo(
    () => calculateTeamTotals(opponentTeam),
    [opponentTeam]
  );

  return (
    <div>
      <h1>Matchup</h1>

      {/* Next Opponent Button */}
      <button onClick={nextOpponent} style={{ marginBottom: "20px" }}>
        Next Opponent
      </button>

      {/* Rosters */}
      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <h2>Your Team</h2>
          <ul>
            {userTeam.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Opponent Team</h2>
          <ul>
            {opponentTeam.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 9-Cat Team Totals */}
      <table border="1" cellPadding="6" style={{ marginTop: "30px" }}>
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
    </div>
  );
}
