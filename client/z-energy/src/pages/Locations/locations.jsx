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

  // use API to get all Stations +  set setSelectedStation + derive allServices (unique services) from allStations.services
  useEffect(() => {
    const fetchAllData = async () => {
      setIsloaded(false);

      const fetchStations = async () => {
        try {
          const resStations = await axios.get(
            `${import.meta.env.VITE_API_URI}/api/stations/list`
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

      // Wait for both to finish
      await Promise.all([fetchStations(), fetchServices()]);

      setIsloaded(true);
    };

    fetchAllData();
  }, []);

  // TODO: very later on, implement prompt to ask for users location - and send list of stations in sorted order relative to users location

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
          console.log(userCoords);
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

  // Fetch filtered stations whenever selectedServices changes
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

        setUseStations(res.data);
        console.log("res.data.length", res.data.length);
        if (res.data.length > 0) {
          setSelectedStation(res.data[0]);
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
      <div className={styles.filterMenuContainer}>
        <LocationFilterMenu
          services={allServices}
          selectedServices={selectedServices}
          onSelectService={setSelectedServices}
        />
      </div>

      <div className={styles.cardsAndMap}>
        {/* Overlay */}
        <div className={styles.cardOverlayContainer}>
          {/* TODO : if user agrees to share location - add text that says "Closest to you" */}
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

        {/* Map */}
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
