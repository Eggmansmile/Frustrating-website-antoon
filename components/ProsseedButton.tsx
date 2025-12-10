import React, { useState, useEffect, useRef } from 'react';
import { CaptchaModal } from './CaptchaModal';
import { VideoModal } from './VideoModal';

interface ProsseedButtonProps {
  onProsseedAttempt: () => void;
}

// Sound effect function using Web Audio API
const playRandomSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sounds = [
    { freq: 800, duration: 0.1 }, // beep
    { freq: 400, duration: 0.2 }, // low beep
    { freq: 1200, duration: 0.15 }, // high beep
    { freq: 600, duration: 0.1 }, // mid beep
  ];
  
  const sound = sounds[Math.floor(Math.random() * sounds.length)];
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.frequency.value = sound.freq;
  osc.type = 'sine';
  
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + sound.duration);
};

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

    // Play random click sound
    playRandomSound();

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
        // Random annoying error alert
        const randomPrompt = annoyingPrompts[Math.floor(Math.random() * annoyingPrompts.length)];
        alert(randomPrompt);
        playRandomSound();
        return;
    }

    setIsLoading(true);
    setLabel("Prosseeding...");
    
    // Start fake loading with random behavior
    let progress = 0;
    let stuckCount = 0;
    const interval = setInterval(() => {
      playRandomSound();
      const randomBehavior = Math.random();
      
      // 10% chance to reset to 0
      if (randomBehavior < 0.1) {
        progress = 0;
        alert("Loading reset. Starting over...");
        playRandomSound();
      }
      // 15% chance to jump backwards
      else if (randomBehavior < 0.25) {
        progress -= Math.random() * 20;
        if (progress < 0) progress = 0;
      }
      // 15% chance to jump forward
      else if (randomBehavior < 0.4) {
        progress += Math.random() * 25;
      }
      // 15% chance to get stuck
      else if (randomBehavior < 0.55) {
        stuckCount++;
        if (stuckCount > 5) {
          alert("Loading seems to be taking a while... try again?");
          playRandomSound();
          stuckCount = 0;
        }
        // progress doesn't change
      }
      // Normal increment
      else {
        progress += Math.random() * 2; // Increased increment speed
      }
      
      // Make it moderately hard to reach 100%
      if (progress > 98) {
        progress = Math.min(progress, 99); // Cap at 99% but allow progression
      }
      
      // 5% chance to reset everything and force retry
      if (progress > 50 && Math.random() < 0.05) {
        progress = 0;
        alert("Connection lost. Please try again.");
        playRandomSound();
      }
      
      if (progress >= 99) {
        progress = 100;
        clearInterval(interval);
        playRandomSound();
        
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
              playRandomSound();
              const randomBehavior = Math.random();
              
              // 10% chance to reset to 0
              if (randomBehavior < 0.1) {
                progress = 0;
                alert("Loading reset. Starting over...");
                playRandomSound();
              }
              // 15% chance to jump backwards
              else if (randomBehavior < 0.25) {
                progress -= Math.random() * 20;
                if (progress < 0) progress = 0;
              }
              // 15% chance to jump forward
              else if (randomBehavior < 0.4) {
                progress += Math.random() * 25;
              }
              // 15% chance to get stuck
              else if (randomBehavior < 0.55) {
                stuckCount++;
                if (stuckCount > 5) {
                  alert("Loading seems to be taking a while... try again?");
                  playRandomSound();
                  stuckCount = 0;
                }
                // progress doesn't change
              }
              // Normal increment
              else {
                progress += Math.random() * 2;
              }
              
              // Make it moderately hard to reach 100%
              if (progress > 98) {
                progress = Math.min(progress, 99);
              }
              
              // 5% chance to reset everything and force retry
              if (progress > 50 && Math.random() < 0.05) {
                progress = 0;
                alert("Connection lost. Please try again.");
                playRandomSound();
              }
              
              if (progress >= 99) {
                progress = 100;
                clearInterval(interval);
                playRandomSound();
                
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