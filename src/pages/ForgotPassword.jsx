import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/slider-bg-1.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      setError("❌ Vui lòng nhập đúng địa chỉ Gmail!");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("✅ Link reset đã được gửi tới email của bạn!");
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* CSS Animation trong JSX */}
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

      <section
        className="relative flex items-center justify-center min-h-[100vh]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 via-purple-700/60 to-indigo-800/60 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Form Card */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl border border-pink-500/40 shadow-2xl rounded-2xl p-8 max-w-md w-full animate-fade-in">
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
              Forgot Password 🔑
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Enter your Gmail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white border ${
                    error ? "border-red-500" : "border-pink-400/40"
                  } focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                  placeholder="youremail@gmail.com"
                />
                {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                {success && (
                  <p className="text-green-400 mt-2 text-sm">{success}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white font-bold text-lg shadow-lg hover:scale-[1.03] transition-transform"
              >
                Send Reset Link
              </button>
            </form>

            <div className="text-center mt-6 space-y-3">
              <Link
                to="/login"
                className="text-pink-400 underline hover:text-pink-300"
              >
                ← Back to Login
              </Link>
              <div>
                <Link
                  to="/"
                  className="text-gray-300 underline hover:text-white"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
