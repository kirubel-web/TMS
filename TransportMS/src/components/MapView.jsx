import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import the marker icons as modules
import customIconUrl from "../assets/logo1.png";
import customIconRetinaUrl from "../assets/logo1.png";
import customShadowUrl from "../assets/logo1.png";

// Set up the custom Leaflet marker icon
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconRetinaUrl: customIconRetinaUrl, // Optional
  shadowUrl: customShadowUrl, // Optional
  iconSize: [25, 41], // Adjust if necessary
  iconAnchor: [12, 41], // Adjust if necessary
  popupAnchor: [1, -34], // Adjust if necessary
  shadowSize: [41, 41], // Adjust if necessary
});

const MapView = ({ vehicles }) => {
  return (
    <MapContainer
      center={[19, 40]} // Adjust to your preferred default center
      zoom={3}
      attributionControl={false}
      style={{ height: "50vh", width: "100%" }}
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
