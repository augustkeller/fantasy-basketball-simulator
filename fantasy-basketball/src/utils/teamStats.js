export function calculateTeamTotals(team) {
  const totals = team.reduce(
    (acc, player) => {
      acc.fg += player.stats.fg;
      acc.fga += player.stats.fga;
      acc.threePt += player.stats.threePt;
      acc.ft += player.stats.ft;
      acc.fta += player.stats.fta;
      acc.rebounds += player.stats.rebounds;
      acc.assists += player.stats.assists;
      acc.steals += player.stats.steals;
      acc.blocks += player.stats.blocks;
      acc.turnovers += player.stats.turnovers;
      acc.points += player.stats.points;
      return acc;
    },
    {
      fg: 0,
      fga: 0,
      threePt: 0,
      ft: 0,
      fta: 0,
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
    fgPercent: totals.fga ? (totals.fg / totals.fga).toFixed(3) : "0.000",
    ftPercent: totals.fta ? (totals.ft / totals.fta).toFixed(3) : "0.000"
  };
}
