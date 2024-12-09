import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
import NavBar from "./components/Nav/NavBar";
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/Programs";
import Title from "./components/Title/Title";
import About from "./components/About/About";
import Campus from "./components/Campus/Campus";
import Contact from "./components/Contact/Contact";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CustomerPage from "./pages/CustomerPage";
import SignUp from "./pages/SignupPage";
import NewAcount from "./pages/NewAcountPage";
import "./indexx.css";
import { Link, Element } from "react-scroll";

const Home = () => {
  return (
    <Router>
      {/* Move your layout components (NavBar, Hero, etc.) inside Router */}

      <Routes>
        {/* Define routes for different pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newacount" element={<NewAcount />} />

        {/* Default home route */}
        <Route
          path="/"
          element={
            <>
              <Element name="home" style={{}}>
                <NavBar />
              </Element>

              <Hero />
              <div className="container">
                <Element
                  name="service"
                  style={{
                    height: "100vh",
                    backgroundColor: "#f4f4f4",
                    paddingTop: "80px", // Optional additional padding for visual adjustment
                  }}
                >
                  <Title subTitle="Our Program" title="What We Offer" />
                  <Programs />
                </Element>
                <Element
                  name="about"
                  style={{
                    height: "100vh",
                    backgroundColor: "#f4f4f4",
                    paddingTop: "80px", // Optional additional padding for visual adjustment
                  }}
                >
                  <About />
                </Element>

                {/* <Title subTitle="Gallery" title="Campus Photo" /> */}
                {/* <Campus /> */}
                <Element
                  name="contact"
                  style={{
                    marginTop: "20px", // Optional additional padding for visual adjustment
                  }}
                >
                  <Title
                    subTitle="contact us"
                    title="Get in Touch"
                    style={{ paddingTop: "100px" }}
                  />

                  <Contact />
                </Element>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default Home;
