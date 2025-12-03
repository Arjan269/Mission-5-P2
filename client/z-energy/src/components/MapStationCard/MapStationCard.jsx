import styles from "./MapStationCard.module.css";

export default function MapStationCard({ station }) {
  return (
    <div className={styles.card}>
      <div className={styles.topOfCard}>
        <h2>{station.name}</h2>
        <h3>{station.address}</h3>
        {station.isOpen24Hours ? (
          <p>Open 24 hours</p>
        ) : (
          <p>Opening Hours ▼</p>
        )}{" "}
        {/* Their figma design only shows Open 24 hours */}
      </div>

      <div className={styles.bottomOfCard}>
        <ul className={styles.servicesList}>
          {station.services.map((service) => (
            <li key={service} className={styles.serviceItem}>
              {service}
            </li>
          ))}
        </ul>

        <div className={styles.buttonContainer}>
          <button className={styles.visitButton}>Visit Now</button>
        </div>
      </div>
    </div>
  );
}
