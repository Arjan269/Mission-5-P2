// src/pages/FuelPriceComparePage/StationDropdown.jsx
import styles from "./priceCompStyles.module.css";

export default function StationDropdown({ stations, selectedId, onChange, label }) {
  return (
    <div className={styles.dropdownWrapper}>
      <select
        className={styles.dropdown}
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>

        {stations.map((station) => (
          <option key={station._id} value={station._id}>
            {station.name}
          </option>
        ))}
      </select>
    </div>
  );
}
