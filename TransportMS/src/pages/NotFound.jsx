import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>404 - Page Not Found</h1>
    <p>
      The page you are trying to access does not exist or you do not have
      permission to view it.
    </p>
    <Link to="/">Go Back to Home</Link>
  </div>
);

export default NotFound;
