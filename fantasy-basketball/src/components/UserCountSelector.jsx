export default function UserCountSelector({
  value,
  onChange,
  min = 1,
  max = 8,
  label = "Number of Players",
}) {
  const options = [];

  for (let i = min; i <= max; i++) {
    options.push(i);
  }

  return (
    <div className="user-count-selector">
      <label>
        <strong>{label}</strong>
      </label>

      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="user-count-dropdown"
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num} Player{num > 1 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
