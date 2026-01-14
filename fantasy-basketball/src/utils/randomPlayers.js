export function getRandomPlayers(pool, count, excludeIds = []) {
  const filtered = pool.filter(p => !excludeIds.includes(p.id));
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
