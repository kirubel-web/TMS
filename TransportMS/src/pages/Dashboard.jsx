import React from "react";
import logo1 from "../assets/gondaruni.png"; // Adjust path as needed
import logo2 from "../assets/mint.png"; // Adjust path as needed

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10">
      {/* Logo Section */}
      <div className="flex space-x-10 mb-8 ">
        <img
          src={logo1}
          alt="Company 1 Logo"
          className="w-60 h-auto object-contain"
          style={{ marginRight: "40px" }}
        />
        <img
          src={logo2}
          alt="Company 2 Logo"
          className="w-60 h-auto object-contain"
          style={{ marginRight: "40px" }}
        />
      </div>

      {/* Header Section */}
      <div className="text-center shadow-lg rounded-lg px-6 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the TMS
        </h1>
        <p className="text-lg text-gray-600">
          Manage your data, view analytics, and explore features to enhance your
          productivity.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
