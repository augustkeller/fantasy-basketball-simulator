export default function SeasonRangeSelector({
  startYear,
  endYear,
  setStartYear,
  setEndYear,
}) {
  return (
    <div className="season-range">
      <strong>Season Range (optional)</strong>

      <div className="season-range-inputs">
        <input
          type="number"
          placeholder="Start year (e.g. 2005)"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />

        <input
          type="number"
          placeholder="End year (e.g. 2015)"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
      </div>
    </div>
  );
}
