import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-animation">
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
    <p className="not-found-message">
      The page you are trying to access does not exist or you do not have
      permission to view it.
    </p>
    <Link to="/" className="back-home-link">
      Go Back to Home
    </Link>
  </div>
);

export default NotFound;
