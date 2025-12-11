// src/pages/FuelPriceComparePage/CompareGrid.jsx
import styles from "./CompareGrid.module.css";

export default function CompareGrid({ children }) {
  return (
    <div
      className={styles.compareGrid}
      role="region"
      aria-label="Fuel price comparison grid"
    >
      {children}
    </div>
  );
}
