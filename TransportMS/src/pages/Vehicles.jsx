import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Vehicles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    vehicleId: null,
    vehicleName: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    type: "truck", // Options: truck, trailer, etc.
    licensePlate: "",
    manufacturer: "",
    model: "",
    year: "",
    status: "active", // Options: active, inactive, etc.
  });

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vehicles");
      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }
      const data = await response.json();
      setVehicles(data.vehicles);
    } catch (error) {
      setError("Failed to fetch vehicles");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoaded(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/vehicles/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const newVehicle = await response.json();
      setVehicles((prevVehicles) => [...prevVehicles, newVehicle.vehicle]);
      setIsOpen(false);
      setFormData({
        name: "",
        type: "truck",
        licensePlate: "",
        manufacturer: "",
        model: "",
        year: "",
        status: "active",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoaded(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vehicles/${vehicleId}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle._id !== vehicleId),
      );
      closeDeleteConfirm();
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteConfirm = (vehicleId, vehicleName) => {
    setDeleteConfirm({
      isOpen: true,
      vehicleId,
      vehicleName,
    });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({
      isOpen: false,
      vehicleId: null,
      vehicleName: "",
    });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Vehicles</h2>

      <div className="bg-white p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>All</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-md">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Vehicles</h3>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
          >
            Add New
          </button>
        </div>
        <div className="p-4">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b font-semibold">Name</th>
                <th className="px-4 py-2 border-b font-semibold">Type</th>
                <th className="px-4 py-2 border-b font-semibold">
                  License Plate
                </th>
                <th className="px-4 py-2 border-b font-semibold">
                  Manufacturer
                </th>
                <th className="px-4 py-2 border-b font-semibold">Model</th>
                <th className="px-4 py-2 border-b font-semibold">Year</th>
                <th className="px-4 py-2 border-b font-semibold">Status</th>
                <th className="px-4 py-2 border-b font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="border-b">
                    <td className="px-4 py-2">{vehicle.name}</td>
                    <td className="px-4 py-2">{vehicle.type}</td>
                    <td className="px-4 py-2">{vehicle.licensePlate}</td>
                    <td className="px-4 py-2">{vehicle.manufacturer}</td>
                    <td className="px-4 py-2">{vehicle.model}</td>
                    <td className="px-4 py-2">{vehicle.year}</td>
                    <td className="px-4 py-2">{vehicle.status}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          openDeleteConfirm(vehicle._id, vehicle.name)
                        }
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-gray-500 text-center">
                    No vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Add Vehicle
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="truck">Truck</option>
                      <option value="trailer">Trailer</option>
                      <option value="car">Car</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      License Plate
                    </label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
                      disabled={isLoaded}
                    >
                      {isLoaded ? "Loading..." : "Save"}
                    </button>
                  </div>
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Modal */}
      <Transition show={deleteConfirm.isOpen} as={React.Fragment}>
        <Dialog
          onClose={closeDeleteConfirm}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Confirm Delete
                </Dialog.Title>
                <div className="mt-4">
                  <p>
                    Are you sure you want to delete the vehicle{" "}
                    <span className="font-semibold">
                      {deleteConfirm.vehicleName}
                    </span>
                    ?
                  </p>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={closeDeleteConfirm}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(deleteConfirm.vehicleId)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Vehicles;