import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/slider-bg-1.jpg";

const Login = () => {
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
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

                        <form>
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

                            <div className="mb-4">
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
                                Login
                            </button>
                        </form>

                        {/* Forgot password */}
                        <div className="text-center mt-4">
                            <Link to="/forgot-password" className="text-pink-400 underline hover:text-pink-500">
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Back to Home */}
                        <div className="text-center mt-2">
                            <Link to="/" className="text-pink-400 underline hover:text-pink-500">
                                Back to Home
                            </Link>
                        </div>

                        <div className="text-center mt-4 text-gray-400">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-pink-400 underline hover:text-pink-500">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
