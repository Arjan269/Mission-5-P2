import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useEffect } from "react";
import styles from "./MapWithPins.module.css";

export default function MapWithPins({
  stations,
  selectedStation,
  onSelectStation,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapRef.current && selectedStation) {
      mapRef.current.setZoom(14); 
      mapRef.current.panTo({
        lat: selectedStation.coordinates.lat,
        lng: selectedStation.coordinates.lng,
      });
    }
  }, [selectedStation]);

  const defaultCenter = {
    lat: stations[0].coordinates.lat,
    lng: stations[0].coordinates.lng,
  };

  return (
    <div className={styles.outerDiv}>
      {isLoaded && (
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={defaultCenter} 
          zoom={14}
        >
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
