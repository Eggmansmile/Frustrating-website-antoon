import React from 'react';

export const NuclearCodesButton: React.FC = () => {
  const handleClick = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg border-4 border-black shadow-lg z-40 animate-pulse"
    >
      Would you like to see the nuclear launch codes?
    </button>
  );
};
