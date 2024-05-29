// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../utils/ApiRequest'; // Ensure the import path is correct
import './auth.css'; // Importing auth.css for styling

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { email, password } = values;

    try {
        const { data } = await axios.post(loginAPI, { email, password });

        if (data.success === true) {
            if (localStorage.getItem('userId')) {
              localStorage.removeItem('userId');
            }
            delete data.user.password;
            localStorage.setItem('userId', JSON.stringify(data.user));
            navigate('/');
        } else {
            console.error('Failed to Login:', data.message);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="login-container"> {/* Added class name for styling */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form"> {/* Added class name for styling */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
