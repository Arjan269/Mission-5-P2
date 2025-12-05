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
      <button className={styles.searchButton}>
        <img src={SearchIcon} className={styles.searchIcon} />
      </button>
      <div className={styles.servicesContainer}>
        {services.map((service) => (
          <button
            key={service}
            className={
              selectedServices.includes(service) ? styles.selected : ""
            }
            onClick={() => toggleService(service)}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}
