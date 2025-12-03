import { useState } from "react";
import StationDropdown from "./StationDropdown";
import StationCard from "./StationCard";
import CompareGrid from "./CompareGrid";
import styles from "./priceCompStyles.module.css";

export default function PriceComp() {
  const [leftStation, setLeftStation] = useState(null);
  const [rightStation, setRightStation] = useState(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fuel Price Comparison</h1>

      <CompareGrid
        leftDropdown={<StationDropdown onSelect={setLeftStation} />}
        rightDropdown={<StationDropdown onSelect={setRightStation} />}
        leftCard={leftStation && <StationCard station={leftStation} />}
        rightCard={rightStation && <StationCard station={rightStation} />}
      />
    </div>
  );
}
