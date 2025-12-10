import React, { useState } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hoverCount, setHoverCount] = useState(0);

  const handleDeclineHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    setHoverCount(prev => prev + 1);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-8 z-30 flex flex-col items-center justify-center gap-4 opacity-95">
      <h3 className="text-2xl font-bold text-pain-yellow blink">WE VALUE YOUR PRIVACY (NOT REALLY)</h3>
      <p className="text-center max-w-2xl">
        We use cookies to ensure you have the most frustrating experience possible. 
        By clicking "Accept", you agree to give us your soul. By clicking "Decline", you admit defeat.
      </p>
      <div className="flex gap-10 mt-4 relative w-full justify-center h-20">
        <button 
          onClick={() => alert("Great choice! We have now installed 100 toolbars.")}
          className="bg-green-500 px-6 py-2 rounded font-bold hover:bg-green-600 h-10"
        >
          Accept All Cookies 🍪
        </button>
        
        <button 
          onMouseEnter={handleDeclineHover}
          onClick={() => {
              alert("Error: Decline button is currently out of stock.");
              setIsVisible(true); 
          }}
          className="bg-red-500 px-6 py-2 rounded font-bold absolute transition-transform duration-100 h-10"
          style={{ top: 0 }}
        >
          {hoverCount > 5 ? "Just Click Accept!" : "Decline"}
        </button>
      </div>
    </div>
  );
};