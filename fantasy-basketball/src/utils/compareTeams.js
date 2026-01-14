export function compareTeams(user, opponent) {
  const categories = [
    { key: "fgPercent", higherWins: true },
    { key: "threePt", higherWins: true },
    { key: "ftPercent", higherWins: true },
    { key: "rebounds", higherWins: true },
    { key: "assists", higherWins: true },
    { key: "steals", higherWins: true },
    { key: "blocks", higherWins: true },
    { key: "turnovers", higherWins: false },
    { key: "points", higherWins: true }
  ];

  let userWins = 0;
  let opponentWins = 0;

  const results = categories.map(cat => {
    const userVal = Number(user[cat.key]);
    const oppVal = Number(opponent[cat.key]);

    if (userVal === oppVal) {
      userWins += 0.5;
      opponentWins += 0.5;
      return { category: cat.key, result: "tie" };
    }

    const userWon = cat.higherWins
      ? userVal > oppVal
      : userVal < oppVal;

    if (userWon) {
      userWins += 1;
      return { category: cat.key, result: "win" };
    } else {
      opponentWins += 1;
      return { category: cat.key, result: "loss" };
    }
  });

  return {
    userWins,
    opponentWins,
    results
  };
}
