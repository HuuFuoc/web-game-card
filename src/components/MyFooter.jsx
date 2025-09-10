import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#0c1022] mt-16 py-8 text-center">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      {/* Social icons (placeholder) */}
      <div className="flex gap-4 mb-4">
        <span className="hover:text-pink-400 cursor-pointer">F</span>
        <span className="hover:text-pink-400 cursor-pointer">T</span>
        <span className="hover:text-pink-400 cursor-pointer">I</span>
      </div>
      {/* Copyright */}
      <p className="text-gray-400 text-sm">
        © 2025 ENDGAME. All rights reserved. Designed by{" "}
        <span className="text-pink-400">Colorlib</span>
      </p>
      <p className="text-gray-500 text-xs mt-2">
        The best online game community. Contact: info@endgame.com
      </p>
    </div>
  </footer>
);

export default Footer;
