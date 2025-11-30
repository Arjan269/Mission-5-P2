import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ZMaps from "./pages/Z-maps";
import PriceComp from "./pages/Price-comp";  // NEW IMPORT
import Navbar from "./common/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<ZMaps />} />
        <Route path="/price-comp" element={<PriceComp />} /> {/* NEW ROUTE */}
      </Routes>
    </BrowserRouter>
  );
}
