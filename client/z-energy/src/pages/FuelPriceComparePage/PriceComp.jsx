import { useEffect, useState } from "react";
import styles from "./priceCompStyles.module.css";
import StationDropdown from "./StationDropdown";
import StationCard from "./StationCard";
import HeroSection from "../../components/HeroSection/HeroSection";

const API_URL = "http://localhost:5050/api/stations";

function getFuelPricesForStation(station, fuelFilter) {
  if (!station || !station.prices) return [];

  const result = [];
  const prices = station.prices;

  const matchesFuel = (label, filter) => {
    const l = (label || "").toLowerCase();
    if (filter === "all") return true;
    if (filter === "91") return l.includes("91");
    if (filter === "95") return l.includes("95") || l.includes("premium");
    if (filter === "diesel") return l.includes("diesel");
    return true;
  };

  if (Array.isArray(prices)) {
    prices.forEach((p) => {
      if (!p) return;
      const label = p.fuelType || "";
      const price = p.price;
      if (price == null) return;
      if (!matchesFuel(label, fuelFilter)) return;

      result.push({ label, price });
    });
    return result;
  }

  Object.entries(prices).forEach(([label, value]) => {
    if (!matchesFuel(label, fuelFilter)) return;

    let price = null;
    if (typeof value === "number") price = value;
    else if (value && typeof value === "object" && "price" in value) {
      price = value.price;
    }
    if (price == null) return;

    result.push({ label, price });
  });

  return result;
}

export default function PriceComp() {
  const [stations, setStations] = useState([]);
  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    async function loadStations() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch stations");
        const data = await res.json();
        setStations(data || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load stations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadStations();
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      () => setLocationEnabled(true),
      () => setLocationEnabled(false),
      { timeout: 3000 }
    );
  }, []);

  const leftStation = stations.find((s) => s._id === leftId) || null;
  const rightStation = stations.find((s) => s._id === rightId) || null;

  const leftPrices = getFuelPricesForStation(leftStation, fuelFilter);
  const rightPrices = getFuelPricesForStation(rightStation, fuelFilter);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero only on this page */}
      <HeroSection />

      {/* Main compare content */}
      <div className={styles.compareCard}>
        <div className={styles.topRow}>
          {!locationEnabled && (
            <p className={styles.locationHint}>
              <span className={styles.locationIcon}>ⓘ</span>
              Please enable location access for better accuracy:
            </p>
          )}

          <div className={styles.fuelFilterRow}>
            <span className={styles.fuelFilterLabel}>Fuel type:</span>

            <button
              type="button"
              className={`${styles.fuelFilterButton} ${
                fuelFilter === "all" ? styles.fuelFilterButtonActive : ""
              }`}
              onClick={() => setFuelFilter("all")}
            >
              ⛽ All
            </button>
            <button
              type="button"
              className={`${styles.fuelFilterButton} ${
                fuelFilter === "91" ? styles.fuelFilterButtonActive : ""
              }`}
              onClick={() => setFuelFilter("91")}
            >
              🟧 91
            </button>
            <button
              type="button"
              className={`${styles.fuelFilterButton} ${
                fuelFilter === "95" ? styles.fuelFilterButtonActive : ""
              }`}
              onClick={() => setFuelFilter("95")}
            >
              🟦 95
            </button>
            <button
              type="button"
              className={`${styles.fuelFilterButton} ${
                fuelFilter === "diesel" ? styles.fuelFilterButtonActive : ""
              }`}
              onClick={() => setFuelFilter("diesel")}
            >
              🛢 Diesel
            </button>
          </div>
        </div>

        {loading && <p className={styles.statusText}>Loading stations…</p>}
        {error && !loading && (
          <p className={styles.errorText}>{error}</p>
        )}

        {!loading && !error && (
          <div className={styles.columnsWrapper}>
            <div className={styles.column}>
              <StationDropdown
                stations={stations}
                selectedId={leftId}
                onChange={setLeftId}
                label="Select a station"
              />
              <StationCard
                station={leftStation}
                prices={leftPrices}
                fuelFilter={fuelFilter}
              />
            </div>

            <div className={styles.verticalDivider} />

            <div className={styles.column}>
              <StationDropdown
                stations={stations}
                selectedId={rightId}
                onChange={setRightId}
                label="Select a station"
              />
              <StationCard
                station={rightStation}
                prices={rightPrices}
                fuelFilter={fuelFilter}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
