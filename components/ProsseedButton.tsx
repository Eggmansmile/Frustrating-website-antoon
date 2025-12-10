import React, { useState, useEffect, useRef } from 'react';
import { CaptchaModal } from './CaptchaModal';
import { VideoModal } from './VideoModal';
import { VerificationModal } from './VerificationModal';
import { FakeScanModal } from './FakeScanModal';

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
  const [captchasCompleted, setCaptchasCompleted] = useState(0);
  const [captchasRequired, setCaptchasRequired] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [clickAttempts, setClickAttempts] = useState(0);
  const [shouldShowWaitMessage, setShouldShowWaitMessage] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCount, setVerificationCount] = useState(0);
  const [requiresAction, setRequiresAction] = useState(true);
  const [showCriticalError, setShowCriticalError] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [buttonTired, setButtonTired] = useState(false);
  const [escapeAttempts, setEscapeAttempts] = useState(0);
  const [progressStage, setProgressStage] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle critical error reset after 3 seconds
  useEffect(() => {
    if (showCriticalError) {
      const timer = setTimeout(() => {
        setShowCriticalError(false);
        // Reset button state
        setPosition({ x: 0, y: 0 });
        setEscapeAttempts(0);
        setButtonTired(false);
        setLabel("Prosseed");
        setIsLoading(false);
        setLoadingPercent(0);
        setCaptchasCompleted(0);
        setCaptchasRequired(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCriticalError]);

  // Randomly move button on hover sometimes
  const handleHover = () => {
    setHoverCount(prev => prev + 1);
    
    // Button becomes tired after 6 escape attempts
    if (buttonTired) {
      return; // Button has given up
    }
    
    // Button escapes, with increasing frequency
    const escapeChance = Math.min(0.95, 0.4 + escapeAttempts * 0.1); // 40% -> 95% as escapeAttempts increases
    if (Math.random() < escapeChance) {
      setEscapeAttempts(prev => prev + 1);
      
      // Calculate movement distance (increases initially, then decreases as button gets tired)
      // Starts at 400px, grows to 500px at attempt 3, then shrinks to 100px by attempt 6
      let maxDistance = 400 + (escapeAttempts * 30); // 400 -> 580 as it panics
      if (escapeAttempts > 3) {
        maxDistance = 500 - ((escapeAttempts - 3) * 80); // 500 -> 260 as it tires
      }
      maxDistance = Math.max(80, maxDistance); // Minimum 80px
      
      const xOffset = (Math.random() - 0.5) * maxDistance;
      const yOffset = (Math.random() - 0.5) * maxDistance;
      setPosition({ x: xOffset, y: yOffset });
      
      // After 6 escape attempts, button gets too tired
      if (escapeAttempts >= 6) {
        setButtonTired(true);
        setLabel("😴 I give up...");
      }
    }
  };

  const startLoading = () => {
    setIsLoading(true);
    setLabel("Prosseeding...");
    setShowCriticalError(false);
    
    // MUCH SHORTER loading - only takes 8-12 seconds instead of 30-60
    let progress = 0;
    let stuckCount = 0;
    const interval = setInterval(() => {
      const randomBehavior = Math.random();
      
      // 5% chance to reset (less punishing)
      if (randomBehavior < 0.05) {
        progress = Math.max(0, progress - 30);
      }
      // 8% chance to jump backwards
      else if (randomBehavior < 0.13) {
        progress -= Math.random() * 10;
        if (progress < 0) progress = 0;
      }
      // 15% chance to jump forward
      else if (randomBehavior < 0.28) {
        progress += Math.random() * 15;
      }
      // 8% chance to get stuck
      else if (randomBehavior < 0.36) {
        stuckCount++;
        if (stuckCount > 5) {
          stuckCount = 0;
        }
      }
      // Normal increment (much faster)
      else {
        progress += Math.random() * 4;
      }
      
      // Still hard but reachable
      if (progress > 95) {
        progress = Math.min(progress, 98);
      }
      
      if (progress >= 99) {
        progress = 100;
        clearInterval(interval);
        
        // Show video - loading completes quickly
        setTimeout(() => {
            setShowVideo(true);
            setIsLoading(false);
        }, 800);
      }
      
      setLoadingPercent(Math.floor(progress));
    }, 150);
  };

  const handleClick = () => {
    if (isLoading) return;

    setClickAttempts(prev => prev + 1);

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
      "System Error: Please enable JavaScript to continue. (It's already enabled)",
      "You have exceeded your daily click limit. Come back tomorrow.",
      "ERROR 404: Your motivation not found.",
      "This action is not available in your country. Recalibrating...",
      "Required field missing: Your patience. Please try again.",
      "Error: The server is currently having a nap. Check back later.",
      "Warning: This action may cause existential dread.",
      "CRITICAL: The cake is a lie.",
    ];

    // Stage 0: Annoying prompts and CAPTCHAs
    if (progressStage === 0) {
      // 50% chance to block with annoying prompt
      if (Math.random() > 0.5) {
        const randomPrompt = annoyingPrompts[Math.floor(Math.random() * annoyingPrompts.length)];
        alert(randomPrompt);
        return;
      }

      // Start 3 CAPTCHAs (guaranteed first step)
      setCaptchasRequired(3);
      setCaptchasCompleted(0);
      setShowCaptcha(true);
      setShouldShowWaitMessage(true);
      return;
    }
  };

  const handleCaptchaSuccess = () => {
    const newCompleted = captchasCompleted + 1;
    setCaptchasCompleted(newCompleted);

    if (newCompleted >= captchasRequired) {
      // All CAPTCHAs done, move to next stage
      setShowCaptcha(false);
      setShouldShowWaitMessage(false);
      setProgressStage(1);
      setShowScan(true);
    } else {
      // More CAPTCHAs required
      setShowCaptcha(false);
      setTimeout(() => {
        setShowCaptcha(true);
      }, 100);
    }
  };

  const handleScanComplete = () => {
    setShowScan(false);
    // Move to verification stage
    setProgressStage(2);
    setShowVerification(true);
  };

  const handleVerificationComplete = () => {
    setShowVerification(false);
    
    // 25% chance for critical error (guaranteed element)
    if (Math.random() < 0.25) {
      setProgressStage(3);
      setShowCriticalError(true);
      // After 3 seconds, move to loading
      setTimeout(() => {
        setShowCriticalError(false);
        setProgressStage(4);
        startLoading();
      }, 3000);
    } else {
      // Move to loading
      setProgressStage(4);
      startLoading();
    }
  };

  return (
    <div className="relative inline-block p-10">
      {showCaptcha && (
        <CaptchaModal
          onSuccess={handleCaptchaSuccess}
          onClose={() => {
            setShowCaptcha(false);
            setShouldShowWaitMessage(false);
          }}
        />
      )}
      <VerificationModal
        isVisible={showVerification}
        onClose={handleVerificationComplete}
      />
      <FakeScanModal
        isVisible={showScan}
        onComplete={handleScanComplete}
      />
      {showVideo && (
        <VideoModal
          onClose={() => {
            setShowVideo(false);
            // Reset button state for "Do It Again"
            setPosition({ x: 0, y: 0 });
            setEscapeAttempts(0);
            setButtonTired(false);
            setLabel("Prosseed");
          }}
        />
      )}
      
      {/* Critical Error Modal */}
      {showCriticalError && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-red-900 border-8 border-red-600 p-8 rounded-lg w-96 text-center">
            <div className="text-6xl mb-4 animate-pulse">🚨</div>
            <h2 className="text-3xl font-bold text-red-100 mb-2">CRITICAL ERROR</h2>
            <p className="text-white text-lg font-bold mb-2">SYSTEM FAILURE DETECTED</p>
            <p className="text-red-200 mb-4">All your progress has been lost.</p>
            <p className="text-sm text-red-300">Error Code: 0xDEADBEEF</p>
            <p className="text-xs text-red-400 mt-2">Please try again...</p>
          </div>
        </div>
      )}
      
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
      
      {/* CAPTCHA Progress Indicator */}
      {shouldShowWaitMessage && captchasRequired > 0 && (
        <div className="absolute -bottom-12 left-0 text-xs text-orange-600 font-bold w-full text-center animate-pulse">
          Verify: {captchasCompleted}/{captchasRequired} CAPTCHAs completed
        </div>
      )}
      
      {/* Annoying helper text */}
      <div className="absolute -bottom-8 left-0 text-xs text-red-600 animate-bounce-fast w-full text-center">
        (Do not click if you are human) • Click attempts: {clickAttempts}
      </div>
    </div>
  );
};