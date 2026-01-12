export function normalizePlayers(rawPlayers) {
  return rawPlayers.map(player => ({
    id: `${player.Player}-${player.Season}`.replace(/\s+/g, "_"),

    name: player.Player,
    season: player.Season,
    team: player.Tm,
    league: player.Lg,
    position: player.Pos,

    stats: {
      games: Number(player.G) || 0,
      minutes: Number(player.MP) || 0,

      points: Number(player.PTS) || 0,
      rebounds: Number(player.TRB) || 0,
      assists: Number(player.AST) || 0,
      steals: Number(player.STL) || 0,
      blocks: Number(player.BLK) || 0,
      turnovers: Number(player.TOV) || 0,

      fgMade: Number(player.FG) || 0,
      fgAttempted: Number(player.FGA) || 0,
      fgPct: Number(player["FG%"]) || 0,

      threeMade: Number(player["3P"]) || 0,

      ftMade: Number(player.FT) || 0,
      ftAttempted: Number(player.FTA) || 0,
      ftPct: Number(player["FT%"]) || 0
    }
  }));
}
