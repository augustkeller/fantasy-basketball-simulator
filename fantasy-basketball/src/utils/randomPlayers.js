export function getRandomPlayers(
  pool,
  count,
  excludeIds = [],
  seasons = null
) {
  let filtered = pool.filter(p => !excludeIds.includes(p.id));

  // Optional season filter
  if (seasons && seasons.length > 0) {
    filtered = filtered.filter(p => seasons.includes(p.season));
  }

  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
