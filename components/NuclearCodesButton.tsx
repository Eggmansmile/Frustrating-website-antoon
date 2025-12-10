import React, { useState, useEffect } from 'react';

export const NuclearCodesButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-20 transform -translate-y-1/2 z-40">
      <div className="relative inline-block">
        <button
          onClick={handleClick}
          className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg border-4 border-black shadow-lg animate-pulse w-32 h-32 flex items-center justify-center text-center text-xs relative"
        >
          Would you like to see the nuclear launch codes?
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 text-white font-bold text-xs leading-none p-0 w-4 h-4 flex items-center justify-center pointer-events-auto hover:text-yellow-300"
            style={{
              fontSize: '16px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              clipPath: 'circle(30%)',
              cursor: 'pointer'
            }}
            title="close"
          >
            ✕
          </button>
        </button>
      </div>
    </div>
  );
};
