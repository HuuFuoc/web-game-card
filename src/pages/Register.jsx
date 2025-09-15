import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/slider-bg-1.jpg";

const Register = () => {
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
                        <form>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-300 font-medium mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter your password"
                                />
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