import { useEffect, useRef, useState } from "react";

export default function WinLossTracker({
  userTotals,
  opponentTotals,
  opponentTeam
}) {
  const [record, setRecord] = useState({
    wins: 0,
    losses: 0,
    ties: 0
  });

  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const hasLoggedFirstMatchup = useRef(false);
  const matchupId = useRef(1);

  useEffect(() => {
    // Skip initial render (Strict Mode safe)
    if (!hasLoggedFirstMatchup.current) {
      hasLoggedFirstMatchup.current = true;
      return;
    }

    let matchupWins = 0;
    let matchupLosses = 0;
    let matchupTies = 0;

    const categories = [
      { key: "fgPercent", higherIsBetter: true },
      { key: "threePt", higherIsBetter: true },
      { key: "ftPercent", higherIsBetter: true },
      { key: "rebounds", higherIsBetter: true },
      { key: "assists", higherIsBetter: true },
      { key: "steals", higherIsBetter: true },
      { key: "blocks", higherIsBetter: true },
      { key: "turnovers", higherIsBetter: false },
      { key: "points", higherIsBetter: true }
    ];

    categories.forEach(({ key, higherIsBetter }) => {
      const userVal = userTotals[key];
      const oppVal = opponentTotals[key];

      if (userVal === oppVal) {
        matchupTies++;
        return;
      }

      const userWinsCategory = higherIsBetter
        ? userVal > oppVal
        : userVal < oppVal;

      if (userWinsCategory) matchupWins++;
      else matchupLosses++;
    });

    // Update overall record
    setRecord(prev => ({
      wins: prev.wins + matchupWins,
      losses: prev.losses + matchupLosses,
      ties: prev.ties + matchupTies
    }));

    // Log matchup history
    setHistory(prev => [
      ...prev,
      {
        id: matchupId.current++,
        opponent: opponentTeam.map(p => ({
          id: p.id,
          name: p.name
        })),
        result: {
          wins: matchupWins,
          losses: matchupLosses,
          ties: matchupTies
        }
      }
    ]);
  }, [opponentTotals, userTotals, opponentTeam]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Overall Record</h2>
      <p>
        {record.wins} – {record.losses}
        {record.ties > 0 && ` – ${record.ties}`}
      </p>

      <button
        onClick={() => setShowHistory(prev => !prev)}
        style={{ marginTop: "10px" }}
      >
        {showHistory ? "Hide Matchup History" : "View Matchup History"}
      </button>

      {showHistory && (
        <div style={{ marginTop: "20px" }}>
          {history.map(matchup => (
            <div
              key={matchup.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px"
              }}
            >
              <strong>
                Matchup {matchup.id}:{" "}
                {matchup.result.wins}–{matchup.result.losses}
                {matchup.result.ties > 0 &&
                  `–${matchup.result.ties}`}
              </strong>

              <ul>
                {matchup.opponent.map(player => (
                  <li key={player.id}>{player.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
