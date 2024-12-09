import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
import NavBar from "./homepages/components/Nav/NavBar";
import Hero from "./homepages/components/Hero/Hero";
import Programs from "./homepages/components/Programs/Programs";
import Title from "./homepages/components/Title/Title";
import About from "./homepages/components/About/About";
import Campus from "./homepages/components/Campus/Campus";
import Contact from "./homepages/components/Contact/Contact";
import LoginPage from "./homepages/pages/LoginPage";
import AdminPage from "./homepages/pages/AdminPage";
import CustomerPage from "./homepages/pages/CustomerPage";
import SignUp from "./homepages/pages/SignupPage";
import NewAcount from "./homepages/pages/NewAcountPage";
import "./App.css";
import "./index.css";

import { Link, Element } from "react-scroll";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
