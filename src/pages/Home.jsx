import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import bgImage from "../assets/slider-bg-1.jpg";
import Navbar from "../components/MyNavbar";
import kongImage from "../assets/Rise-of-kong.png";
import duckImage from "../assets/duck.png";
import hoImage from "../assets/ho-white.png";
import meoImage from "../assets/meo-white.png";
import cityImage from "../assets/city1.png";
import chessImage from "../assets/chess.png";
import warImage from "../assets/war.png";
import nuiImage from "../assets/nui.png";
import daoImage from "../assets/dao.png";
import troiImage from "../assets/troi.png";
import nightImage from "../assets/night.png";

import { FaFacebookF, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: "ease-in-out" });
  }, []);

  const cards = [
    {
      title: "Rise of Kong",
      desc: "Fight, evolve, and rise to become the ultimate guardian of the jungle.",
      image: kongImage,
    },
    {
      title: "Emberflare Sprite",
      desc: "Radiates with fiery energy, lighting the way through storms and shadows.",
      image: duckImage,
    },
    {
      title: "Moonlit Cub",
      desc: "A noble cub glowing under moonlight, destined protector of sacred lands.",
      image: hoImage,
    },
    {
      title: "Crystalwing Kit",
      desc: "Gem-like feathers, luminous wings, playful yet full of fortune.",
      image: meoImage,
    },
  ];

  const strategies = [
    {
      title: "Tower of Dominion",
      image: cityImage,
      features: [
        "Build towering fortresses",
        "Expand empire with unmatched defenses",
        "Control trade routes & resources",
        "Rule your domain unshakably",
      ],
    },
    {
      title: "Mind’s Gambit",
      image: chessImage,
      features: [
        "Every move is intellect",
        "Balance risk, time, and opportunity",
        "Turn small gains into victories",
        "Outsmart rivals and reshape destiny",
      ],
    },
    {
      title: "Clash of Realms",
      image: warImage,
      features: [
        "Lead warriors, beasts, and spellcasters",
        "Forge alliances, command mighty armies",
        "Engage in epic large-scale battles",
        "Unite realms under your reign",
      ],
    },
  ];

  const maps = [
    {
      title: "Highlands of Eternia",
      desc: "Towering peaks & hidden valleys, only the bold claim its glory.",
      image: nuiImage,
    },
    {
      title: "Verdant Bastion",
      desc: "Ancient island fortress, a sanctuary & stronghold in one.",
      image: daoImage,
    },
    {
      title: "Skywater Isles",
      desc: "Floating paradise with waterfalls into the void, beauty & peril alike.",
      image: troiImage,
    },
    {
      title: "Nightfall Metropolis",
      desc: "Neon-lit city, dazzling yet full of whispered secrets.",
      image: nightImage,
    },
  ];

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center min-h-[80vh]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1
            data-aos="zoom-in"
            className="text-6xl md:text-8xl font-extrabold mb-6 
                       text-transparent bg-clip-text 
                       bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400
                       animate-text-glow"
          >
            GameVerse
          </h1>
          <p
            data-aos="fade-up"
            className="text-gray-200 text-xl md:text-2xl mb-10 leading-relaxed"
          >
            Learn, strategize, and conquer in a universe of games. Build your
            deck, fight rivals, and create your legacy.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              to="/play"
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-lg font-bold shadow-lg
                         hover:scale-110 hover:shadow-pink-500/70 transition-all duration-300"
            >
              🎮 Play Now
            </Link>
            <Link
              to="/deck"
              className="border-2 border-pink-400 px-8 py-4 rounded-lg font-semibold 
                         hover:bg-pink-500 hover:text-black hover:scale-110 transition-all duration-300"
            >
              🃏 Choose Deck
            </Link>
            <Link
              to="/login"
              className="border-2 border-gray-400 px-8 py-4 rounded-lg font-semibold 
                         hover:bg-gray-300 hover:text-black hover:scale-110 transition-all duration-300"
            >
              🔑 Login
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <h2
          data-aos="fade-up"
          className="text-5xl font-extrabold text-center mb-12 
                     text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
        >
          Featured Card Sets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
          {cards.map((card, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl 
                         transform transition-all duration-500 hover:scale-105 hover:shadow-yellow-400/50"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Strategies */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <h2
          data-aos="fade-up"
          className="text-5xl font-extrabold text-center mb-12 
                     text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500"
        >
          Popular Strategies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-16">
          {strategies.map((s, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 200}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl 
                         transition-all duration-500 hover:scale-105 hover:shadow-orange-400/50"
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  {s.title}
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  {s.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Maps */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <h2
          data-aos="fade-up"
          className="text-5xl font-extrabold text-center mb-12 
                     text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-500"
        >
          Available Maps
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-16">
          {maps.map((map, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl 
                         transition-all duration-500 hover:scale-105 hover:shadow-red-400/50"
            >
              <img
                src={map.image}
                alt={map.title}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">
                  {map.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {map.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-4">
              GameVerse
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Enter the world of strategy and adventure. Collect cards, master
              your deck, and conquer realms across devices with one account.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/play" className="hover:text-pink-400 transition">
                  🎮 Play Now
                </Link>
              </li>
              <li>
                <Link to="/deck" className="hover:text-pink-400 transition">
                  🃏 Choose Deck
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-pink-400 transition">
                  🔑 Login
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-pink-400 transition">
                  ℹ️ About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4 text-xl">
              {[FaFacebookF, FaTwitter, FaInstagram, FaDiscord].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-3 rounded-full bg-gray-700 hover:bg-pink-500 
                               hover:scale-125 transition transform duration-300"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} GameVerse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
