import { useState, useEffect } from "react";
import styles from "./locations.module.css";
import MapStationCard from "../../components/MapStationCard/MapStationCard";
import MapWithPins from "../../components/MapWithPins/MapWithPins";

//Will replace with actual API calls once backend is done
import tempStationsData from "./../../data/tempStationsData";


export default function Location() {

  const [selectedStation, setSelectedStation] = useState(tempStationsData[0]);

  return (
    <div className={styles.container}>
      {/* Overlay */}
      <div className={styles.cardOverlayContainer}>
        {tempStationsData.map((station) => (
          <div key={station.name} onClick={() => setSelectedStation(station)}>
            <MapStationCard station={station} />
          </div>
        ))}
      </div>

      {/* Map */}
      <div className={styles.mapContainer}>
        <MapWithPins
          stations={tempStationsData}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />
      </div>
    </div>
  );
}
