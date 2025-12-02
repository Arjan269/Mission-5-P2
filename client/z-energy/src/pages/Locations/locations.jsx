import styles from "./locations.module.css";
import MapStationCard from "../../components/MapStationCard/MapStationCard";
import tempStationsData from "./../../data/tempStationsData";

export default function Location() {
  return (
    <div className={styles.container}>
      {/* Overlay */}
      <div className={styles.cardOverlayContainer}>
        {tempStationsData.map((station) => (
          <MapStationCard key={station.name} station={station} />
        ))}
        ;
      </div>

      {/* Map */}
      <div className={styles.mapContainer}></div>
    </div>
  );
}
