import { useState } from "react";
import styles from "./LocationFilterMenu.module.css";

export default function LocationFilterMenu({
  stations,
  services,
  onSelectService,
}) {
  const [selected, setSelected] = useState([]);

  const toggleService = (service) => {
    let updated;
    if (selected.includes(service)) {
      updated = selected.filter((s) => s !== service);
    } else {
      updated = [...selected, service];
    }
    setSelected(updated);
    onSelectService(updated);
  };

  return (
    <div className={styles.filterMenu}>
      <button className={styles.searchButton}>🔍</button>
      <div className={styles.servicesContainer}>
        {services.map((service) => (
          <button
            key={service}
            className={selected.includes(service) ? styles.selected : ""}
            onClick={() => toggleService(service)}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}
