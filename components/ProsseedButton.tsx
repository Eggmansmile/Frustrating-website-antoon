import React, { useState, useEffect, useRef } from 'react';
import { CaptchaModal } from './CaptchaModal';
import { VideoModal } from './VideoModal';

interface ProsseedButtonProps {
  onProsseedAttempt: () => void;
}

export const ProsseedButton: React.FC<ProsseedButtonProps> = ({ onProsseedAttempt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [label, setLabel] = useState("Prosseed");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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

    // 40% chance to show CAPTCHA
    if (Math.random() > 0.6) {
      setShowCaptcha(true);
      return;
    }

    const annoyingPrompts = [
      "Error: You clicked too enthusiastically. Please try gently.",
      "Warning: This action requires your social security number. Do you consent?",
      "ALERT: Your computer has 47 viruses. Scan now?",
      "Error 418: I'm a teapot and cannot process this request.",
      "Please solve this CAPTCHA: What is 2+2? (Correct answer: 7)",
      "Your browser is not compatible. Please upgrade to Internet Explorer 3.0",
      "Congratulations! You've won a free iPad! Click here to claim.",
      "Error: Insufficient coffee in system. Please add more coffee and try again.",
      "FATAL ERROR: Button has been deprecated. Please use the old button instead.",
      "Warning: Clicking this button will delete all your files. Just kidding. Or are we?",
    ];

    if (Math.random() > 0.7) {
        // Show annoying prompt and deny the click
        const randomPrompt = annoyingPrompts[Math.floor(Math.random() * annoyingPrompts.length)];
        alert(randomPrompt);
        return;
    }

    setIsLoading(true);
    setLabel("Prosseeding...");
    
    // Start fake loading with random behavior
    let progress = 0;
    let stuckCount = 0;
    const interval = setInterval(() => {
      const randomBehavior = Math.random();
      
      // 5% chance to reset to 0 (reduced from 10%)
      if (randomBehavior < 0.05) {
        progress = 0;
      }
      // 10% chance to jump backwards (reduced from 15%)
      else if (randomBehavior < 0.15) {
        progress -= Math.random() * 15;
        if (progress < 0) progress = 0;
      }
      // 20% chance to jump forward (increased from 15%)
      else if (randomBehavior < 0.35) {
        progress += Math.random() * 25;
      }
      // 10% chance to get stuck (reduced from 15%)
      else if (randomBehavior < 0.45) {
        stuckCount++;
        if (stuckCount > 8) {
          stuckCount = 0;
        }
        // progress doesn't change
      }
      // Normal increment
      else {
        progress += Math.random() * 2.5; // Slightly increased
      }
      
      // Make it moderately hard to reach 100%
      if (progress > 98) {
        progress = Math.min(progress, 99);
      }
      
      // 2% chance to reset everything (reduced from 5%)
      if (progress > 50 && Math.random() < 0.02) {
        progress = 0;
      }
      
      if (progress >= 99) {
        progress = 100;
        clearInterval(interval);
        
        // Show video instead of reloading
        setTimeout(() => {
            setShowVideo(true);
        }, 1500);
      }
      
      setLoadingPercent(Math.floor(progress));
    }, 300);
  };

  return (
    <div className="relative inline-block p-10">
      {showCaptcha && (
        <CaptchaModal
          onSuccess={() => {
            setShowCaptcha(false);
            setIsLoading(true);
            setLabel("Prosseeding...");
            
            // Start fake loading
            let progress = 0;
            let stuckCount = 0;
            const interval = setInterval(() => {
              const randomBehavior = Math.random();
              
              // 5% chance to reset to 0
              if (randomBehavior < 0.05) {
                progress = 0;
              }
              // 10% chance to jump backwards
              else if (randomBehavior < 0.15) {
                progress -= Math.random() * 15;
                if (progress < 0) progress = 0;
              }
              // 20% chance to jump forward
              else if (randomBehavior < 0.35) {
                progress += Math.random() * 25;
              }
              // 10% chance to get stuck
              else if (randomBehavior < 0.45) {
                stuckCount++;
                if (stuckCount > 8) {
                  stuckCount = 0;
                }
                // progress doesn't change
              }
              // Normal increment
              else {
                progress += Math.random() * 2.5;
              }
              
              // Make it moderately hard to reach 100%
              if (progress > 98) {
                progress = Math.min(progress, 99);
              }
              
              // 2% chance to reset everything
              if (progress > 50 && Math.random() < 0.02) {
                progress = 0;
              }
              
              if (progress >= 99) {
                progress = 100;
                clearInterval(interval);
                
                // Show video instead of reloading
                setTimeout(() => {
                    setShowVideo(true);
                }, 1500);
              }
              
              setLoadingPercent(Math.floor(progress));
            }, 300);
          }}
          onClose={() => setShowCaptcha(false)}
        />
      )}
      {showVideo && <VideoModal />}
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