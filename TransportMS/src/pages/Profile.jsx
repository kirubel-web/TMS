import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect,
} from "react-country-state-city";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    notes: "",
  });

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      await axios.put("http://localhost:5000/api/users/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 shadow-md">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *Company
              </label>
              <input
                type="text"
                name="company"
                value={user.company}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *Phones
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fax
              </label>
              <input
                type="text"
                name="fax"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                name="website"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *Address
              </label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *City
              </label>
              <input
                type="text"
                name="city"
                value={user.city}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *State / Province
              </label>
              <select
                name="state"
                value={user.state}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select State</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *Country
              </label>
              <select
                name="country"
                value={user.country}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                *Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={user.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              name="notes"
              value={user.notes}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
            ></textarea>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              Logo
            </button>
            <button type="button" className="text-sm text-red-600">
              Delete
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
