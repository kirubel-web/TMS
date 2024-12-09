import React, { useEffect, useState } from "react";
import { Link, Element } from "react-scroll";

import "./NavBar.css";
import logo from "../../assets/logo1.png";
const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  return (
    <nav className={`container ${sticky ? "dark_nav" : ""}`}>
      <img src={logo} alt="" className="logo" />
      <ul>
        <Link
          to="home"
          smooth={true}
          duration={500}
          style={{ cursor: "pointer" }}
        >
          <li>Home</li>
        </Link>
        <Link
          to="service"
          smooth={true}
          duration={500}
          style={{ cursor: "pointer" }}
        >
          <li>Service</li>
        </Link>
        {/* <li>About Us</li> */}
        <Link
          to="about"
          smooth={true}
          duration={500}
          style={{ cursor: "pointer" }}
        >
          <li>About</li>
        </Link>
        <li>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            style={{ cursor: "pointer" }}
          >
            <button className="btn">Contact us</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
