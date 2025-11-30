import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ZMaps from "./pages/Z-maps";
import Navbar from "./common/Navbar"; // import Navbar

export default function App() {
  return (
    <BrowserRouter>
      {/* Use the common Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<ZMaps />} />
      </Routes>
    </BrowserRouter>
  );
}
