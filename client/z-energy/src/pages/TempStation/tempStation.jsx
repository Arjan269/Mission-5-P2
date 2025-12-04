import { useLocation } from "react-router-dom";

export default function TempStationPage() {
  const location = useLocation();
  const station = location.state?.station || "Unknown"; 

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to {station.name} Station!</h1>
      <p>This is a placeholder page for now.</p>
    </div>
  );
}
