import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const Drivers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    driverId: null,
    driverName: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    type: "full-time",
    hireDate: "",
    phones: [""],
    email: "",
    truck: "",
    trailer: "",
    status: "active",
  });
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({
    type: "All",
    status: "All",
  });

  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drivers");
      if (!response.ok) {
        throw new Error("Failed to fetch drivers");
      }
      const data = await response.json();
      setDrivers(data.drivers);
    } catch (error) {
      setError("Failed to fetch drivers");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handlestatusChange = async (driverId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.patch(`http://localhost:5000/api/drivers/${driverId}/status`, { status: newStatus });
      setDrivers((prev) => prev.map((driver) => {
        if (driver._id === driverId) {
          return {
            ...driver,
            status: newStatus,
          };
        }
        return driver;
      }));
      fetchDrivers(); // Refresh the driver list
    } catch (error) {
      setError("Failed to update status");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phones" ? [value] : value,
    }));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ type: selectedType, status: selectedStatus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoaded(true);

    try {
      const response = await fetch("http://localhost:5000/api/drivers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const newDriver = await response.json();
      setDrivers((prevDrivers) => [...prevDrivers, newDriver.driver]);
      setIsOpen(false);
      setFormData({
        name: "",
        type: "full-time",
        hireDate: "",
        phones: [""],
        email: "",
        truck: "",
        trailer: "",
        status: "active",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoaded(false);
    }
  };


  const handleDeleteDriver = async (driverId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/drivers/${driverId}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      setDrivers((prev) => prev.filter((driver) => driver._id !== driverId));
      closeDeleteConfirm();
    } catch (error) {
      setError(error.message);
    }
  };

  const openDeleteConfirm = (driverId, driverName) => {
    setDeleteConfirm({
      isOpen: true,
      driverId,
      driverName,
    });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({
      isOpen: false,
      driverId: null,
      driverName: "",
    });
  };

  const filteredDrivers = drivers.filter((driver) => {
    return (
      (appliedFilters.type === "All" || driver.type === appliedFilters.type) &&
      (appliedFilters.status === "All" ||
        driver.status === appliedFilters.status)
    );
  });

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Drivers</h2>

      <div className="bg-white p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Type
            </label>
            <select
              className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-red-400 transition duration-150"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="All">All</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Status
            </label>
            <select
              className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-red-400 transition duration-150"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="All">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleApplyFilters}
              className="w-full bg-gradient-to-r from-indigo-400 to-yellow-400 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:from-indigo-500 hover:to-yellow-500 transition duration-150"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-md">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Drivers</h3>
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
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Name
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Type
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Hire Date
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Phones
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Email
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Truck
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Trailer
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Status
                </th>
                <th className="px-4 py-2 border-b font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <tr key={driver._id} className="border-b">
                    <td className="px-4 py-2">{driver.name}</td>
                    <td className="px-4 py-2">{driver.type}</td>
                    <td className="px-4 py-2">{driver.hireDate}</td>
                    <td className="px-4 py-2">{driver.phones.join(", ")}</td>
                    <td className="px-4 py-2">{driver.email}</td>
                    <td className="px-4 py-2">{driver.truck}</td>
                    <td className="px-4 py-2">{driver.trailer}</td>
                    <td className="px-4 py-2">{driver.status}</td>
                    <td>
                <button onClick={() => handlestatusChange(driver._id, driver.status)}>
                  {driver.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          openDeleteConfirm(driver._id, driver.name)
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
                  <td colSpan="9" className="text-gray-500 text-center">
                    No drivers found.
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
                  Add Driver
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
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Hire Date
                    </label>
                    <input
                      type="date"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phones"
                      value={formData.phones[0] || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Truck
                    </label>
                    <input
                      type="text"
                      name="truck"
                      value={formData.truck}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Trailer
                    </label>
                    <input
                      type="text"
                      name="trailer"
                      value={formData.trailer}
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
                      type="button"
                      className="text-gray-500 px-4 py-2 mr-2 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      disabled={isLoaded}
                    >
                      {isLoaded ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirm */}
      <Transition show={deleteConfirm.isOpen} as={React.Fragment}>
        <Dialog
          onClose={closeDeleteConfirm}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Dark Background */}
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>

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
                <p className="mt-4 text-gray-700">
                  Are you sure you want to delete{" "}
                  <strong>{deleteConfirm.driverName}</strong>?
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="text-gray-500 px-4 py-2 mr-2 rounded-md"
                    onClick={closeDeleteConfirm}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDeleteDriver(deleteConfirm.driverId)}
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

export default Drivers;
