// src/pages/FuelPriceComparePage/PriceComp.jsx
import { useEffect, useState } from "react";

import StationDropdown from "../../components/StationDropdown/StationDropdown.jsx";
import StationCard from "../../components/StationCard/StationCard.jsx";
import CompareGrid from "../../components/CompareGrid/CompareGrid.jsx";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";

import styles from "./PriceCompStyles.module.css";

const API_URL = "http://localhost:5050/api/stations";

// Local distance helper (frontend only, doesn't touch backend utils)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

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

  // store user location (frontend only)
  const [userLocation, setUserLocation] = useState(null);

  // Ask for location, then fetch stations
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setUserLocation({ lat, lng });
        setLocationEnabled(true);

        try {
          setLoading(true);
          const res = await fetch(API_URL);
          const data = await res.json();
          setStations(data || []);
          setError("");
        } catch (err) {
          console.error(err);
          setError("Unable to load stations. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      async () => {
        // ❌ User denied location → still fetch stations, just no distance
        setLocationEnabled(false);
        try {
          setLoading(true);
          const res = await fetch(API_URL);
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
    );
  }, []);

  const leftStation = stations.find((s) => s._id === leftId) || null;
  const rightStation = stations.find((s) => s._id === rightId) || null;

  const leftPrices = getFuelPricesForStation(leftStation, fuelFilter);
  const rightPrices = getFuelPricesForStation(rightStation, fuelFilter);

  let leftDistance = null;
  let rightDistance = null;

  if (
    userLocation &&
    leftStation &&
    leftStation.coordinates &&
    typeof leftStation.coordinates.lat === "number" &&
    typeof leftStation.coordinates.lng === "number"
  ) {
    leftDistance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      leftStation.coordinates.lat,
      leftStation.coordinates.lng
    );
  }

  if (
    userLocation &&
    rightStation &&
    rightStation.coordinates &&
    typeof rightStation.coordinates.lat === "number" &&
    typeof rightStation.coordinates.lng === "number"
  ) {
    rightDistance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      rightStation.coordinates.lat,
      rightStation.coordinates.lng
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <HeroSection />

      <div className={styles.compareCard}>
        {/* ---------- FUEL FILTER + LOCATION WARNING ---------- */}
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

        {/* ---------- LOADING / ERROR ---------- */}
        {loading && <p className={styles.statusText}>Loading stations…</p>}
        {error && !loading && (
          <p className={styles.errorText}>{error}</p>
        )}

        {/* ---------- GRID ---------- */}
        {!loading && !error && (
          <CompareGrid>
            <div className={styles.columnsWrapper}>
              {/* LEFT COLUMN */}
              <div className={styles.column}>
                <div className={styles.dropdownWrapper}>
                  <StationDropdown
                    stations={stations}
                    selectedId={leftId}
                    onChange={setLeftId}
                    label="Select a station"
                  />
                </div>

                <StationCard
                  station={leftStation}
                  prices={leftPrices}
                  distance={leftDistance}
                />
              </div>

              {/* DIVIDER */}
              <div className={styles.verticalDivider} />

              {/* RIGHT COLUMN */}
              <div className={styles.column}>
                <div className={styles.dropdownWrapper}>
                  <StationDropdown
                    stations={stations}
                    selectedId={rightId}
                    onChange={setRightId}
                    label="Select a station"
                  />
                </div>

                <StationCard
                  station={rightStation}
                  prices={rightPrices}
                  distance={rightDistance}
                />
              </div>
            </div>
          </CompareGrid>
        )}
      </div>
    </div>
  );
}
