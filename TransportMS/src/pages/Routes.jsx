import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";
import "./RoutePage.css";

const RoutePage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicleLocations = () => {
      // Replace with your real API or WebSocket data fetching
      setVehicles([
        {
          id: "vehicle1",
          latitude: 37.7749,
          longitude: -122.4194,
          status: "Active",
        },
        {
          id: "vehicle2",
          latitude: 34.0522,
          longitude: -118.2437,
          status: "Active",
        },
      ]);
    };

    fetchVehicleLocations();

    // Update vehicle locations every 5 seconds
    const interval = setInterval(fetchVehicleLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Live Vehicle Tracking</h1>
      <MapView vehicles={vehicles} />
    </div>
  );
};

export default RoutePage;
