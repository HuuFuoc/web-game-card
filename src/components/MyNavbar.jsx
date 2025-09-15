import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <header className="bg-[#0c1022]">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-pink-500 font-bold text-2xl">END</span>
        <span className="text-white font-bold text-2xl">GAME</span>
        <span className="text-xs text-pink-400 ml-2">GAMING THEME</span>
      </Link>
      {/* Menu */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex gap-8 text-white font-semibold text-lg">
          <li>
            <Link to="/" className="hover:text-pink-400">
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/games"
              className="hover:text-pink-400 flex items-center gap-1"
            >
              Games
              <span className="ml-1">&#9660;</span>
            </Link>
            <ul className="absolute left-0 mt-2 bg-[#181c3a] rounded shadow-lg hidden group-hover:block min-w-[140px] z-10">
              <li>
                <Link
                  to="/game-single"
                  className="block px-4 py-2 hover:bg-pink-500 hover:text-white"
                >
                  Game Single
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/reviews" className="hover:text-pink-400">
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-pink-400">
              News
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-pink-400">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      {/* Login/Register */}
      <div className="flex items-center gap-2 text-white text-base">
        <Link to="/login" className="hover:text-pink-400">
          Login
        </Link>
        <span>/</span>
        <Link to="/register" className="hover:text-pink-400">
          Register
        </Link>
      </div>
    </div>
  </header>
);

export default Navbar;
