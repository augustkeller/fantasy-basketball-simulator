import { useLocation, Navigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();

  if (!state?.team) {
    return <Navigate to="/" replace />;
  }

  const userTeam = state.team;

  return (
    <div>
      <h1>Your Team</h1>
      <ul>
        {userTeam.map(player => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>

      <h2>Opponent Teams (coming next)</h2>
    </div>
  );
}
