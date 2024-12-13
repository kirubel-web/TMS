import React from "react";
import NavBar from "../components/Nav/NavBar";
import Hero from "../components/Hero/Hero";
import Programs from "../components/Programs/Programs";
import Title from "../components/Title/Title";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import { Element } from "react-scroll";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Element name="home">
        <NavBar />
      </Element>

      {/* Hero Section */}
      <div className="w-full">
        <Hero />
      </div>

      {/* Content Section */}
      <div className="w-full">
        {/* Programs Section */}
        <Element
          name="service"
          className="min-h-screen w-full bg-gray-100 pt-20 flex flex-col items-center justify-center"
        >
          <Title subTitle="Our Program" title="What We Offer" />
          <Programs />
        </Element>

        {/* About Section */}
        <Element
          name="about"
          className="min-h-screen w-full bg-gray-100 pt-20 flex flex-col items-center justify-center"
        >
          <About />
        </Element>

        {/* Contact Section */}
        <Element
          name="contact"
          className="w-full mt-5 pt-10 flex flex-col items-center justify-center"
        >
          <Title subTitle="Contact Us" title="Get in Touch" />
          <Contact />
        </Element>
      </div>
    </div>
  );
};

export default Home;
