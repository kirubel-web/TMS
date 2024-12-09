import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook

import './Hero.css';
import dark_arrow from '../../assets/dark-arrow.png';
const Hero = () => {

  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStartedClick = () => {
    navigate('/login'); // Navigate to the login page when the button is clicked
  };

  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>We ensure better transportation for a better world</h1>
        <div className="btn-div">
          <button className="btn hero-btn" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};


export default Hero;
