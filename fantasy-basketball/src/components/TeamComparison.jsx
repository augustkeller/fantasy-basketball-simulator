import { compareTeams } from "../utils/compareTeams";

export default function TeamComparison({ userTotals, opponentTotals }) {
  const { userWins, opponentWins, results } = compareTeams(
    userTotals,
    opponentTotals
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Matchup Result</h2>

      <h3>
        Record: {userWins} – {opponentWins}
      </h3>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Category</th>
            <th>Your Team</th>
            <th>Opponent</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {results.map(row => (
            <tr key={row.category}>
              <td>{row.category.toUpperCase()}</td>
              <td>{userTotals[row.category]}</td>
              <td>{opponentTotals[row.category]}</td>
              <td>
                {row.result === "win" && "✅ Win"}
                {row.result === "loss" && "❌ Loss"}
                {row.result === "tie" && "➖ Tie"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
