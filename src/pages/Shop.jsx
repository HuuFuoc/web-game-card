import React, { useState, useEffect } from "react";
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

import { FaFilter, FaCoins, FaShoppingCart, FaStar } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Toast from "../components/Toast";
import Confetti from "../components/Confetti";

const Shop = () => {
  const [userMoney, setUserMoney] = useState(15000);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [cart, setCart] = useState([]);
  const [purchaseAnimation, setPurchaseAnimation] = useState(null);
  const [toast, setToast] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: "ease-in-out" });
  }, []);

  // Danh sách các thẻ bài quái thú để mua bán
  const cards = [
    {
      id: 1,
      name: "Rise of Kong",
      desc: "Fight, evolve, and rise to become the ultimate guardian of the jungle.",
      image: kongImage,
      price: 2500,
      rarity: "legendary",
      type: "beast",
      attack: 3000,
      defense: 2500,
      stars: 5,
      inStock: 3
    },
    {
      id: 2,
      name: "Emberflare Sprite",
      desc: "Radiates with fiery energy, lighting the way through storms and shadows.",
      image: duckImage,
      price: 1500,
      rarity: "rare",
      type: "fire",
      attack: 2200,
      defense: 1800,
      stars: 4,
      inStock: 7
    },
    {
      id: 3,
      name: "Moonlit Cub",
      desc: "A noble cub glowing under moonlight, destined protector of sacred lands.",
      image: hoImage,
      price: 1200,
      rarity: "rare",
      type: "light",
      attack: 1900,
      defense: 2100,
      stars: 4,
      inStock: 5
    },
    {
      id: 4,
      name: "Crystalwing Kit",
      desc: "Gem-like feathers, luminous wings, playful yet full of fortune.",
      image: meoImage,
      price: 800,
      rarity: "common",
      type: "wind",
      attack: 1500,
      defense: 1200,
      stars: 3,
      inStock: 12
    },
    {
      id: 5,
      name: "Tower Guardian",
      desc: "Ancient protector of magical towers, master of defensive strategies.",
      image: cityImage,
      price: 3000,
      rarity: "legendary",
      type: "earth",
      attack: 2800,
      defense: 3500,
      stars: 5,
      inStock: 2
    },
    {
      id: 6,
      name: "Mind Strategist",
      desc: "Master of chess-like tactics, every move calculated for victory.",
      image: chessImage,
      price: 1800,
      rarity: "rare",
      type: "psychic",
      attack: 2400,
      defense: 2000,
      stars: 4,
      inStock: 6
    },
    {
      id: 7,
      name: "War Commander",
      desc: "Leads armies into battle, inspiring allies with unmatched courage.",
      image: warImage,
      price: 2200,
      rarity: "epic",
      type: "warrior",
      attack: 2800,
      defense: 2300,
      stars: 4,
      inStock: 4
    },
    {
      id: 8,
      name: "Mountain Spirit",
      desc: "Ancient spirit of the highlands, guardian of sacred peaks.",
      image: nuiImage,
      price: 1600,
      rarity: "rare",
      type: "earth",
      attack: 2100,
      defense: 2400,
      stars: 4,
      inStock: 8
    },
    {
      id: 9,
      name: "Island Fortress",
      desc: "Mystical island that serves as both sanctuary and stronghold.",
      image: daoImage,
      price: 2800,
      rarity: "legendary",
      type: "water",
      attack: 2600,
      defense: 3200,
      stars: 5,
      inStock: 1
    },
    {
      id: 10,
      name: "Sky Wanderer",
      desc: "Floats through clouds and storms, master of aerial combat.",
      image: troiImage,
      price: 1400,
      rarity: "rare",
      type: "wind",
      attack: 2300,
      defense: 1700,
      stars: 4,
      inStock: 9
    },
    {
      id: 11,
      name: "Night Assassin",
      desc: "Strikes from shadows in neon-lit cities, swift and deadly.",
      image: nightImage,
      price: 2000,
      rarity: "epic",
      type: "dark",
      attack: 2700,
      defense: 1900,
      stars: 4,
      inStock: 5
    }
  ];

  // Lọc và sắp xếp thẻ bài
  const filteredCards = cards
    .filter(card => 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRarity === "all" || card.rarity === selectedRarity) &&
      (selectedType === "all" || card.type === selectedType)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rarity": {
          const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        }
        default: return a.name.localeCompare(b.name);
      }
    });

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common": return "text-gray-400";
      case "rare": return "text-blue-400";
      case "epic": return "text-purple-400";
      case "legendary": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };



  // Function to play purchase sound
  const playPurchaseSound = (frequency = 800, duration = 200) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch {
      // Ignore audio errors - browser might not support Web Audio API
      console.log('Audio not supported');
    }
  };

  const addToCart = (card) => {
    if (userMoney >= card.price && card.inStock > 0) {
      // Play purchase sound
      playPurchaseSound(card.rarity === 'legendary' ? 1000 : 800);
      
      // Thêm hiệu ứng mua hàng
      setPurchaseAnimation(card.id);
      
      // Cập nhật dữ liệu
      setCart([...cart, card]);
      setUserMoney(userMoney - card.price);
      
      // Giảm số lượng trong kho (trong thực tế sẽ update database)
      card.inStock -= 1;
      
      // Hiển thị thông báo mua thành công
      setToast({
        message: `Successfully bought ${card.name} for ${card.price.toLocaleString()} coins!`,
        type: 'purchase'
      });
      
      // Hiển thị confetti cho legendary cards
      if (card.rarity === 'legendary') {
        setShowConfetti(true);
      }
      
      // Tắt hiệu ứng sau 1 giây
      setTimeout(() => {
        setPurchaseAnimation(null);
      }, 1000);
    } else if (userMoney < card.price) {
      setToast({
        message: "Not enough coins to buy this card!",
        type: 'error'
      });
    } else {
      setToast({
        message: "This card is out of stock!",
        type: 'error'
      });
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center min-h-[60vh] mt-16"
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
            className="text-5xl md:text-7xl font-extrabold mb-6 
                       text-transparent bg-clip-text 
                       bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400"
          >
            Monster Card Shop
          </h1>
          <p
            data-aos="fade-up"
            className="text-gray-200 text-xl md:text-2xl mb-6 leading-relaxed"
          >
            Discover and collect powerful monster cards. Build your ultimate deck!
          </p>

          {/* Money Display trong hero section */}
          <div
            data-aos="fade-up"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800/90 to-gray-700/90 px-6 py-3 rounded-full inline-flex
                       border border-yellow-400/30 hover:border-white/60 transition-all duration-300"
          >
            <FaCoins className="text-yellow-400 text-2xl animate-pulse" />
            <span className="text-2xl font-bold text-yellow-400">
              {userMoney.toLocaleString()}
            </span>
            <span className="text-lg text-yellow-400/70 ml-1">Coins</span>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg 
                           focus:border-pink-400 focus:outline-none text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-400 focus:outline-none"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-400 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="beast">Beast</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="wind">Wind</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="psychic">Psychic</option>
                <option value="warrior">Warrior</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-400 focus:outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rarity">Sort by Rarity</option>
              </select>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-2 bg-pink-600 px-4 py-2 rounded-lg">
              <FaShoppingCart />
              <span className="font-semibold">Cart ({cart.length})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-12 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            data-aos="fade-up"
            className="text-4xl font-extrabold text-center mb-12 
                       text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
          >
            Available Cards ({filteredCards.length})
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {filteredCards.map((card, idx) => (
              <div
                key={card.id}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className={`relative bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50 rounded-xl overflow-hidden shadow-2xl
                           border-2 border-yellow-600 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl
                           ${purchaseAnimation === card.id ? 'animate-pulse scale-110 shadow-green-500/70' : ''}`}
                style={{
                  width: '280px',
                  height: '400px',
                  backgroundImage: 'linear-gradient(135deg, #f6d55c 0%, #f4d03f 25%, #f1c40f  50%, #d4af37 75%, #b8860b 100%)'
                }}
              >
                {/* Header với tên card - nhỏ lại */}
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-2 border-b-2 border-yellow-800">
                  <h3 className="text-black font-bold text-center text-xs leading-tight">
                    {card.name.toUpperCase()}
                  </h3>
                  
                  {/* Stars */}
                  <div className="flex justify-center mt-0.5">
                    {[...Array(card.stars)].map((_, i) => (
                      <FaStar key={i} className="text-orange-600 text-xs mx-0.5" />
                    ))}
                  </div>
                </div>

                {/* Image container với border - to hơn */}
                <div className="relative m-2 mb-1">
                  <div className="border border-gray-800 rounded-lg overflow-hidden bg-black">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-52 object-cover"
                    />
                  </div>
                  
                  {/* Rarity badge */}
                  <div className={`absolute top-1 right-1 ${getRarityColor(card.rarity)} bg-black/80 rounded px-1.5 py-0.5 text-xs font-bold uppercase`}>
                    {card.rarity}
                  </div>
                </div>

                {/* Type và description - xích lên */}
                <div className="px-2 mb-1">
                  <div className="bg-gray-100 border border-gray-400 rounded p-1.5 mb-1">
                    <div className="text-xs text-black font-semibold mb-0.5">
                      [{card.type.toUpperCase()}/EFFECT]
                    </div>
                    <p className="text-xs text-black leading-tight">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* ATK/DEF */}
                <div className="absolute bottom-12 right-3 text-black font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <span>ATK/{card.attack}</span>
                    <span>DEF/{card.defense}</span>
                  </div>
                </div>

                {/* Price, Stock và Buy button */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1">
                      <FaCoins className="text-yellow-400" />
                      <span className="font-bold text-yellow-400">
                        {card.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-green-400">
                      Stock: {card.inStock}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => addToCart(card)}
                    disabled={userMoney < card.price || card.inStock === 0}
                    className={`w-full py-1.5 rounded text-xs font-semibold transition-all duration-300 ${
                      userMoney >= card.price && card.inStock > 0
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-pink-500/50"
                        : "bg-gray-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {card.inStock === 0 ? "Out of Stock" : userMoney < card.price ? "Not Enough Coins" : "Buy Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">No cards match your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-4">
              GameVerse Shop
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              The ultimate destination for monster card collectors. Find rare and powerful cards to build your perfect deck.
            </p>
          </div>

          {/* Shop Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Shop Features
            </h3>
            <ul className="space-y-2 text-sm">
              <li>🃏 Premium Monster Cards</li>
              <li>⭐ Rare & Legendary Cards</li>
              <li>🔍 Advanced Search & Filter</li>
              <li>💰 Secure Coin System</li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Payment
            </h3>
            <div className="flex items-center gap-2 text-lg">
              <FaCoins className="text-yellow-400" />
              <span>GameVerse Coins</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Secure in-game currency system
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} GameVerse Shop. All rights reserved.
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confetti Effect */}
      <Confetti 
        show={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />

      {/* Floating Money Display - góc dưới phải */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-2 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm
                        px-4 py-3 rounded-xl border border-yellow-400/40 shadow-lg hover:shadow-yellow-400/30 transition-all duration-300">
          <FaCoins className="text-yellow-400 text-lg animate-pulse" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-yellow-400">
              {userMoney.toLocaleString()}
            </span>
            <span className="text-xs text-yellow-400/70">Coins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;