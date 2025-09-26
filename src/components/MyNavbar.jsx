import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Theo dõi scroll để đổi màu nền navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0c1022]/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-pink-500 font-extrabold text-2xl group-hover:scale-110 transition-transform duration-300">
            END
          </span>
          <span className="text-white font-extrabold text-2xl group-hover:text-pink-400 transition-colors">
            GAME
          </span>
          <span className="text-xs text-pink-400 ml-2 hidden sm:inline">
            GAMING THEME
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8 text-white font-semibold text-lg">
            {["Home", "Games", "Reviews", "News", "Contact"].map((item, i) =>
              item === "Games" ? (
                <li key={i} className="relative group">
                  <Link
                    to="/games"
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500 flex items-center gap-1 transition-all"
                  >
                    Games
                    <span className="ml-1">&#9660;</span>
                  </Link>
                  <ul className="absolute left-0 mt-2 bg-[#181c3a] rounded shadow-lg hidden group-hover:block min-w-[140px] z-10">
                    <li>
                      <Link
                        to="/game-single"
                        className="block px-4 py-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all"
                      >
                        Game Single
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li key={i}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500 transition-all"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Login/Register (Desktop) */}
        <div className="hidden md:flex items-center gap-2 text-white text-base">
          <Link
            to="/login"
            className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 transition-all"
          >
            Login
          </Link>
          <span>/</span>
          <Link
            to="/register"
            className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 transition-all"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu (Slide from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#181c3a] text-white shadow-2xl transform transition-transform duration-500 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-pink-400">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          <Link
            to="/"
            className="hover:text-pink-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <div>
            <Link
              to="/games"
              className="hover:text-pink-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Games
            </Link>
            <Link
              to="/game-single"
              className="block ml-4 text-sm hover:text-pink-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Game Single
            </Link>
          </div>
          <Link
            to="/reviews"
            className="hover:text-pink-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Reviews
          </Link>
          <Link
            to="/news"
            className="hover:text-pink-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            News
          </Link>
          <Link
            to="/contact"
            className="hover:text-pink-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-4 border-t border-gray-600">
            <Link
              to="/login"
              className="hover:text-pink-400"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/register"
              className="hover:text-pink-400"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
