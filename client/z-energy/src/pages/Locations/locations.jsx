import { useState, useEffect } from "react";
import styles from "./locations.module.css";
import MapStationCard from "../../components/MapStationCard/MapStationCard";
import MapWithPins from "../../components/MapWithPins/MapWithPins";
import LocationFilterMenu from "../../components/LocationFilterMenu/LocationFilterMenu";

//Will replace with actual API calls once backend is done
import tempStationsData from "./../../data/tempStationsData";

export default function Location() {
  const [selectedStation, setSelectedStation] = useState(tempStationsData[0]);
  const [selectedService, setSelectedService] = useState([]);
  const [allServices, setAllServices] = useState([]);

  // TODO: use API to get all Stations and set setSelectedStation

  // TODO: very later on, implement prompt to ask for users location - and send list of stations in sorted order relative to users location

  // TODO: API to get all services base on the enteries in the DB
  useEffect(() => {
    // Extract unique services from tempStationsData
    const servicesSet = new Set();
    tempStationsData.forEach((station) =>
      station.services.forEach((service) => servicesSet.add(service))
    );
    setAllServices([...servicesSet]);
  }, []);

  // TODO : Will be replaced by API "/stations/search?keyword=" which takes a list of selected services, and returns all stations with that service
  // Filter stations if a service is selected
  const filteredStations =
    selectedService.length > 0
      ? tempStationsData.filter((station) =>
          selectedService.every((service) => station.services.includes(service))
        )
      : tempStationsData;

  return (
    <div className={styles.container}>
      {/* Location Filter menu */}
      <div className={styles.filterMenuContainer}>
        <LocationFilterMenu
          stations={filteredStations}
          services={allServices}
          onSelectService={setSelectedService}
        />
      </div>

      <div className={styles.cardsAndMap}>
        {/* Overlay */}
        <div className={styles.cardOverlayContainer}>
          {tempStationsData.map((station) => (
            <div key={station.name} onClick={() => setSelectedStation(station)}>
              <MapStationCard station={station} />
            </div>
          ))}
        </div>

        {/* Map */}
        <div className={styles.mapContainer}>
          <MapWithPins
            stations={tempStationsData}
            selectedStation={selectedStation}
            onSelectStation={setSelectedStation}
          />
        </div>
      </div>
    </div>
  );
}
