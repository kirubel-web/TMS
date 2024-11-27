import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";

const RoutePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/loads");
        const data = await response.json();
        const vehicleLocations = data.loads.map(load => ({
          id: load.vehicleId,
          latitude: load.pickup.latitude,
          longitude: load.pickup.longitude,
          status: load.status,
        }));
        setVehicles(vehicleLocations);
		  console.log(vehicleLocations)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle locations:", error);
        setLoading(false);
      }
    };

    fetchVehicleLocations();
    const interval = setInterval(fetchVehicleLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Live Vehicle Tracking</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
        </div>
      ) : (
        <div className="h-[60vh]">
          <MapView vehicles={vehicles} />
        </div>
      )}
    </div>
  );
};

export default RoutePage;
