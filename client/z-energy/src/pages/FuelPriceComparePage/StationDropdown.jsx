import { useEffect, useState } from "react";
import styles from "./priceCompStyles.module.css";

export default function StationDropdown({ onSelect }) {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stations/list")
      .then((res) => res.json())
      .then((data) => setStations(data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  const handleSelect = async (e) => {
    const id = e.target.value;
    if (!id) return;

    const res = await fetch(`http://localhost:5000/api/stations/${id}`);
    const data = await res.json();
    onSelect(data);
  };

  return (
    <select className={styles.dropdown} onChange={handleSelect}>
      <option value="">Select a station...</option>
      {stations.map((station) => (
        <option key={station._id} value={station._id}>
          {station.name}
        </option>
      ))}
    </select>
  );
}
