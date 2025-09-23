import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/slider-bg-1.jpg";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    // Validation functions
    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9._]{4,20}$/;
        if (!username.trim()) {
            return 'Username is required';
        }
        if (!usernameRegex.test(username)) {
            return 'Username must be 4-20 characters and contain only letters, numbers, dots, and underscores';
        }
        return '';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,4}$/;
        if (!email.trim()) {
            return 'Email is required';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number';
        }
        if (!/[@$!%*?&]/.test(password)) {
            return 'Password must contain at least one special character (@$!%*?&)';
        }
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        
        newErrors.username = validateUsername(formData.username);
        newErrors.email = validateEmail(formData.email);
        newErrors.password = validatePassword(formData.password);
        
        // Remove empty errors
        Object.keys(newErrors).forEach(key => {
            if (!newErrors[key]) delete newErrors[key];
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        
        // Real-time validation
        let error = '';
        if (id === 'username') {
            error = validateUsername(value);
        } else if (id === 'email') {
            error = validateEmail(value);
        } else if (id === 'password') {
            error = validatePassword(value);
        }
        
        setErrors(prev => ({
            ...prev,
            [id]: error
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form is valid', formData);
            // Handle registration logic here
            alert('Registration successful!');
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            {/* Register Section */}
            <section
                className="relative flex items-center justify-center min-h-[100vh]"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#7c2a7a99] to-[#0c1022cc]"></div>
                {/* Form Card */}
                <div className="relative z-10 w-full flex flex-col items-center justify-center mt-12">
                    <div className="bg-[#18182a] bg-opacity-95 rounded-xl shadow-2xl p-8 max-w-md w-full">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-300 font-medium mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                                        errors.username ? 'border-red-500' : 'border-pink-500'
                                    } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    placeholder="Enter your username"
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                                        errors.email ? 'border-red-500' : 'border-pink-500'
                                    } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border ${
                                        errors.password ? 'border-red-500' : 'border-pink-500'
                                    } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition"
                            >
                                Register
                            </button>
                        </form>
                        <div className="text-center mt-4 text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-pink-400 underline hover:text-pink-500">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;