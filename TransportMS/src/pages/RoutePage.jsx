// RoutePage.js (or RoutePage.jsx)
import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";

const RoutePage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicleLocations = () => {
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

    const interval = setInterval(fetchVehicleLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Live Vehicle Tracking</h1>
      <MapView vehicles={vehicles} />
    </div>
  );
};

export default RoutePage;
