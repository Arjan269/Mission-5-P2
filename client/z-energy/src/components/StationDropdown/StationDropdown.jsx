import { useState, useRef, useEffect } from "react";
import styles from "./StationDropdown.module.css";
import ArrowIcon from "../../assets/arrow.png";

export default function StationDropdown({
  stations,
  selectedId,
  onChange,
  label,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedStation = stations.find((s) => s._id === selectedId);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      {/* Orange pill button */}
      <button
        type="button"
        className={styles.selectContainer}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={selectedStation ? selectedStation.name : label}
      >
        <span className={styles.selectedText}>
          {selectedStation ? selectedStation.name : label}
        </span>

        {/* White circle arrow */}
        <div className={styles.arrowCircle}>
          <img
            src={ArrowIcon}
            alt="arrow"
            className={`${styles.arrowIcon} ${open ? styles.arrowOpen : ""}`}
          />
        </div>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className={styles.dropdownMenu}
          role="listbox"
          aria-label="Select a station"
        >
          {stations.map((station) => (
            <div
              key={station._id}
              className={styles.dropdownOption}
              role="option"
              aria-selected={station._id === selectedId}
              onClick={() => {
                onChange(station._id);
                setOpen(false);
              }}
            >
              {station.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
