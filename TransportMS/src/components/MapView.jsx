import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import the marker icons as modules
import customIconUrl from "../assets/plocation.png";

// Set up the custom Leaflet marker icon
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [25, 41], // Adjust if necessary
  iconAnchor: [12, 41], // Adjust if necessary
  popupAnchor: [1, -34], // Adjust if necessary
});

// Define the bounds for the world
const worldBounds = [
  [-85, -180], // Southwest corner (restricting slightly above -90 to avoid tile gaps)
  [85, 180], // Northeast corner
];

const MapView = ({ vehicles }) => {
  return (
    <MapContainer
      center={[15, 40]} // Adjust to your preferred default center
      zoom={3}
      minZoom={2} // Prevent excessive zooming out
      maxZoom={100}
      maxBounds={worldBounds} // Restrict the map to the world bounds
      maxBoundsViscosity={1.0} // Ensures smooth panning near the edges
      crs={L.CRS.EPSG3857} // Default CRS to ensure proper wrapping behavior
      style={{ height: "70vh", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.latitude, vehicle.longitude]}
          icon={customIcon} // Use the custom icon
        >
          <Popup>
            <span>Vehicle ID: {vehicle.id}</span>
            <br />
            <span>Customer: {vehicle.customer}</span>
            <br />
            <span>Status: {vehicle.status}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
