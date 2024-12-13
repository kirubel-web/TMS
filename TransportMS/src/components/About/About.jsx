import React from 'react';
import './About.css';
import about_img from '../../assets/supply_16.jpg';
import play_icon from '../../assets/play-icon.png';
const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="" className="about_img" />
        <img src={play_icon} alt="" className="play_icon" />
      </div>
      <div className="about-right">
        <h3>ABOUT US</h3>
        <h2>Who We Are</h2>
        <p>
          At TMS, we are passionate about simplifying transportation management
          for businesses of all sizes. With a blend of cutting-edge technology,
          industry expertise, and customer-first values, we help organizations
          tackle their logistics challenges with confidence.
          <p>
            Our team is made up of experienced professionals who understand the
            complexities of modern supply chains. From small businesses to large
            enterprises, we work closely with our clients to design solutions
            that drive operational success.
          </p>
        </p>
      </div>
    </div>
  );
};

export default About;
