import { useLocation, Navigate } from "react-router-dom";
import { players } from "../data/players";

/* ---------------- Utility Helpers ---------------- */

function getRandomPlayers(pool, count, excludeIds = []) {
  const filtered = pool.filter(p => !excludeIds.includes(p.id));
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function calculateTeamTotals(team) {
  const totals = team.reduce(
    (acc, player) => {
      acc.fg += player.stats.fg;
      acc.fga += player.stats.fga;
      acc.threePt += player.stats.threePt;
      acc.ft += player.stats.ft;
      acc.fta += player.stats.fta;
      acc.rebounds += player.stats.rebounds;
      acc.assists += player.stats.assists;
      acc.steals += player.stats.steals;
      acc.blocks += player.stats.blocks;
      acc.turnovers += player.stats.turnovers;
      acc.points += player.stats.points;
      return acc;
    },
    {
      fg: 0,
      fga: 0,
      threePt: 0,
      ft: 0,
      fta: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      points: 0
    }
  );

  return {
    ...totals,
    fgPercent: totals.fga ? (totals.fg / totals.fga).toFixed(3) : "0.000",
    ftPercent: totals.fta ? (totals.ft / totals.fta).toFixed(3) : "0.000"
  };
}

/* ---------------- Results Page ---------------- */

export default function Results() {
  const { state } = useLocation();

  if (!state?.team) {
    return <Navigate to="/" replace />;
  }

  const userTeam = state.team;

  // Prevent overlap between teams
  const userIds = userTeam.map(p => p.id);

  // Generate opponent team
  const opponentTeam = getRandomPlayers(players, 5, userIds);

  // Calculate totals
  const userTotals = calculateTeamTotals(userTeam);
  const opponentTotals = calculateTeamTotals(opponentTeam);

  return (
    <div>
      <h1>Matchup</h1>

      {/* Team Rosters */}
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

      {/* Team Totals */}
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
    </div>
  );
}
