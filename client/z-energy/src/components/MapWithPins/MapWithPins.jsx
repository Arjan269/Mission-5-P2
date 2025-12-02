import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import styles from "./MapWithPins.module.css";

export default function MapWithPins({
  stations,
  selectedStation,
  onSelectStation,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = selectedStation
    ? { lat: selectedStation.lat, lng: selectedStation.lng }
    : { lat: stations[0].lat, lng: stations[0].lng };

  return (
    <div className={styles.outerDiv}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={14}
        >
          {selectedStation && (
            <Marker
              position={{ lat: selectedStation.lat, lng: selectedStation.lng }}
              onClick={() => onSelectStation(selectedStation)}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
}
