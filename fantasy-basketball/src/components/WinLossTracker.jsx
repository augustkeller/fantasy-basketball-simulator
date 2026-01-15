import { useEffect, useState } from "react";

export default function WinLossTracker({ userTotals, opponentTotals }) {
  const [record, setRecord] = useState({
    wins: 0,
    losses: 0,
    ties: 0
  });

  function compareTeams() {
    let userWins = 0;
    let opponentWins = 0;

    const categories = [
      { key: "fgPercent", higherIsBetter: true },
      { key: "threePt", higherIsBetter: true },
      { key: "ftPercent", higherIsBetter: true },
      { key: "rebounds", higherIsBetter: true },
      { key: "assists", higherIsBetter: true },
      { key: "steals", higherIsBetter: true },
      { key: "blocks", higherIsBetter: true },
      { key: "turnovers", higherIsBetter: false }, // lower wins
      { key: "points", higherIsBetter: true }
    ];

    categories.forEach(({ key, higherIsBetter }) => {
      const userVal = userTotals[key];
      const oppVal = opponentTotals[key];

      if (userVal === oppVal) return;

      const userBetter = higherIsBetter
        ? userVal > oppVal
        : userVal < oppVal;

      if (userBetter) userWins++;
      else opponentWins++;
    });

    if (userWins > opponentWins) {
      setRecord(r => ({ ...r, wins: r.wins + 1 }));
    } else if (userWins < opponentWins) {
      setRecord(r => ({ ...r, losses: r.losses + 1 }));
    } else {
      setRecord(r => ({ ...r, ties: r.ties + 1 }));
    }
  }

  // Run every time a new opponent is generated
  useEffect(() => {
    compareTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentTotals]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Overall Record</h2>
      <p>
        {record.wins} - {record.losses}
        {record.ties > 0 && ` - ${record.ties}`}
      </p>
    </div>
  );
}
