import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useEffect } from "react";
import styles from "./MapWithPins.module.css";
import customMarker from "../../assets/customMarker.png";
import defaultMarker from "../../assets/defaultMarker.png";

export default function MapWithPins({
  stations = [],
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
    if (mapRef.current && selectedStation?.coordinates) {
      mapRef.current.setZoom(14);
      mapRef.current.panTo({
        lat: selectedStation.coordinates.lat,
        lng: selectedStation.coordinates.lng,
      });
    }
  }, [selectedStation]);

  // Set default center: use first station if available, otherwise fallback to a default location
  const defaultCenter = selectedStation?.coordinates ||
    stations[0]?.coordinates || { lat: -36.8485, lng: 174.7633 }; // Auckland center as default

  return (
    <div className={styles.outerDiv}>
      {isLoaded && (
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={defaultCenter}
          zoom={14}
          options={{
            disableDefaultUI: true, // disables all controls
            zoomControl: false, // hide zoom buttons
            mapTypeControl: false, // hide Map / Satellite toggle
            streetViewControl: false, // hide Pegman
            fullscreenControl: true, // show fullscreen button
            rotateControl: false, // disable rotate control
            gestureHandling: "greedy", // allow drag + scroll without controls interfering
          }}
        >
          {/* Only render markers if stations exist */}
          {stations.length > 0 &&
            stations.map(
              (station) =>
                station.coordinates && (
                  <Marker
                    key={station._id}
                    position={{
                      lat: station.coordinates.lat,
                      lng: station.coordinates.lng,
                    }}
                    onClick={() => onSelectStation(station)}
                    icon={
                      selectedStation?._id === station._id
                        ? customMarker
                        : defaultMarker
                    }
                  />
                )
            )}
        </GoogleMap>
      )}
    </div>
  );
}
