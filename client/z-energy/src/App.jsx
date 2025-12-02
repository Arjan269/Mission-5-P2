import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/locations";
import PriceComp from "./pages/FuelPriceComparePage/PriceComp"; // NEW IMPORT
import Navbar from "./common/Navbar";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <Navbar />
        </header>

        <main className={styles.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/price-comp" element={<PriceComp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
