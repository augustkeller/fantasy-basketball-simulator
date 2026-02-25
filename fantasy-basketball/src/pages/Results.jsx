import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";
import { calculateTeamTotals } from "../utils/teamStats";
import TeamComparison from "../components/TeamComparison";
import Button from "../components/Button";
import { useRef } from "react";

export default function Results({
  teams,
  record,
  setRecord,
  matchHistory,
  setMatchHistory
}) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const userCount = state?.userCount || 1;

  const lastLoggedSignature = useRef(null);

  /* -----------------------------
     Resolve Teams
  ------------------------------ */

  const userTeam = teams.player1;

  const [opponentTeam, setOpponentTeam] = useState(() =>
    userCount === 1
      ? getRandomPlayers(players, 5, userTeam.map(p => p.id))
      : teams.player2
  );

  /* -----------------------------
     Stat Calculations
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
     Category Comparison Logic
  ------------------------------ */

  function getMatchResult(user, opp) {
    let userWins = 0;
    let oppWins = 0;

    const categories = [
      ["fgPercent", true],
      ["threePt", true],
      ["ftPercent", true],
      ["rebounds", true],
      ["assists", true],
      ["steals", true],
      ["blocks", true],
      ["turnovers", false], // lower is better
      ["points", true]
    ];

    categories.forEach(([stat, higherIsBetter]) => {
      const u = Number(user[stat]);
      const o = Number(opp[stat]);

      if (u === o) return;

      if (higherIsBetter ? u > o : u < o) {
        userWins++;
      } else {
        oppWins++;
      }
    });

    return { userWins, oppWins };
  }

  const result = useMemo(
    () => getMatchResult(userTotals, opponentTotals),
    [userTotals, opponentTotals]
  );

  /* -----------------------------
     Record + History Tracking
  ------------------------------ */

useEffect(() => {
  if (gameMode !== "single") return;

  const signature = opponentTeam.map(p => p.id).join("-");

  // 🚫 Prevent duplicate logging of SAME matchup
  if (lastLoggedSignature.current === signature) return;

  lastLoggedSignature.current = signature;

  const result = getMatchupResult(userTotals, opponentTotals);

  setRecord(prev => ({
    wins: prev.wins + result.userWins,
    losses: prev.losses + result.oppWins
  }));

  setMatchHistory(prev => [
    ...prev,
    {
      opponent: opponentTeam,
      result: `${result.userWins}-${result.oppWins}`
    }
  ]);
}, [opponentTeam]);

  /* -----------------------------
     Handlers
  ------------------------------ */

  function nextOpponent() {
    const userIds = userTeam.map(p => p.id);
    setOpponentTeam(getRandomPlayers(players, 5, userIds));
  }

  function renderTeamTable(team) {
    return (
      <table>
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
      <div className="button-row">
        <Button onClick={() => navigate("/")}>
          Back to Game Modes
        </Button>

        {userCount === 1 && (
          <Button onClick={nextOpponent}>
            Next Opponent
          </Button>
        )}
      </div>

      <h1>
        {userCount === 1 ? "Matchup" : "Head-to-Head Matchup"}
      </h1>

      {/* Teams */}
      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 1 }}>
          <h2>{userCount === 1 ? "Your Team" : "Player 1"}</h2>
          {renderTeamTable(userTeam)}
        </div>

        <div style={{ flex: 1 }}>
          <h2>{userCount === 1 ? "Opponent" : "Player 2"}</h2>
          {renderTeamTable(opponentTeam)}
        </div>
      </div>

      {/* Totals */}
      <h2 style={{ marginTop: "30px" }}>Team Totals</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>You</th>
            <th>Opponent</th>
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
          ].map(([label, u, o]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{u}</td>
              <td>{o}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Category Result */}
      <h2>
        Result: {result.userWins} - {result.oppWins}
      </h2>

      {/* Overall Record */}
      {userCount === 1 && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Overall Record: {record.wins} - {record.losses}
          </h3>

          <details>
            <summary>Match History</summary>
            <ul>
              {matchHistory.map((match, index) => (
                <li key={index}>
                  {match.result} vs{" "}
                  {match.opponent.map(p => p.name).join(", ")}
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}

      <TeamComparison
        userTotals={userTotals}
        opponentTotals={opponentTotals}
      />
    </div>
  );
}