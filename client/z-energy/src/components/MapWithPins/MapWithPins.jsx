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
    ? {
        lat: selectedStation.coordinates.lat,
        lng: selectedStation.coordinates.lng,
      }
    : { lat: stations[0].coordinates.lat, lng: stations[0].coordinates.lng };

  return (
    <div className={styles.outerDiv}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={14}
        >
          {/* Show all pins */}
          {stations.map((station) => (
            <Marker
              key={station._id}
              position={{
                lat: station.coordinates.lat,
                lng: station.coordinates.lng,
              }}
              onClick={() => onSelectStation(station)}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}
