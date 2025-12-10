import { useState, useEffect } from "react";
import styles from "./locations.module.css";
import MapStationCard from "../../components/MapStationCard/MapStationCard";
import MapWithPins from "../../components/MapWithPins/MapWithPins";
import LocationFilterMenu from "../../components/LocationFilterMenu/LocationFilterMenu";
import axios from "axios";

export default function Location() {
  const [allStations, setAllStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [useStations, setUseStations] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoaded, setIsloaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [isSharingLocation, setIsSharingLocation] = useState(false);

  // Fetch all stations and available services on initial page load
  // Sets the first station as selected by default and stores all unique services
  useEffect(() => {
    const fetchAllData = async () => {
      setIsloaded(false);

      const fetchStations = async () => {
        try {
          const resStations = await axios.get(
            `${import.meta.env.VITE_API_URI}/api/stations/`
          );
          const stations = resStations.data;
          setAllStations(stations);
          if (stations.length > 0) setSelectedStation(stations[0]);
          setUseStations(stations);
        } catch (err) {
          console.error("Error fetching stations:", err);
        }
      };

      const fetchServices = async () => {
        try {
          const resServices = await axios.get(
            `${import.meta.env.VITE_API_URI}/api/stations/services`
          );
          setAllServices(resServices.data);
        } catch (err) {
          console.error("Error fetching services:", err);
        }
      };

      // Wait for both stations and services to be fetched before marking as loaded
      await Promise.all([fetchStations(), fetchServices()]);

      setIsloaded(true);
    };

    fetchAllData();
  }, []);

  // Request the user's geolocation once the page has loaded
  // Stores the location in state if permission is granted
  useEffect(() => {
    const requestUserLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          setUserLocation(userCoords);
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    };

    if (isLoaded && userLocation === null) {
      requestUserLocation();
    }
  }, [isLoaded]);

  // Fetch stations near the user's current location
  // Updates the list of stations and sets the closest station as selected
  useEffect(() => {
    const fetchNearby = async () => {
      if (!userLocation) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/stations/nearby`,
          { params: userLocation }
        );

        setAllStations(res.data);
        setUseStations(res.data);
        setIsSharingLocation(true);
        if (res.data.length > 0) {
          setSelectedStation(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching nearby stations:", err);
      }
    };

    fetchNearby();
  }, [userLocation]);

  // Fetch filtered stations whenever selected services change
  // Updates the displayed list and keeps the first filtered station selected
  useEffect(() => {
    const getFilteredStations = async () => {
      setIsloaded(false);

      if (selectedServices.length === 0) {
        setUseStations(allStations);
        if (allStations.length > 0) setSelectedStation(allStations[0]);
        setIsloaded(true);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/stations/search`,
          {
            params: { services: selectedServices.join(",") },
          }
        );

        // Preserve the original order of allStations while filtering
        const filtered = allStations.filter((s) =>
          res.data.some((r) => r._id === s._id)
        );

        setUseStations(filtered);
        if (filtered.length > 0) {
          setSelectedStation(filtered[0]);
        }

        setIsloaded(true);
      } catch (err) {
        console.error("Error fetching filtered stations:", err);
        setUseStations(allStations);
        setIsloaded(true);
      }
    };

    getFilteredStations();
  }, [selectedServices, allStations]);

  return isLoaded ? (
    <div className={styles.container}>
      {/* Location Filter menu */}
      <div
        className={styles.filterMenuContainer}
        role="region"
        aria-label="Station services filter"
      >
        <LocationFilterMenu
          services={allServices}
          selectedServices={selectedServices}
          onSelectService={setSelectedServices}
        />
      </div>

      <div className={styles.cardsAndMap}>
        {/* Overlay with station cards */}
        <div
          className={styles.cardOverlayContainer}
          role="region"
          aria-label="Station list"
        >
          {isSharingLocation && (
            <div className={styles.closestLabel}>Closest to you</div>
          )}

          {useStations.length > 0 ? (
            useStations.map((station) => (
              <MapStationCard
                key={station.name}
                station={station}
                onClick={() => setSelectedStation(station)}
              />
            ))
          ) : (
            <MapStationCard station={null} />
          )}
        </div>

        {/* Map showing station locations */}
        <div className={styles.mapContainer}>
          {selectedStation && (
            <MapWithPins
              stations={useStations}
              selectedStation={selectedStation}
              onSelectStation={setSelectedStation}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.loading}>Loading...</div>
  );
}
