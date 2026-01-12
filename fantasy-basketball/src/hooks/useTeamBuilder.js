import { useState } from "react";

export function useTeamBuilder(maxPlayers = 5) {
  const [selected, setSelected] = useState([]);

  function togglePlayer(player) {
    setSelected(prev => {
      const exists = prev.some(p => p.id === player.id);

      if (exists) {
        return prev.filter(p => p.id !== player.id);
      }

      if (prev.length < maxPlayers) {
        return [...prev, player];
      }

      return prev;
    });
  }

  return {
    selected,
    togglePlayer
  };
}
