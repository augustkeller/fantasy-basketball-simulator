export function getRandomPlayers(
  pool,
  count,
  excludeIds = [],
  yearRange = null // { start: number, end: number }
) {
  let filtered = pool.filter(p => !excludeIds.includes(p.id));

  if (yearRange?.start && yearRange?.end) {
    filtered = filtered.filter(player => {
      // "1988-89" → 1988
      const seasonStartYear = parseInt(player.season.split("-")[0], 10);

      return (
        seasonStartYear >= yearRange.start &&
        seasonStartYear <= yearRange.end
      );
    });
  }

  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
