import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react"; // icon đẹp
import bgImage from "../assets/slider-bg-1.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9._]{4,20}$/;
    if (!username.trim()) return "Username is required";
    if (!usernameRegex.test(username))
      return "4-20 chars: letters, numbers, dots, underscores only";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\\w.-]+@[\\w.-]+\\.\\w{2,4}$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "At least 8 characters";
    if (!/[a-z]/.test(password)) return "Must contain lowercase";
    if (!/[A-Z]/.test(password)) return "Must contain uppercase";
    if (!/[0-9]/.test(password)) return "Must contain number";
    if (!/[@$!%*?&]/.test(password))
      return "Must contain special char (@$!%*?&)";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.username = validateUsername(formData.username);
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    let error = "";
    if (id === "username") error = validateUsername(value);
    else if (id === "email") error = validateEmail(value);
    else if (id === "password") error = validatePassword(value);

    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid", formData);
      alert("Registration successful!");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* CSS animations */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 8s ease infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}
      </style>

      {/* Register Section */}
      <section
        className="relative flex items-center justify-center min-h-[100vh] px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 via-purple-700/60 to-indigo-800/60 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Form Card */}
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-pink-500/40 shadow-2xl rounded-2xl p-8 animate-fade-in">
            <h2 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide drop-shadow-lg">
              Create Account ✨
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-gray-300 font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/70 text-white border ${
                      errors.username ? "border-red-500" : "border-pink-400/40"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/70 text-white border ${
                      errors.email ? "border-red-500" : "border-pink-400/40"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/70 text-white border ${
                      errors.password ? "border-red-500" : "border-pink-400/40"
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white font-bold text-lg shadow-lg hover:scale-[1.03] transition-transform"
              >
                Register
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-pink-400 underline hover:text-pink-300">
                  Login
                </Link>
              </p>
              <Link to="/" className="text-gray-300 underline hover:text-white">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
