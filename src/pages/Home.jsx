import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/slider-bg-1.jpg";
import Footer from "../components/MyFooter";
import Navbar from "../components/MyNavbar";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center min-h-[70vh]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#7c2a7a99] to-[#0c1022cc]"></div>
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <h1 className="text-white text-7xl font-extrabold mb-6 drop-shadow-lg">
            Game on!
          </h1>
          <p className="text-gray-300 text-2xl mb-8 drop-shadow">
            Fusce erat dui, venenatis et erat in, vulputate dignissim lacus.
            Donec vitae tempus dolor,
            <br />
            sit amet elementum lorem. Ut cursus tempor turpis.
          </p>
          <Link
            to="/"
            className="bg-white text-[#0c1022] font-bold px-8 py-4 rounded-lg shadow-lg border-2 border-pink-500
            hover:bg-pink-500 hover:text-black hover:scale-105 hover:shadow-2xl transition-transform transition-shadow duration-200 flex items-center gap-2"
            >
            READ MORE
            <span className="text-pink-500 text-xl">&#xBB;</span>
          </Link>
        </div>
        {/* Play Button (right) */}
        <div className="absolute right-16 bottom-1/2 translate-y-1/2 z-10">
          <button className="bg-pink-500 rounded-full p-4 shadow-lg hover:bg-pink-600 transition">
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
