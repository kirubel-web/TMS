import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupPage.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Customer"); // Default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/create",
        {
          email,
          password,
          role, // Include role in the request
        },
      );

      if (response.status === 201) {
        console.log("Account created successfully");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again.",
      );
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className="form-group">
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="customer">customer</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button className="btnsignup" type="submit">
          Sign Up
        </button>
        <div>
          <Link
            to="/login"
            className="stat-card"
            style={{ textDecoration: "none" }}
          >
            <p>Already have an account? Log in</p>
          </Link>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
