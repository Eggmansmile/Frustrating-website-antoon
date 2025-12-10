import React, { useState, useEffect, useRef } from 'react';

interface ProsseedButtonProps {
  onProsseedAttempt: () => void;
}

export const ProsseedButton: React.FC<ProsseedButtonProps> = ({ onProsseedAttempt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [label, setLabel] = useState("Prosseed");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Randomly move button on hover sometimes
  const handleHover = () => {
    setHoverCount(prev => prev + 1);
    
    // 50% chance to move away
    if (Math.random() > 0.5) {
      const xOffset = (Math.random() - 0.5) * 300; // Move up to 150px
      const yOffset = (Math.random() - 0.5) * 300;
      setPosition({ x: xOffset, y: yOffset });
    }
  };

  const handleClick = () => {
    if (isLoading) return;

    if (Math.random() > 0.7) {
        // Fake error alert
        alert("Error: You clicked too enthusiastically. Please try gently.");
        return;
    }

    setIsLoading(true);
    setLabel("Prosseeding...");
    
    // Start fake loading
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress > 99) {
        progress = 99; // Get stuck at 99%
        clearInterval(interval);
        
        // Wait a bit at 99%, then crash
        setTimeout(() => {
            alert("Rebooting computer give me till the end of the universe");
            window.location.reload(); // Reloads the website completely
        }, 1500);
      }
      setLoadingPercent(progress);
    }, 100);
  };

  return (
    <div className="relative inline-block p-10">
      <button
        ref={buttonRef}
        onMouseEnter={handleHover}
        onClick={handleClick}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${hoverCount % 2 === 0 ? '1deg' : '-1deg'})`,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className={`
          relative z-10 px-8 py-4 
          text-3xl font-fancy font-bold tracking-widest
          text-white bg-blue-600 
          border-b-8 border-r-8 border-blue-800 
          active:border-b-0 active:border-r-0 active:translate-y-2
          shadow-xl hover:bg-blue-500
          ${isLoading ? 'cursor-wait opacity-80' : 'cursor-pointer'}
        `}
      >
        {isLoading ? (
            <span>
             Wait... {Math.floor(loadingPercent)}%
            </span>
        ) : label}
      </button>
      
      {/* Fake Loading Bar Overlay */}
      {isLoading && (
        <div className="absolute bottom-0 left-0 h-4 bg-eye-green transition-all duration-100 border border-black" style={{ width: `${loadingPercent}%` }}></div>
      )}
      
      {/* Annoying helper text */}
      <div className="absolute -bottom-8 left-0 text-xs text-red-600 animate-bounce-fast w-full text-center">
        (Do not click if you are human)
      </div>
    </div>
  );
};