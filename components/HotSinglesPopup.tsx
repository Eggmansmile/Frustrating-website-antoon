import React, { useState, useEffect } from 'react';

interface HotSinglesPopupProps {
  isVisible: boolean;
}

export const HotSinglesPopup: React.FC<HotSinglesPopupProps> = ({ isVisible }) => {
  const [escaped, setEscaped] = useState(false);

  if (!isVisible || escaped) return null;

  return (
    <div
      className="fixed z-50 bg-gradient-to-b from-red-600 to-red-700 border-4 border-yellow-400 rounded-lg p-6 shadow-2xl cursor-pointer w-80 pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="text-center">
        <div className="text-yellow-300 text-2xl font-black mb-2 animate-pulse">
          🔥 HOT SINGLES 🔥
        </div>
        <div className="text-white font-bold text-sm mb-3">
          in your area are waiting to meet YOU!
        </div>
        <div className="bg-red-500 border-2 border-yellow-300 p-3 mb-3 rounded">
          <div className="text-white font-mono text-xs leading-relaxed">
            👩 Jennifer, 23<br/>
            👱 Ashley, 19<br/>
            👩‍🦱 Michelle, 25<br/>
            <br/>
            <span className="text-yellow-300 font-black">CLICK HERE NOW!</span>
          </div>
        </div>
        <button
          onClick={() => setEscaped(true)}
          className="bg-yellow-400 hover:bg-yellow-300 text-red-700 font-black px-4 py-2 rounded w-full transition-all"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};
