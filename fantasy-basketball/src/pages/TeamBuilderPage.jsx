import { useMemo } from "react";
import { players } from "../data/playersData";
import { getRandomPlayers } from "../utils/getRandomPlayers";

const pool = useMemo(
  () => getRandomPlayers(players, 20),
  []
);
