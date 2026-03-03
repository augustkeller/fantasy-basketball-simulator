import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { players } from "../data/players";
import { getRandomPlayers } from "../utils/randomPlayers";
import { calculateTeamTotals } from "../utils/teamStats";
import TeamComparison from "../components/TeamComparison";
import Button from "../components/Button";

/* -----------------------------
   Round Robin Generator
------------------------------ */
function generateMatchups(teams) {
  const matchups = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matchups.push([i, j]);
    }
  }

  return matchups;
}

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

  const isSinglePlayer = userCount === 1;
  const isTwoPlayer = userCount === 2;
  const isMultiPlayer = userCount > 2;

  const [standings, setStandings] = useState(() =>
    teams.map(() => ({ wins: 0, losses: 0 }))
  );

  const lastLoggedSignature = useRef(null);
  const lastMatchIndexRecorded = useRef(-1);

  /* -----------------------------
     Guards
  ------------------------------ */
  if (!teams || !teams[0] || teams[0].length === 0) {
    return <div>No team found. Go back and select players.</div>;
  }

  /* -----------------------------
     SINGLE PLAYER (unchanged)
  ------------------------------ */
  const [opponentTeam, setOpponentTeam] = useState(() =>
    isSinglePlayer
      ? getRandomPlayers(players, 5, teams[0].map(p => p.id))
      : []
  );

  /* -----------------------------
     ROUND ROBIN SETUP
  ------------------------------ */
  const matchups = useMemo(
    () => (isMultiPlayer ? generateMatchups(teams) : []),
    [teams, isMultiPlayer]
  );

  const [matchIndex, setMatchIndex] = useState(0);

  /* -----------------------------
     Resolve Teams
  ------------------------------ */
  let teamA, teamB, labelA, labelB;

  if (isSinglePlayer) {
    teamA = teams[0];
    teamB = opponentTeam;
    labelA = "Your Team";
    labelB = "Opponent";
  } else if (isTwoPlayer) {
    teamA = teams[0];
    teamB = teams[1];
    labelA = "Player 1";
    labelB = "Player 2";
  } else {
    const [a, b] = matchups[matchIndex] || [0, 1];
    teamA = teams[a];
    teamB = teams[b];
    labelA = `Team ${a + 1}`;
    labelB = `Team ${b + 1}`;
  }

  /* -----------------------------
     Stat Calculations
  ------------------------------ */
  const totalsA = useMemo(
    () => calculateTeamTotals(teamA),
    [teamA]
  );

  const totalsB = useMemo(
    () => calculateTeamTotals(teamB),
    [teamB]
  );

  /* -----------------------------
     Match Result Logic
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
      ["turnovers", false],
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
    () => getMatchResult(totalsA, totalsB),
    [totalsA, totalsB]
  );

  /* -----------------------------
     Record Tracking (single only)
  ------------------------------ */
  useEffect(() => {
    if (!isSinglePlayer) return;

    const signature = teamB.map(p => p.id).join("-");
    if (lastLoggedSignature.current === signature) return;

    lastLoggedSignature.current = signature;

    const result = getMatchResult(totalsA, totalsB);

    setRecord(prev => ({
      wins: prev.wins + result.userWins,
      losses: prev.losses + result.oppWins
    }));

    setMatchHistory(prev => [
      ...prev,
      {
        opponent: teamB,
        result: `${result.userWins}-${result.oppWins}`
      }
    ]);
  }, [teamB, totalsA, totalsB, isSinglePlayer, setRecord, setMatchHistory]);

  /* -----------------------------
     Record Tracking (mutliplayer)
  ------------------------------ */
  useEffect(() => {
    if (!isMultiPlayer) return;

    // Prevent double-counting
    if (matchIndex === lastMatchIndexRecorded.current) return;

    lastMatchIndexRecorded.current = matchIndex;

    const [a, b] = matchups[matchIndex] || [];
    if (a === undefined || b === undefined) return;

    const result = getMatchResult(totalsA, totalsB);

    setStandings(prev => {
      const updated = [...prev];

      if (result.userWins > result.oppWins) {
        updated[a].wins += 1;
        updated[b].losses += 1;
      } else if (result.oppWins > result.userWins) {
        updated[b].wins += 1;
        updated[a].losses += 1;
      }
      // ties do nothing (optional: handle later)

      return updated;
    });

  }, [matchIndex, matchups, totalsA, totalsB, isMultiPlayer]);

  /* -----------------------------
     Handlers
  ------------------------------ */
  function nextOpponent() {
    const userIds = teams[0].map(p => p.id);
    setOpponentTeam(getRandomPlayers(players, 5, userIds));
  }

  function nextMatchup() {
    setMatchIndex(prev => prev + 1);
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
      <div className="button-row">
        <Button onClick={() => navigate("/")}>
          Back to Game Modes
        </Button>

        {isSinglePlayer && (
          <Button onClick={nextOpponent}>
            Next Opponent
          </Button>
        )}

        {isMultiPlayer && (
          <Button 
            onClick={nextMatchup}
            disabled={matchIndex >= matchups.length - 1}
          >
            Next Matchup
          </Button>
        )}
      </div>

      <h1>
        {isSinglePlayer ? "Matchup" : "Head-to-Head Matchup"}
      </h1>

      {isMultiPlayer && (
        <p>
          Match {matchIndex + 1} of {matchups.length}
        </p>
      )}

      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 1 }}>
          <h2>{labelA}</h2>
          {renderTeamTable(teamA)}
        </div>

        <div style={{ flex: 1 }}>
          <h2>{labelB}</h2>
          {renderTeamTable(teamB)}
        </div>
      </div>

      <h2 style={{ marginTop: "30px" }}>Team Totals</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>{labelA}</th>
            <th>{labelB}</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["FG%", totalsA.fgPercent, totalsB.fgPercent],
            ["3P", totalsA.threePt, totalsB.threePt],
            ["FT%", totalsA.ftPercent, totalsB.ftPercent],
            ["TRB", totalsA.rebounds, totalsB.rebounds],
            ["AST", totalsA.assists, totalsB.assists],
            ["STL", totalsA.steals, totalsB.steals],
            ["BLK", totalsA.blocks, totalsB.blocks],
            ["TOV", totalsA.turnovers, totalsB.turnovers],
            ["PTS", totalsA.points, totalsB.points]
          ].map(([label, a, b]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{a}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>
        Result: {result.userWins} - {result.oppWins}
      </h2>

      {isSinglePlayer && (
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
        userTotals={totalsA}
        opponentTotals={totalsB}
      />
    </div>
  );
}