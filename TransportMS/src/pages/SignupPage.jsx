import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Ensure you import the CSS file

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Assuming signup is successful:
    setIsSignupSuccessful(true);

    // After 2 seconds, redirect to login page
    setTimeout(() => {
      navigate('/login'); // Redirect to login page after signup
    }, 2000);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Create a New Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
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
            New Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="role">
            Role:
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="role-dropdown"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      {isSignupSuccessful && (
        <div className="signup-success">
          <p>Sign Up Successful!</p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
