import styles from "./MapStationCard.module.css";

export default function MapStationCard({ station }) {
  return (
    <div className={styles.card}>
      <h2>{station.name}</h2>
      <p>{station.address}</p>

      {station.isOpen24Hours ? <p>Open 24/7</p> : <p>Opening Hours ▼</p>} {/* Their figma design only shows Open 24 hours */}

      <ul className={styles.servicesList}>
        {station.services.map((service) => (
          <li key={service} className={styles.serviceItem}>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
