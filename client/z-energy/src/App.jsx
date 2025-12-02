import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/locations";
import PriceComp from "./pages/FuelPriceComparePage/PriceComp"; // NEW IMPORT
import Navbar from "./common/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <Navbar />
        </header>

        <main className="container">
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
