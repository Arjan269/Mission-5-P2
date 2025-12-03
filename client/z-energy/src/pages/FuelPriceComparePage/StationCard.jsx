import styles from "./priceCompStyles.module.css";

export default function StationCard({ station }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.stationTitle}>{station.name}</h2>

      <p className={styles.stationAddress}>
        {station.address}, {station.suburb}, {station.city}
      </p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Fuel Prices</h3>
        <ul>
          {station.prices.map((p) => (
            <li key={p.fuelType}>
              {p.fuelType}: ${p.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Services</h3>
        <ul>
          {station.services.map((service, i) => (
            <li key={i}>{service}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Opening Hours</h3>
        <ul>
          {Object.entries(station.openingHours).map(([day, hours]) => (
            <li key={day}>
              <strong>{day.toUpperCase()}</strong>: {hours}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
