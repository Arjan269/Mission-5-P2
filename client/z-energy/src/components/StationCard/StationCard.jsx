// src/components/StationCard/StationCard.jsx
import styles from "./StationCard.module.css";

export default function StationCard({ station, prices, distance }) {
  if (!station) return null;

  const distanceValue =
    typeof distance === "number"
      ? distance
      : typeof station?.distance === "number"
      ? station.distance
      : null;

  return (
    <div
      className={styles.stationCard}
      role="region"
      aria-label={`Station card for ${station.name}`}
    >
      <h3 className={styles.stationName}>{station.name}</h3>

      <div className={styles.priceList} role="list" aria-label="Fuel prices">
        {prices.map((p, i) => (
          <p key={i} className={styles.priceRow} role="listitem">
            <strong>{p.label}:</strong> ${p.price.toFixed(2)} per litre
          </p>
        ))}
      </div>

      <h4 className={styles.servicesHeader}>Available services:</h4>
      <ul
        className={styles.servicesList}
        aria-label="Available services at this station"
      >
        {station.services?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p
        className={styles.distanceText}
        aria-label={`Distance from you: ${
          distanceValue != null
            ? `${distanceValue.toFixed(2)} kilometers`
            : "not available"
        }`}
      >
        Distance from you:{" "}
        {distanceValue != null ? `${distanceValue.toFixed(2)} km` : "—"}
      </p>
    </div>
  );
}
