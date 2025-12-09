import { useState } from "react";
import styles from "./LocationFilterMenu.module.css";
import SearchIcon from "../../assets/Search.svg";

export default function LocationFilterMenu({
  services,
  selectedServices,
  onSelectService,
}) {
  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      onSelectService(selectedServices.filter((s) => s !== service));
    } else {
      onSelectService([...selectedServices, service]);
    }
  };

  return (
    <div className={styles.filterMenu}>
      <button className={styles.searchButton} aria-label="Search services">
        <img src={SearchIcon} className={styles.searchIcon} />
      </button>
      <div className={styles.servicesContainer}>
        {[
          ...services
            .filter((s) => selectedServices.includes(s))
            .sort((a, b) => a.localeCompare(b)), // selected, alphabetical
          ...services
            .filter((s) => !selectedServices.includes(s))
            .sort((a, b) => a.localeCompare(b)), // unselected, alphabetical
        ].map((service) => (
          <button
            key={service}
            className={
              selectedServices.includes(service)
                ? styles.selected
                : styles.unselected
            }
            onClick={() => toggleService(service)}
            aria-pressed={selectedServices.includes(service)}
            aria-label={
              selectedServices.includes(service)
                ? `${service}, selected`
                : `${service}, unselected`
            }
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}
