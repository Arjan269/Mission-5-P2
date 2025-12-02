import { useState, useEffect } from "react";
import styles from "./locations.module.css";
import MapStationCard from "../../components/MapStationCard/MapStationCard";
import MapWithPins from "../../components/MapWithPins/MapWithPins";

//Will replace with actual API calls once backend is done
import tempStationsData from "./../../data/tempStationsData";
import tempCoordinates from "../../data/tempCoordinates";

export default function Location() {
  //combining the data together - to pass to <MapWithPins> Component
  const stationsWithCoords = tempStationsData.map((station) => {
    const coord = tempCoordinates.find((c) => c.name === station.name);
    return { ...station, ...coord };
  });

  const [selectedStation, setSelectedStation] = useState(stationsWithCoords[0]);

  return (
    <div className={styles.container}>
      {/* Overlay */}
      <div className={styles.cardOverlayContainer}>
        {stationsWithCoords.map((station) => (
          <div key={station.name} onClick={() => setSelectedStation(station)}>
            <MapStationCard station={station} />
          </div>
        ))}
      </div>

      {/* Map */}
      <div className={styles.mapContainer}>
        <MapWithPins
          stations={stationsWithCoords}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />
      </div>
    </div>
  );
}
