import React, { useState, useEffect, useRef } from 'react';
import { CaptchaModal } from './CaptchaModal';
import { VideoModal } from './VideoModal';
import { VerificationModal } from './VerificationModal';
import { FakeScanModal } from './FakeScanModal';
import { InteractivePhysics } from './InteractivePhysics';
import { HotSinglesPopup } from './HotSinglesPopup';

interface ProsseedButtonProps {
  onProsseedAttempt: () => void;
}

export const ProsseedButton: React.FC<ProsseedButtonProps> = ({ onProsseedAttempt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [label, setLabel] = useState("Prosseed");
  const [clickAttempts, setClickAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showPhysics, setShowPhysics] = useState(true);
  const [showHotSingles, setShowHotSingles] = useState(false);
  const [verificationUsed, setVerificationUsed] = useState(false);
  const [scanUsed, setScanUsed] = useState(false);
  const [showRoastAlert, setShowRoastAlert] = useState(false);
  const [roastMessage, setRoastMessage] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const CLICKS_REQUIRED = 10;

  // Button hover - make it escape more aggressively
  const handleHover = () => {
    setHoverCount(prev => prev + 1);
    
    // 70% chance to escape (increased from 30%)
    if (Math.random() < 0.7) {
      const xOffset = (Math.random() - 0.5) * 400;
      const yOffset = (Math.random() - 0.5) * 400;
      setPosition({ x: xOffset, y: yOffset });
    }
  };

  const startLoading = () => {
    setIsLoading(true);
    setLabel("Prosseeding...");
    setShowHotSingles(true);
    
    // Simple 10-second loading
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 3 + 1; // 1-4% per tick
      progress = Math.min(progress, 99);
      
      setLoadingPercent(Math.floor(progress));
      
      if (progress >= 99) {
        clearInterval(interval);
        setLoadingPercent(100);
        
        setTimeout(() => {
          setShowVideo(true);
          setIsLoading(false);
          setShowHotSingles(false);
        }, 300);
      }
    }, 500); // Updates every 500ms, ~10 seconds to complete
  };

  const handleClick = () => {
    if (isLoading) return;

    const newClickCount = clickAttempts + 1;
    setClickAttempts(newClickCount);

    // Need 10+ clicks to start loading
    if (newClickCount < CLICKS_REQUIRED) {
      // Show random element instead - always show something
      const availableElements = ['alert', 'alert', 'alert', 'captcha'];
      if (!verificationUsed) availableElements.push('verification');
      if (!scanUsed) availableElements.push('scan');
      
      const randomElement = availableElements[Math.floor(Math.random() * availableElements.length)];

      // Close any existing modals first
      setShowCaptcha(false);
      setShowVerification(false);
      setShowScan(false);

      // Then open the new one
      setTimeout(() => {
        if (randomElement === 'alert') {
          showAnnoyingAlert();
        } else if (randomElement === 'captcha') {
          setShowCaptcha(true);
        } else if (randomElement === 'verification') {
          setShowVerification(true);
          setVerificationUsed(true);
        } else if (randomElement === 'scan') {
          setShowScan(true);
          setScanUsed(true);
        }
      }, 50);
      
      return;
    }

    // 10+ clicks reached, start loading
    startLoading();
  };

  const showAnnoyingAlert = () => {
    const annoyingMessages = [
      "🔥 ROAST ALERT 🔥\n\nThat click deserved better luck, but luck betrayed you!",
      "💀 DRAMATIC FAILURE 💀\n\nThe button laughs at your persistence!",
      "😬 PLOT TWIST 😬\n\nYou expected something? WRONG!",
      "🎭 THEATRICAL REJECTION 🎭\n\nYour attempt has left the building... in disappointment!",
      "⚡ EPIC LETDOWN ⚡\n\nThis is the moment your journey takes a tragic turn!",
      "🎪 CIRCUS OF CHAOS 🎪\n\nYou've become the main attraction of failure!",
      "🌪️ TORNADO OF FRUSTRATION 🌪️\n\nEverything you touch crumbles to dust!",
      "😈 VILLAINY ACTIVATED 😈\n\nThe universe conspires against you!",
      "🎯 BULLSEYE FOR DISAPPOINTMENT 🎯\n\nYou hit the target perfectly... of embarrassment!",
      "📉 STOCK MARKET CRASH 📉\n\nYour success rate just plummeted to zero!",
      "🪦 RIP YOUR DREAMS 🪦\n\nAnother casualty in the war against clicking!",
      "🔮 FORTUNE TELLER'S PROPHECY 🔮\n\nI see... MORE SUFFERING IN YOUR FUTURE!",
      "⚔️ EPIC BATTLE LOST ⚔️\n\nYou stood against the button... the button won!",
      "🎬 SCENE CUT 🎬\n\nDirector says: Try that again, but with COMPETENCE!",
      "🌋 VOLCANIC ERUPTION 🌋\n\nYour hopes just melted into lava!",
      "📚 STUDY GONE WRONG 📚\n\nYou were supposed to be studying, not clicking buttons!",
      "🎓 PROCRASTINATION DETECTED 🎓\n\nThis is what happens when you avoid your homework!",
      "❌ FAIL ALERT ❌\n\nYour GPA just cried a little!",
      "🚨 DEADLINE INCOMING 🚨\n\nThat assignment is due tomorrow and you're HERE?",
      "📖 BOOK ABANDONED 📖\n\nYour textbook feels lonely without you!",
      "⏰ TIME WASTED ⏰\n\nCould've studied for 3 chapters by now!",
      "🎒 STUDENT LIFE 🎒\n\nThis is why your grades are suffering!",
      "📝 QUIZ TOMORROW 📝\n\nAnd you still haven't started studying!",
      "💻 WRONG WINDOW 💻\n\nYour essay tab is crying in the background!",
      "🏫 CLASS REGRET 🏫\n\nYou skipped studying for THIS?",
      "📊 GRADES PLUMMETING 📊\n\nAnother click closer to academic ruin!",
      "🔴 RED FLAG 🔴\n\nYour professor is disappointed in your priorities!",
      "😴 ALL-NIGHTER INCOMING 😴\n\nGood luck studying at 3 AM!",
      "🪦 RIP YOUR GPA 🪦\n\nAnother victim of procrastination!",
      "📱 PHONE ADDICTION 📱\n\nThis is what they warn about in health class!",
      "🚫 FOCUS LOST 🚫\n\nYour study session is now officially ruined!",
      "⚠️ ATTENTION SPAN 0% ⚠️\n\nYou couldn't focus if your life depended on it!",
      "🎯 WASTED POTENTIAL 🎯\n\nYour parents are crying somewhere!",
      "💔 BROKEN PROMISES 💔\n\nYou promised yourself you'd study today!",
      "🔥 PRODUCTIVITY GONE 🔥\n\nWhere did your motivation go?",
      "😑 SELF CONTROL 😑\n\nYou have ZERO willpower. Proven fact!",
      "🌙 CRAM TIME 🌙\n\nWelcome to your 2 AM panic session!",
      "📋 SYLLABUS UNREAD 📋\n\nYou haven't even LOOKED at the course requirements!",
      "🎬 SCENE OF DESPAIR 🎬\n\nThis is what rock bottom looks like!",
      "⛔ DEADLINE BREACH ⛔\n\nYou're about to fail spectacularly!",
    ];
    
    const randomMessage = annoyingMessages[Math.floor(Math.random() * annoyingMessages.length)];
    setRoastMessage(randomMessage);
    setShowRoastAlert(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowRoastAlert(false);
    }, 3000);
  };

  const handleCaptchaClose = () => {
    setShowCaptcha(false);
  };

  const handleVerificationClose = () => {
    setShowVerification(false);
  };

  const handleScanComplete = () => {
    setShowScan(false);
  };

  return (
    <div className="relative inline-block p-10">
      {showRoastAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-red-600 text-white p-8 rounded-lg border-4 border-yellow-400 shadow-2xl max-w-md w-full text-center animate-pulse pointer-events-auto">
            <p className="text-lg font-bold whitespace-pre-wrap">{roastMessage}</p>
          </div>
        </div>
      )}
      {showCaptcha && (
        <CaptchaModal
          onSuccess={handleCaptchaClose}
          onClose={handleCaptchaClose}
        />
      )}
      {showVerification && (
        <VerificationModal
          isVisible={showVerification}
          onClose={handleVerificationClose}
        />
      )}
      {showScan && (
        <FakeScanModal
          isVisible={showScan}
          onComplete={handleScanComplete}
        />
      )}
      <InteractivePhysics isVisible={showPhysics} />
      <HotSinglesPopup isVisible={showHotSingles} />
      {showVideo && (
        <VideoModal
          onClose={() => {
            setShowVideo(false);
            // Reset for "Do It Again"
            setPosition({ x: 0, y: 0 });
            setLabel("Prosseed");
            setClickAttempts(0);
            setLoadingPercent(0);
            setVerificationUsed(false);
            setScanUsed(false);
          }}
        />
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
      
      {/* Loading Bar */}
      {isLoading && (
        <div className="absolute bottom-0 left-0 h-4 bg-eye-green transition-all duration-100 border border-black" style={{ width: `${loadingPercent}%` }}></div>
      )}
      
      {/* Click Counter */}
      <div className="absolute -bottom-8 left-0 text-xs text-red-600 animate-bounce-fast w-full text-center">
        Click {clickAttempts}/{CLICKS_REQUIRED} • Clicks until loading
      </div>
    </div>
  );
};