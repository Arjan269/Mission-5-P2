import { useState, useEffect } from "react";
import styles from "./locations.module.css";
import MapStationCard from "../../components/MapStationCard/MapStationCard";
import MapWithPins from "../../components/MapWithPins/MapWithPins";
import LocationFilterMenu from "../../components/LocationFilterMenu/LocationFilterMenu";
import axios from "axios";

export default function Location() {
  const [allStations, setAllStations] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoaded, setIsloaded] = useState(false);

  // TODO: very later on, implement prompt to ask for users location - and send list of stations in sorted order relative to users location
  // TODO: API to get all services base on the enteries in the DB

  // use API to get all Stations +  set setSelectedStation + derive allServices (unique services) from allStations.services
  useEffect(() => {
    const fetchStations = async () => {
      try {
        // Fetch all Stations
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/stations/list`
        );
        const data = res.data;
        console.log("Data: ", data);
        setAllStations(data);

        if (data.length > 0) {
          setSelectedStation(data[0]);
        }

        // TODO : I could make this into an API aswell : /api/stations/services
        // Extract unique services from API response
        const servicesSet = new Set();
        data.forEach((station) =>
          station.services.forEach((service) => servicesSet.add(service))
        );

        setAllServices([...servicesSet]);
        setIsloaded(true);
      } catch (err) {
        console.log("Error fetching stations:", err);
      }
    };

    fetchStations();
  }, []);


  // TODO : Will be replaced by API "/stations/search?keyword=" which takes a list 
  // of selected services, and returns all stations with that service

  if (!isLoaded) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Location Filter menu */}
      <div className={styles.filterMenuContainer}>
        <LocationFilterMenu
          services={allServices}
          onSelectService={setSelectedServices}
        />
      </div>

      <div className={styles.cardsAndMap}>
        {/* Overlay */}
        <div className={styles.cardOverlayContainer}>
          {allStations.map((station) => (
            <div key={station.name} onClick={() => setSelectedStation(station)}>
              <MapStationCard station={station} />
            </div>
          ))}
        </div>

        {/* Map */}
        <div className={styles.mapContainer}>
          <MapWithPins
            stations={allStations}
            selectedStation={selectedStation}
            onSelectStation={setSelectedStation}
          />
        </div>
      </div>
    </div>
  );
}
