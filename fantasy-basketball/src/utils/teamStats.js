export function calculateTeamTotals(team) {
  const totals = team.reduce(
    (acc, player) => {
      acc.fgMade += player.stats.fgMade;
      acc.fgAttempts += player.stats.fgAttempts;
      acc.threePt += player.stats.threePt;
      acc.ftMade += player.stats.ftMade;
      acc.ftAttempts += player.stats.ftAttempts;
      acc.rebounds += player.stats.rebounds;
      acc.assists += player.stats.assists;
      acc.steals += player.stats.steals;
      acc.blocks += player.stats.blocks;
      acc.turnovers += player.stats.turnovers;
      acc.points += player.stats.points;
      return acc;
    },
    {
      fgMade: 0,
      fgAttempts: 0,
      threePt: 0,
      ftMade: 0,
      ftAttempts: 0,
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
    fgPercent:
      totals.fgAttempts > 0
        ? (totals.fgMade / totals.fgAttempts).toFixed(3)
        : "0.000",
    ftPercent:
      totals.ftAttempts > 0
        ? (totals.ftMade / totals.ftAttempts).toFixed(3)
        : "0.000"
  };
}
