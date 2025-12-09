import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
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
  const markersRef = useRef([]); // store AdvancedMarkerElement instances
  const markerLibraryRef = useRef(null);

  // Load map
  const onLoad = async (map) => {
    mapRef.current = map;

    // Load Google marker library once
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    markerLibraryRef.current = { AdvancedMarkerElement };

    renderMarkers(); // render initial markers
  };

  // Helper to clear markers
  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  // Render AdvancedMarkers
  const renderMarkers = () => {
    if (!mapRef.current || !markerLibraryRef.current) return;

    const { AdvancedMarkerElement } = markerLibraryRef.current;

    clearMarkers();

    stations.forEach((station) => {
      if (!station.coordinates) return;

      const isSelected = selectedStation?._id === station._id;
      const iconUrl = isSelected ? customMarker : defaultMarker;

      // Use an <img> as the marker content
      const img = document.createElement("img");
      img.src = iconUrl;
      img.style.cursor = "pointer";

      const marker = new AdvancedMarkerElement({
        map: mapRef.current,
        position: {
          lat: station.coordinates.lat,
          lng: station.coordinates.lng,
        },
        content: img,
      });

      marker.addListener("click", () => onSelectStation(station));

      markersRef.current.push(marker);
    });
  };

  // Update marker icons when the selected station changes
  useEffect(() => {
    renderMarkers();
  }, [selectedStation, stations]);

  // Pan map when a station is selected
  useEffect(() => {
    if (mapRef.current && selectedStation?.coordinates) {
      mapRef.current.setZoom(14);
      mapRef.current.panTo({
        lat: selectedStation.coordinates.lat,
        lng: selectedStation.coordinates.lng,
      });
    }
  }, [selectedStation]);

  const defaultCenter = selectedStation?.coordinates ||
    stations[0]?.coordinates || {
      lat: -36.8485,
      lng: 174.7633,
    };

  return (
    <div className={styles.outerDiv}>
      {isLoaded && (
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={defaultCenter}
          zoom={14}
          options={{
            mapId: "DEMO_MAP_ID",
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            rotateControl: false,
            gestureHandling: "greedy",
          }}
        />
      )}
    </div>
  );
}
