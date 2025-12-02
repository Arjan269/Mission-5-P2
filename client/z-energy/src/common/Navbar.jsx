import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        background: "#f0f0f0",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/locations">Locations</Link>
      <Link to="/price-comp">Price Comparison</Link> {/* NEW LINK */}
    </nav>
  );
}
