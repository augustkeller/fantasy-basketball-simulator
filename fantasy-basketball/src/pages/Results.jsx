import { useLocation, Navigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();

  // Redirect if someone visits /results directly
  if (!state?.team) {
    return <Navigate to="/" replace />;
  }

  const userTeam = state.team;

  // Sum up team stats
  const totals = userTeam.reduce(
    (acc, player) => {
      acc.fgPercent += player.stats.fgPercent;
      acc.threePt += player.stats.threePt;
      acc.ftPercent += player.stats.ftPercent;
      acc.rebounds += player.stats.rebounds;
      acc.assists += player.stats.assists;
      acc.steals += player.stats.steals;
      acc.blocks += player.stats.blocks;
      acc.turnovers += player.stats.turnovers;
      acc.points += player.stats.points;
      return acc;
    },
    {
      fgPercent: 0,
      threePt: 0,
      ftPercent: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      points: 0
    }
  );

  // Averages for FG% and FT%
  const avgFgPercent = (totals.fgPercent / userTeam.length).toFixed(3);
  const avgFtPercent = (totals.ftPercent / userTeam.length).toFixed(3);

  return (
    <div>
      <h1>Your Team</h1>

      <table border="1" cellPadding="5">
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
          {userTeam.map(player => (
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
        <tfoot>
          <tr>
            <th>Team Total</th>
            <th>{avgFgPercent}</th>
            <th>{totals.threePt}</th>
            <th>{avgFtPercent}</th>
            <th>{totals.rebounds}</th>
            <th>{totals.assists}</th>
            <th>{totals.steals}</th>
            <th>{totals.blocks}</th>
            <th>{totals.turnovers}</th>
            <th>{totals.points}</th>
          </tr>
        </tfoot>
      </table>

      <h2 style={{ marginTop: "30px" }}>Opponent Teams (coming next)</h2>
    </div>
  );
}
