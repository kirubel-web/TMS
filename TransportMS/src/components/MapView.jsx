import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import the marker icons as modules
import iconRetinaUrl from "leaflet/dist/images/marker-icon.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Set up the default Leaflet marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapView = ({ vehicles }) => {
  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Adjust to your preferred default center
      zoom={13}
      // adjust location to the right Side

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
        >
          <Popup>
            <span>Vehicle ID: {vehicle.id}</span>
            <br />
            <span>Status: {vehicle.status}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
