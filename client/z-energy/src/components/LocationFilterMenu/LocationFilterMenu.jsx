import { useState, useRef } from "react";
import styles from "./LocationFilterMenu.module.css";
import SearchIcon from "../../assets/Search.svg";

export default function LocationFilterMenu({
  services,
  selectedServices,
  onSelectService,
}) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      onSelectService(selectedServices.filter((s) => s !== service));
    } else {
      onSelectService([...selectedServices, service]);
    }
  };

  // Filter services based on search term
  const filteredServices = services.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchClick = () => {
    setSearchActive(true);
    setTimeout(() => inputRef.current?.focus(), 0); // focus after render
  };

  const handleBlur = () => {
    setSearchActive(false);
    setSearchTerm(""); // reset search
  };

  return (
    <div className={styles.filterMenu}>
      {searchActive ? (
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleBlur}
          placeholder="Search services..."
          aria-label="Search services"
        />
      ) : (
        <button
          className={styles.searchButton}
          onClick={handleSearchClick}
          aria-label="Search services"
        >
          <img src={SearchIcon} className={styles.searchIcon} />
        </button>
      )}

      <div className={styles.servicesContainer}>
        {[
          ...filteredServices
            .filter((s) => selectedServices.includes(s))
            .sort((a, b) => a.localeCompare(b)),
          ...filteredServices
            .filter((s) => !selectedServices.includes(s))
            .sort((a, b) => a.localeCompare(b)),
        ].map((service) => (
          <button
            key={service}
            className={
              selectedServices.includes(service)
                ? styles.selected
                : styles.unselected
            }
            onMouseDown={() => toggleService(service)}
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
