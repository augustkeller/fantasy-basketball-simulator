import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";
import { calculateTeamTotals } from "../utils/teamStats";
import TeamComparison from "../components/TeamComparison";
import WinLossTracker from "../components/WinLossTracker";
import Button from "../components/Button";

export default function Results({ teams, gameMode }) {
  const navigate = useNavigate();

  /* -----------------------------
     Resolve teams by game mode
  ------------------------------ */

  const userTeam =
    gameMode === "two-player" ? teams.player1 : teams.player1;

  const opponentTeamInitial =
    gameMode === "two-player"
      ? teams.player2
      : getRandomPlayers(
          players,
          5,
          teams.player1.map(p => p.id)
        );

  const [opponentTeam, setOpponentTeam] = useState(opponentTeamInitial);

  /* -----------------------------
     Stat calculations
  ------------------------------ */

  const userTotals = useMemo(
    () => calculateTeamTotals(userTeam),
    [userTeam]
  );

  const opponentTotals = useMemo(
    () => calculateTeamTotals(opponentTeam),
    [opponentTeam]
  );

  /* -----------------------------
     Handlers
  ------------------------------ */

  function nextOpponent() {
    const userIds = userTeam.map(p => p.id);
    setOpponentTeam(getRandomPlayers(players, 5, userIds));
  }

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

  /* -----------------------------
     Render
  ------------------------------ */

  return (
    <div>
      {/* Navigation */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Button onClick={() => navigate("/")}>Back to Game Modes</Button>

        {gameMode === "single" && (
          <Button onClick={nextOpponent}>Next Opponent</Button>
        )}
      </div>

      <h1>
        {gameMode === "two-player" ? "Head-to-Head Matchup" : "Matchup"}
      </h1>

      {/* Team Tables */}
      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 1 }}>
          <h2>
            {gameMode === "two-player" ? "Player 1 Team" : "Your Team"}
          </h2>
          {renderTeamTable(userTeam)}
        </div>

        <div style={{ flex: 1 }}>
          <h2>
            {gameMode === "two-player" ? "Player 2 Team" : "Opponent Team"}
          </h2>
          {renderTeamTable(opponentTeam)}
        </div>
      </div>

      {/* Totals */}
      <h2 style={{ marginTop: "30px" }}>Team Totals</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Category</th>
            <th>
              {gameMode === "two-player" ? "Player 1" : "You"}
            </th>
            <th>
              {gameMode === "two-player" ? "Player 2" : "Opponent"}
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            ["FG%", userTotals.fgPercent, opponentTotals.fgPercent],
            ["3P", userTotals.threePt, opponentTotals.threePt],
            ["FT%", userTotals.ftPercent, opponentTotals.ftPercent],
            ["TRB", userTotals.rebounds, opponentTotals.rebounds],
            ["AST", userTotals.assists, opponentTotals.assists],
            ["STL", userTotals.steals, opponentTotals.steals],
            ["BLK", userTotals.blocks, opponentTotals.blocks],
            ["TOV", userTotals.turnovers, opponentTotals.turnovers],
            ["PTS", userTotals.points, opponentTotals.points]
          ].map(([label, user, opp]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{user}</td>
              <td>{opp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Comparison */}
      <TeamComparison
        userTotals={userTotals}
        opponentTotals={opponentTotals}
      />

      {/* Only track history in single-player */}
      {gameMode === "single" && (
        <WinLossTracker
          userTotals={userTotals}
          opponentTotals={opponentTotals}
          opponentTeam={opponentTeam}
        />
      )}
    </div>
  );
}
