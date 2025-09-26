import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import bgImage from "../assets/slider-bg-1.jpg";

const Login = () => {
  const [focusField, setFocusField] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fake check
    const isCorrect = Math.random() > 0.5;
    setStatus(isCorrect ? "success" : "error");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
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
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          .eye {
            transform-origin: center;
            animation: blink 5s infinite;
          }
        `}
      </style>

      <section
        className="relative flex items-center justify-center min-h-[100vh] px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 via-purple-700/60 to-indigo-800/60 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-pink-500/40 shadow-2xl rounded-2xl p-8">

            {/* Mascot */}
            <motion.div
              className="flex justify-center mb-6"
              animate={
                status === "error"
                  ? { x: [-10, 10, -10, 10, 0] }
                  : status === "success"
                  ? { y: [-5, 0, -5, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <svg width="120" height="120" viewBox="0 0 100 100">
                {/* Head */}
                <circle cx="50" cy="50" r="40" fill="#fcd34d" stroke="#000" strokeWidth="3" />
                {/* Eyes */}
                <circle
                  className={`eye transition-all duration-300 ${focusField === "password" ? "opacity-0" : "opacity-100"}`}
                  cx="35"
                  cy="45"
                  r="5"
                  fill="#000"
                />
                <circle
                  className={`eye transition-all duration-300 ${focusField === "password" ? "opacity-0" : "opacity-100"}`}
                  cx="65"
                  cy="45"
                  r="5"
                  fill="#000"
                />
                {/* Mouth */}
                {status === "error" && (
                  <path d="M35 70 Q50 60 65 70" stroke="#000" strokeWidth="3" fill="none" />
                )}
                {status === "success" && (
                  <path d="M35 65 Q50 80 65 65" stroke="#000" strokeWidth="3" fill="none" />
                )}
                {status === "idle" && (
                  <path d="M35 70 Q50 75 65 70" stroke="#000" strokeWidth="3" fill="none" />
                )}
                {/* Hands (che mắt khi nhập password) */}
                {focusField === "password" && (
                  <>
                    <rect x="20" y="40" width="15" height="8" fill="#000" rx="3" />
                    <rect x="65" y="40" width="15" height="8" fill="#000" rx="3" />
                  </>
                )}
              </svg>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">
              Welcome Back 👋
            </h2>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    onFocus={() => setFocusField("email")}
                    onBlur={() => setFocusField(null)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/70 text-white border border-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={20} />
                  <input
                    type="password"
                    id="password"
                    onFocus={() => setFocusField("password")}
                    onBlur={() => setFocusField(null)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/70 text-white border border-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white font-bold text-lg shadow-lg hover:scale-[1.03] transition-transform"
              >
                Login
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 space-y-3 text-center">
              <Link to="/forgot-password" className="block text-pink-400 underline hover:text-pink-300">
                Forgot your password?
              </Link>
              <Link to="/" className="block text-pink-400 underline hover:text-pink-300">
                ← Back to Home
              </Link>
              <p className="text-gray-400">
                Don’t have an account?{" "}
                <Link to="/register" className="text-pink-400 underline hover:text-pink-300">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
