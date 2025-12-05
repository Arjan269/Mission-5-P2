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

  // TODO: very later on, implement prompt to ask for users location - and send list of stations in sorted order relative to users location

  // use API to get all Stations +  set setSelectedStation + derive allServices (unique services) from allStations.services
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/stations/list`
        );
        const data = res.data;
        setAllStations(data);

        if (data.length > 0) setSelectedStation(data[0]);

        const servicesSet = new Set();
        data.forEach((station) =>
          station.services.forEach((service) => servicesSet.add(service))
        );
        setAllServices(
          Array.from(servicesSet).sort((a, b) => a.localeCompare(b))
        );

        setUseStations(data);
        setIsloaded(true);
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };

    fetchStations();
  }, []);

  // TODO : Will be replaced by API "/stations/search?keyword=" which takes a list
  // of selected services, and returns all stations with that service
  // Fetch filtered stations whenever selectedServices changes
  useEffect(() => {
    const getFilteredStations = async () => {
      setIsloaded(false);

      if (selectedServices.length === 0) {
        setUseStations(allStations);
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
          {useStations.length > 0 ? (
            useStations.map((station) => (
              <MapStationCard key={station.name} station={station} />
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
