export function getRandomPlayers(players, count = 20) {
  return [...players]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
