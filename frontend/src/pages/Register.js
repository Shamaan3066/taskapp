// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../utils/ApiRequest';
import { toast } from 'react-toastify';
import './auth.css';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { name, email, password } = values;

        try {
            const { data } = await axios.post(registerAPI, { name, email, password });

            if (data.success === true) {
                const userData = data.user;
                delete userData.password;
                localStorage.setItem('userId', JSON.stringify(userData));
                toast.success('Registration successful!');
                navigate('/');
            } else {
                toast.error(`Failed to sign up: ${data.message}`);
            }
        } catch (error) {
            toast.error(`Error during registration: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        placeholder="Enter name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        placeholder="Enter email"
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
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button disabled={loading}>
                    {loading ? "Registering..." : "Signup"}
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;
