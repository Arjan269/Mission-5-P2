import { useState } from "react";
import styles from "./MapStationCard.module.css";
import { useNavigate } from "react-router-dom";

export default function MapStationCard({ station, onClick }) {
  const navigate = useNavigate();
  const [showHours, setShowHours] = useState(false);

  const handleVisitClick = () => {
    navigate("/station", { state: { station } });
  };

  return station ? (
    <div
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${station.name}`}
    >
      <div className={styles.topOfCard}>
        <h2>{station.name}</h2>
        <h3>{station.address}</h3>

        {station.isOpen24Hours ? (
          <p>Open 24 hours</p>
        ) : (
          <li
            className={styles.openingHours}
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              setShowHours(!showHours);
            }}
          >
            <p>Opening Hours {showHours ? "▲" : "▼"} </p>
            {showHours && (
              <ul className={styles.dailyHours}>
                {Object.entries(station.openingHours).map(([day, hour]) => (
                  <li key={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}: {hour}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
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
          <button
            className={styles.visitButton}
            onClick={handleVisitClick}
            aria-label={`Visit page for ${station.name}`}
          >
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
      <p className={styles.noStations} role="status">
        No stations available
      </p>
    </div>
  );
}
