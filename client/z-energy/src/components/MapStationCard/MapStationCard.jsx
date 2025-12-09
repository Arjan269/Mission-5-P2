import styles from "./MapStationCard.module.css";
import { useNavigate } from "react-router-dom";

export default function MapStationCard({ station, onClick }) {
  const navigate = useNavigate();

  const handleVisitClick = () => {
    navigate("/station", { state: { station: station } });
  };

  return station ? (
    <div className={styles.card} onClick={onClick}>
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
          <button className={styles.visitButton} onClick={handleVisitClick}>
            Visit Now
            <span className={styles.iconCircle}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#F47C20"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 2 L8 6 L4 10" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p className={styles.noStations}>No stations available</p>
    </div>
  );
}
