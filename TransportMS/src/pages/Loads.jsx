import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Loads = () => {
  const [loads, setLoads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    customer: "",
    driver: "",
    vehicle: "",
    pickup: { address: "", date: "", time: "" },
    delivery: { address: "", date: "", time: "" },
    price: "",
    weight: "",
    description: "",
    specialInstructions: "",
  });

  useEffect(() => {
    fetchLoads();
    fetchCustomers();
    fetchDrivers();
    fetchVehicles();
  }, []);

  const fetchLoads = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/loads");
      const data = await response.json();
      setLoads(data.loads || []);
    } catch (error) {
      console.error("Error fetching loads:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/customers");
      const data = await response.json();
      setCustomers(data.customers || []);
      console.log(data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drivers");
      const data = await response.json();
      setDrivers(data.drivers || []);
      console.log(data.drivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vehicles");
      const data = await response.json();
      setVehicles(data.vehicles || []);
      console.log(data.vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      customer: "",
      driver: "",
      vehicle: "",
      pickup: { address: "", date: "", time: "" },
      delivery: { address: "", date: "", time: "" },
      price: "",
      weight: "",
      description: "",
      specialInstructions: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.customer ||
      !formData.driver ||
      !formData.vehicle ||
      !formData.price
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/loads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create load");
      }

      const data = await response.json();

      if (data.success) {
        await fetchLoads();
        setIsModalOpen(false);
        console.log(data);
        resetForm();
      } else {
        alert(data.message || "Failed to create load");
      }
    } catch (error) {
      console.error("Error creating load:", error);
      alert("Error creating load. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Loads</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          New Load
        </button>
      </div>

      {/* Loads Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Load Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loads.map((load) => (
              <tr key={load._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {load.loadNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {load.customer &&
                    `${load.customer.firstName} ${load.customer.lastName}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {load.driver && `${load.driver.name}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {load.vehicle &&
                    `${load.vehicle.manufacturer} ${load.vehicle.model}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      load.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : load.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {load.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Load Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <Dialog.Title className="text-lg font-semibold text-gray-800">
            Create New Load
          </Dialog.Title>
          <Dialog.Description className="text-gray-500 mb-4">
            Fill in the details to create a new load.
          </Dialog.Description>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {`${customer.firstName} ${customer.lastName}`}
                  </option>
                ))}
              </select>
              <select
                name="driver"
                value={formData.driver}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver._id} value={driver._id}>
                    {`${driver.name}`}
                  </option>
                ))}
              </select>
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {`${vehicle.manufacturer} ${vehicle.model} (${vehicle.licensePlate})`}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Price"
                required
              />
              <input
                type="text"
                name="pickup.address"
                value={formData.pickup.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Pickup Address"
              />
              <input
                type="date"
                name="pickup.date"
                value={formData.pickup.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="time"
                name="pickup.time"
                value={formData.pickup.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="delivery.address"
                value={formData.delivery.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Delivery Address"
              />
              <input
                type="date"
                name="delivery.date"
                value={formData.delivery.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="time"
                name="delivery.time"
                value={formData.delivery.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Weight"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-2 w-full p-2 border border-gray-300 rounded resize-none"
                placeholder="Description"
              ></textarea>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                className="col-span-2 w-full p-2 border border-gray-300 rounded resize-none"
                placeholder="Special Instructions"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 bg-gray-200 text-gray-600 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Loads;
