import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Dispatch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dispatchers, setDispatchers] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    dispatcherId: null,
    dispatcherName: "",
  });

  const fetchDispatchers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dispatchers");
      if (!response.ok) {
        throw new Error("Failed to fetch dispatchers");
      }
      const data = await response.json();
      setDispatchers(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch dispatchers");
    }
  };

  useEffect(() => {
    // Fetch dispatchers on initial mount
    fetchDispatchers();
    // Set interval to fetch dispatchers every 5 seconds (5000ms)
    const intervalId = setInterval(() => {
      fetchDispatchers();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    fetchDispatchers(); // Fetch updated list after closing the modal
  };

  const handleAddDispatcher = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const data = {
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      role: formData.get("role"),
    };

    if (!data.email || !data.firstName || !data.lastName || !data.role) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/dispatchers/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const newDispatcher = await response.json();

      // Update state first
      setDispatchers((prev) => [...prev, newDispatcher]);

      // Now close the modal
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding dispatcher:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDispatcher = async (dispatcherId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/dispatchers/${dispatcherId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete dispatcher");
      }

      // Remove the deleted dispatcher from the state
      setDispatchers((prev) =>
        prev.filter((dispatcher) => dispatcher._id !== dispatcherId),
      );
      setDeleteConfirm({
        isOpen: false,
        dispatcherId: null,
        dispatcherName: "",
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const openDeleteConfirm = (dispatcherId, dispatcherName) => {
    setDeleteConfirm({
      isOpen: true,
      dispatcherId,
      dispatcherName,
    });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({
      isOpen: false,
      dispatcherId: null,
      dispatcherName: "",
    });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      {/* Dispatch Board */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Dispatch Board
        </h2>
        <div className="space-y-4">
          {[
            "Waiting to be Loaded",
            "Booked for a Load",
            "At Pick Up",
            "In Transit",
            "At Delivery",
          ].map((status) => (
            <div key={status} className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-medium text-gray-700">{status}</h3>
              <p className="text-sm text-gray-500">Vehicles not found</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dispatchers */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Dispatchers
        </h2>
        <div className="bg-white shadow-sm rounded-md">
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">Dispatchers</h3>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Add New
            </button>
          </div>
          <div className="p-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dispatchers.length > 0 ? (
                  dispatchers.map((dispatcher) => (
                    <tr key={dispatcher._id} className="border-b">
                      <td className="py-2">
                        {dispatcher.firstName} {dispatcher.lastName}
                      </td>
                      <td className="py-2">{dispatcher.email}</td>
                      <td className="py-2">{dispatcher.role}</td>
                      <td className="py-2">
                        <button
                          onClick={() =>
                            openDeleteConfirm(
                              dispatcher._id,
                              `${dispatcher.firstName} ${dispatcher.lastName}`,
                            )
                          }
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-gray-500 py-2">
                      Records not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Dispatcher Modal */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Add New Dispatcher
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleAddDispatcher} className="space-y-4 mt-4">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      name="role"
                      required
                      defaultValue="Dispatcher"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Dispatcher">Dispatcher</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        form.reset();
                        setIsOpen(false);
                      }}
                      className="mt-3 w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      onClick={handleCloseModal}
                      className={`mt-3 w-full py-2 px-4 ${
                        isLoading ? "bg-blue-300" : "bg-blue-500"
                      } text-white rounded-md`}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition show={deleteConfirm.isOpen} as={React.Fragment}>
        <Dialog onClose={closeDeleteConfirm} className="relative z-50">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Confirm Deletion
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {deleteConfirm.dispatcherName}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeDeleteConfirm}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteDispatcher(deleteConfirm.dispatcherId)
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
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

export default Dispatch;
