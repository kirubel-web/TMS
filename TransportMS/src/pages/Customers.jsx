import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Customer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    customerId: null,
    customerName: "",
  });

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/customers");
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data.customers);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
    const intervalId = setInterval(() => {
      fetchCustomers();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      phones: formData.get("phones"),
      address: formData.get("address"),
      city: formData.get("city"),
      country: formData.get("country"),
      rating: formData.get("rating"),
      notes: formData.get("notes"),
      department: formData.get("department"),
    };

    if (!data.firstName || !data.lastName || !data.email) {
      setError("First name, last name, and email are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/customers/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const newCustomer = await response.json();

      // Update the customers state by adding the new customer
      setCustomers((prevCustomers) => [...prevCustomers, newCustomer.customer]);

      setIsModalOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/customers/${customerId}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete customer");
      }

      setCustomers((prev) =>
        prev.filter((customer) => customer._id !== customerId),
      );
      closeDeleteConfirm();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const openDeleteConfirm = (customerId, customerName) => {
    setDeleteConfirm({
      isOpen: true,
      customerId,
      customerName,
    });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({
      isOpen: false,
      customerId: null,
      customerName: "",
    });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Customers</h2>
      <div className="bg-white shadow-sm rounded-md">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Customers</h3>
          <button
            onClick={() => setIsModalOpen(true)}
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
                <th className="py-2">Company</th>
                <th className="py-2">Phones</th>
                <th className="py-2">Address</th>

                <th className="py-2">Rating</th>
                <th className="py-2">Notes</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer._id} className="border-b">
                    <td className="py-2">
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="py-2">{customer.email}</td>
                    <td className="py-2">{customer.company}</td>
                    <td className="py-2">{customer.phones}</td>
                    <td className="py-2">{customer.address}</td>

                    <td className="py-2">{customer.rating}</td>
                    <td className="py-2">{customer.notes}</td>

                    <td className="py-2">
                      <button
                        onClick={() =>
                          openDeleteConfirm(
                            customer._id,
                            `${customer.firstName} ${customer.lastName}`,
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
                  <td colSpan="3" className="text-gray-500 py-2">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <Dialog.Title className="text-lg font-semibold text-gray-800">
            Add New Customer
          </Dialog.Title>
          <Dialog.Description className="text-gray-500 mb-4">
            Fill in the details to add a new customer.
          </Dialog.Description>

          <form onSubmit={handleAddCustomer}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="phones"
                placeholder="Phones"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full p-2 border border-gray-300 rounded"
              />

              <select
                name="department"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select Department</option>
                <option value="MinisterOffice">Minister Office</option>
                <option value="MainAdministration">Main Administration</option>
                <option value="InnovationDevelopment">
                  Innovation Development
                </option>
                <option value="HumanResources">Human Resources</option>
                <option value="Finance">Finance and procurement</option>
                <option value="IT">
                  Information and Communication Technology
                </option>
                <option value="Law">Law</option>
                <option value="Audit">Audit</option>
                <option value="Electronic government development">
                  Electronic government development
                </option>
              </select>
              <select
                name="rating"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option disabled>Select Rating</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
              <textarea
                name="notes"
                placeholder="Notes"
                className="col-span-2 w-full p-2 border border-gray-300 rounded resize-none"
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
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Customer"}
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      <Transition show={deleteConfirm.isOpen} as={React.Fragment}>
        <Dialog onClose={closeDeleteConfirm} className="relative z-50">
          <Transition.Child as={React.Fragment}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={React.Fragment}>
              <Dialog.Panel className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Confirm Delete
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete {deleteConfirm.customerName}?
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={closeDeleteConfirm}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteCustomer(deleteConfirm.customerId)
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

export default Customer;
