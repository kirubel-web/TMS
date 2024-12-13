import React, { useState } from "react";

const CustomerPage = () => {
  const [formData, setFormData] = useState({
    customer: "",
    driver: "",
    vehicle: "",
    pickup: { latitude: "", longitude: "", date: "" },
    delivery: { latitude: "", longitude: "", date: "" },
    price: "",
    weight: "",
    description: "",
    specialInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("pickup.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        pickup: { ...formData.pickup, [field]: value },
      });
    } else if (name.startsWith("delivery.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        delivery: { ...formData.delivery, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="customer-page max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Request Transport Management</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Customer Name</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Driver Name</label>
            <input
              type="text"
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Vehicle</label>
            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Pickup Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Latitude</label>
              <input
                type="text"
                name="pickup.latitude"
                value={formData.pickup.latitude}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Longitude</label>
              <input
                type="text"
                name="pickup.longitude"
                value={formData.pickup.longitude}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                name="pickup.date"
                value={formData.pickup.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Delivery Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Latitude</label>
              <input
                type="text"
                name="delivery.latitude"
                value={formData.delivery.latitude}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Longitude</label>
              <input
                type="text"
                name="delivery.longitude"
                value={formData.delivery.longitude}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                name="delivery.date"
                value={formData.delivery.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CustomerPage;
