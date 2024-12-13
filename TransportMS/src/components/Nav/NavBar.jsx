import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import logo from "../../assets/logo1.png";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-10 flex items-center justify-between px-5 py-3 bg-gray-900 ${
        sticky ? "shadow-md bg-gray-900" : ""
      } transition-all duration-500 rounded-b-lg`}
    >
      <img src={logo} alt="Logo" className="w-32" />
      <ul className="flex items-center space-x-8">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="cursor-pointer text-white hover:text-yellow-400 transition-colors"
        >
          <li>Home</li>
        </Link>
        <Link
          to="service"
          smooth={true}
          duration={500}
          className="cursor-pointer text-white hover:text-yellow-400 transition-colors"
        >
          <li>Service</li>
        </Link>
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="cursor-pointer text-white hover:text-yellow-400 transition-colors"
        >
          <li>About</li>
        </Link>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <button className="bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition duration-300">
            Contact Us
          </button>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
