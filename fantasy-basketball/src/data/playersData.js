import rawPlayers from "./players.json";
import { normalizePlayers } from "./normalizePlayers";

export const players = normalizePlayers(rawPlayers);
