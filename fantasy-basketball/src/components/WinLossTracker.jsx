import { useEffect, useRef, useState } from "react";

export default function WinLossTracker({ userTotals, opponentTotals }) {
  const [record, setRecord] = useState({
    wins: 0,
    losses: 0,
    ties: 0
  });

  const hasLoggedFirstMatchup = useRef(false);

  useEffect(() => {
    // Skip logging the very first render
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

    setRecord(prev => ({
      wins: prev.wins + matchupWins,
      losses: prev.losses + matchupLosses,
      ties: prev.ties + matchupTies
    }));
  }, [opponentTotals, userTotals]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Overall Record</h2>
      <p>
        {record.wins} – {record.losses}
        {record.ties > 0 && ` – ${record.ties}`}
      </p>
    </div>
  );
}
