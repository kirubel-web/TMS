import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Ensure you import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate login credentials
    // For this example, we're just logging the email/password
    console.log('Email:', email);
    console.log('Password:', password);
    // Assuming successful login logic
    alert('Logged in successfully!');
    // Add navigation logic here if needed, e.g., navigate to user dashboard
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to the signup page when clicked
  };
  const handleNewAcount = () => {
    navigate('/newacount'); // Redirect to the signup page when clicked
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="input-field"
          />
        </div>

        <button
          type="submit"
          className="login-button"
          // onClick={handleSignUpClick}
        >
          Login
        </button>
      </form>

      {/* Create New Account Button */}
      <div className="create-account-container">
        <p className="create-account-text">Don't have an account?</p>
        <button className="create-account-button" onClick={handleNewAcount}>
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
