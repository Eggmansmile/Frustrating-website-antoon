import React, { useState } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hoverCount, setHoverCount] = useState(0);

  const handleDeclineHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const banner = btn.parentElement;
    if (!banner) return;

    const bannerRect = banner.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    // Generate larger random position within banner bounds
    let randomX = (Math.random() - 0.5) * 300;
    let randomY = (Math.random() - 0.5) * 150;

    // Keep button within banner
    const newX = Math.max(-btnRect.width / 2, Math.min(randomX, bannerRect.width - btnRect.width / 2));
    const newY = Math.max(-btnRect.height / 2, Math.min(randomY, bannerRect.height - btnRect.height / 2));

    btn.style.transform = `translate(${newX}px, ${newY}px)`;
    setHoverCount(prev => prev + 1);
  };

  const handleAccept = () => {
    // Make weird things happen
    document.body.style.transform = 'rotate(180deg)';
    document.body.style.transition = 'transform 2s ease-in-out';
    
    // Start cats falling after page is rotated
    setTimeout(() => {
      const catEmojis = ['🐱', '😹', '😸', '😻', '😼', '😽', '😾', '😿'];
      
      for (let i = 0; i < 20; i++) {
        const cat = document.createElement('div');
        cat.innerHTML = catEmojis[Math.floor(Math.random() * catEmojis.length)];
        cat.style.position = 'fixed';
        cat.style.top = '-50px'; // Start from top (which is bottom when flipped)
        cat.style.left = Math.random() * 100 + '%';
        cat.style.fontSize = (Math.random() * 30 + 30) + 'px';
        cat.style.zIndex = '9999';
        cat.style.pointerEvents = 'none';
        cat.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        cat.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(cat);
      }
      
      // Add floating cookies after cats start falling
      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          const cookie = document.createElement('div');
          cookie.innerHTML = '🍪';
          cookie.style.position = 'fixed';
          cookie.style.top = Math.random() * 100 + '%';
          cookie.style.left = Math.random() * 100 + '%';
          cookie.style.fontSize = (Math.random() * 20 + 20) + 'px';
          cookie.style.zIndex = '10000';
          cookie.style.pointerEvents = 'none';
          cookie.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
          cookie.style.transform = `rotate(${Math.random() * 360}deg)`;
          document.body.appendChild(cookie);
        }
      }, 1000);
    }, 2000);
    
    // Add animations
    if (!document.querySelector('style[data-cookie-animations]')) {
      const style = document.createElement('style');
      style.setAttribute('data-cookie-animations', 'true');
      style.textContent = `
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Flip it back after 5 seconds with smooth transition
    setTimeout(() => {
      document.body.style.transition = 'transform 3s ease-in-out';
      document.body.style.transform = 'rotate(0deg)';
      alert("Your cookies have been accepted... and cats have invaded! 🐱🍪");
      setIsVisible(false);
    }, 5000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-3 z-30 flex flex-col items-center justify-center gap-2 opacity-95">
      <h3 className="text-sm font-bold text-pain-yellow">📚 STUDENT DATA COLLECTION NOTICE 📚</h3>
      <p className="text-center max-w-2xl text-xs">
        We use cookies to track your procrastination habits and study patterns. By clicking "Accept", you consent to us monitoring your life choices. By clicking "Decline", you're just delaying the inevitable.
      </p>
      <div className="flex gap-6 mt-2 relative w-full justify-center h-12">
        <button 
          onClick={handleAccept}
          className="bg-green-500 px-4 py-1 rounded text-sm font-bold hover:bg-green-600 h-8"
        >
          Accept All Cookies 🍪
        </button>
        
        <button 
          onMouseEnter={handleDeclineHover}
          onClick={() => {
              setIsVisible(false);
          }}
          className="bg-red-500 px-4 py-1 rounded text-sm font-bold absolute transition-transform duration-100 h-8"
          style={{ top: 0 }}
        >
          {hoverCount > 5 ? "Just Click Accept!" : "Decline"}
        </button>
      </div>
    </div>
  );
};