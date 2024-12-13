import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/background.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="hero-container min-h-screen flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-6xl font-bold mb-6 text-yellow-400 leading-tight">
          We ensure better transportation for a better world
        </h1>
        <p className="text-xl text-yellow-100 mb-8">
          Streamline your logistics operations with our comprehensive
          transportation management system
        </p>
        <button
          className="mt-4 bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
