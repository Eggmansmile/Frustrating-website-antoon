import React, { useState, useEffect, useRef } from 'react';
import { CaptchaModal } from './CaptchaModal';
import { VideoModal } from './VideoModal';
import { VerificationModal } from './VerificationModal';

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

  const startLoading = () => {
    setIsLoading(true);
    setLabel("Prosseeding...");
    setShowCriticalError(false);
    
    // Start fake loading with random behavior - UNINTERRUPTIBLE
    let progress = 0;
    let stuckCount = 0;
    const interval = setInterval(() => {
      const randomBehavior = Math.random();
      
      // 8% chance to reset to 0 (more punishing)
      if (randomBehavior < 0.08) {
        progress = 0;
      }
      // 12% chance to jump backwards
      else if (randomBehavior < 0.20) {
        progress -= Math.random() * 20;
        if (progress < 0) progress = 0;
      }
      // 18% chance to jump forward
      else if (randomBehavior < 0.38) {
        progress += Math.random() * 20;
      }
      // 12% chance to get stuck
      else if (randomBehavior < 0.50) {
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
      
      // Make it very hard to reach 100%
      if (progress > 95) {
        progress = Math.min(progress, 98);
      }
      
      // 3% chance to reset everything after 50%
      if (progress > 50 && Math.random() < 0.03) {
        progress = 0;
      }
      
      if (progress >= 99) {
        progress = 100;
        clearInterval(interval);
        
        // Show video instead of reloading - LOADING COMPLETES SUCCESSFULLY
        setTimeout(() => {
            setShowVideo(true);
            setIsLoading(false);
        }, 1500);
      }
      
      setLoadingPercent(Math.floor(progress));
    }, 300);
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

    // Extremely aggressive annoying prompts (60% chance now)
    if (Math.random() > 0.4) {
        const randomPrompt = annoyingPrompts[Math.floor(Math.random() * annoyingPrompts.length)];
        alert(randomPrompt);
        return;
    }

    // Determine number of CAPTCHAs required (2-4 now, more than before)
    const requiredCaptchas = Math.floor(Math.random() * 3) + 2; // 2-4
    
    // Only 5% chance to actually start loading (reduced from 10%)
    if (Math.random() > 0.05) {
      // Show CAPTCHA instead
      setCaptchasRequired(requiredCaptchas);
      setCaptchasCompleted(0);
      setShowCaptcha(true);
      setShouldShowWaitMessage(true);
      return;
    }

    // Even if we get past CAPTCHAs, we need verification
    setRequiresAction(true);
    setShowCaptcha(false);
    setShouldShowWaitMessage(false);
  };

  const handleCaptchaSuccess = () => {
    const newCompleted = captchasCompleted + 1;
    setCaptchasCompleted(newCompleted);

    if (newCompleted >= captchasRequired) {
      // All CAPTCHAs done, ALWAYS show verification before loading
      setShowCaptcha(false);
      setShouldShowWaitMessage(false);
      setVerificationCount(prev => prev + 1);
      
      // 20% chance for critical error after verification
      if (Math.random() > 0.8) {
        // Show verification, then critical error
        setShowVerification(true);
        setTimeout(() => {
          setShowVerification(false);
          setShowCriticalError(true);
          setIsLoading(false);
          setLoadingPercent(0);
          setLabel("Prosseed");
          // Critical error stays for 3 seconds, then disappears
          setTimeout(() => {
            setShowCriticalError(false);
          }, 3000);
        }, 4000);
      }
      // 30% chance to require another verification after this one
      else if (Math.random() > 0.7 && verificationCount < 2) {
        // Show verification, then repeat
        setShowVerification(true);
        setTimeout(() => {
          setShowVerification(false);
          setShowCaptcha(true);
          setCaptchasRequired(Math.floor(Math.random() * 2) + 1); // 1-2 more CAPTCHAs
          setCaptchasCompleted(0);
          setShouldShowWaitMessage(true);
        }, 4000);
      } else {
        // Show verification, then start loading (and it will complete uninterrupted)
        setShowVerification(true);
        setTimeout(() => {
          setShowVerification(false);
          startLoading();
        }, 4000);
      }
    } else {
      // More CAPTCHAs required
      setShowCaptcha(false);
      setTimeout(() => {
        setShowCaptcha(true);
      }, 100);
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
        onClose={() => setShowVerification(false)}
      />
      {showVideo && <VideoModal />}
      
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