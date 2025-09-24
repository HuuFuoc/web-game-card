import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCoins } from 'react-icons/fa';

const Toast = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-400" />;
      case 'error':
        return <FaTimesCircle className="text-red-400" />;
      case 'purchase':
        return <FaCoins className="text-yellow-400" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600/90';
      case 'error':
        return 'bg-red-600/90';
      case 'purchase':
        return 'bg-purple-600/90';
      default:
        return 'bg-gray-600/90';
    }
  };

  return (
    <div
      className={`fixed top-24 right-6 z-[1001] ${getBgColor()} text-white px-6 py-4 rounded-lg shadow-lg 
                  transform transition-all duration-300 animate-pulse backdrop-blur-sm
                  flex items-center gap-3 max-w-sm`}
    >
      {getIcon()}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/70 hover:text-white transition-colors"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;