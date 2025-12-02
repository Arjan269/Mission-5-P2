import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/locations";
import PriceComp from "./pages/FuelPriceComparePage/PriceComp"; // NEW IMPORT
import Navbar from "./common/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/price-comp" element={<PriceComp />} /> {/* NEW ROUTE */}
      </Routes>
    </BrowserRouter>
  );
}
