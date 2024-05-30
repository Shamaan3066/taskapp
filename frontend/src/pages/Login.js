// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../utils/ApiRequest';
import { toast } from 'react-toastify';
import './auth.css';

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
            toast.success('Login successful!');
            navigate('/');
        } else {
            toast.error(`Failed to login: ${data.message}`);
        }
    } catch (error) {
        toast.error(`Error during login: ${error.message}`);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
