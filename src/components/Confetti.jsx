import React, { useEffect, useState } from 'react';

const Confetti = ({ show, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      // Tạo 50 particles với vị trí và màu sắc ngẫu nhiên
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.3,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -15 - 5,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)],
        size: Math.random() * 8 + 4,
        life: 1.0
      }));
      setParticles(newParticles);

      // Animation loop
      const animateParticles = () => {
        setParticles(prev => 
          prev.map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.5, // gravity
            life: particle.life - 0.02
          })).filter(particle => particle.life > 0)
        );
      };

      const interval = setInterval(animateParticles, 16);
      
      // Cleanup after 3 seconds
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setParticles([]);
        onComplete();
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000]">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `rotate(${particle.x + particle.y}deg)`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;