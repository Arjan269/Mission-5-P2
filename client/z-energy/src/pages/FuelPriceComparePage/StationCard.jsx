import styles from "./priceCompStyles.module.css";

export default function StationCard({ station, prices }) {
  if (!station) return null;

  return (
    <div className={styles.stationCard}>
      <h3 className={styles.stationName}>{station.name}</h3>

      <div className={styles.priceList}>
        {prices.map((p, i) => (
          <p key={i} className={styles.priceRow}>
            <strong>{p.label}:</strong> ${p.price.toFixed(2)} per litre
          </p>
        ))}
      </div>

      <h4 className={styles.servicesHeader}>Available services:</h4>
      <ul className={styles.servicesList}>
        {station.services?.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p className={styles.distanceText}>Distance from you: —</p>
    </div>
  );
}
