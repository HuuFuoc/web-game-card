import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/slider-bg-1.jpg";

const ForgotPassword = () => {
     const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Regex kiểm tra email Gmail
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            setError("Vui lòng nhập đúng địa chỉ Gmail!");
            return;
        }
        setError("");
        // Xử lý gửi email ở đây
        alert("Đã gửi link reset tới email!");
    };
    return (
        <div className="bg-gray-900 min-h-screen">
            <section
                className="relative flex items-center justify-center min-h-[100vh]"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
               <div className="absolute inset-0 bg-gradient-to-b from-[#7c2a7a99] to-[#0c1022cc]"></div>
                <div className="relative z-10 w-full flex flex-col items-center justify-center mt-12">
                    <div className="bg-[#18182a] bg-opacity-95 rounded-xl shadow-2xl p-8 max-w-md w-full">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                                    Enter your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Your email address"
                                />
                                {error && (
                                    <p className="text-red-400 mt-2 text-sm">{error}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition"
                            >
                                Send Reset Link
                            </button>
                        </form>
                        <div className="text-center mt-4 text-gray-400">
                            <Link to="/login" className="text-pink-400 underline hover:text-pink-500">
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword;