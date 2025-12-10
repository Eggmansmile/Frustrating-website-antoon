import React, { useState, useEffect } from 'react';
import { ProsseedButton } from './components/ProsseedButton';
import { UnhelpfulChat } from './components/UnhelpfulChat';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  const [resetKey, setResetKey] = useState(0);
  const [bgColor, setBgColor] = useState('bg-pain-yellow');
  const [rotation, setRotation] = useState(0);
  const [marqueeText, setMarqueeText] = useState("Welcome to the website! Please Prosseed immediately! Do not pass GO. Do not collect $200.");

  // The logic to "Go back to the website" (reset state)
  const handleReset = () => {
    setResetKey(prev => prev + 1);
    // Change background slightly to disorient
    const colors = ['bg-pain-yellow', 'bg-eye-green', 'bg-hurt-pink', 'bg-orange-400', 'bg-blue-300'];
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    setMarqueeText("Welcome BACK! You have successfully Prosseeded to the beginning!");
    window.scrollTo(0,0);
  };

  useEffect(() => {
    // Slowly rotate the entire screen back and forth to cause seasickness
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      setRotation(Math.sin(time) * 1); // 1 degree tilt
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
        key={resetKey}
        className={`min-h-screen ${bgColor} transition-colors duration-1000 overflow-hidden flex flex-col`}
        style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Horrible Marquee */}
      <div className="bg-black text-white p-2 whitespace-nowrap overflow-hidden border-b-4 border-red-600">
         <div className="animate-[marquee_10s_linear_infinite] inline-block text-xl font-mono text-eye-green">
           {marqueeText} {marqueeText} {marqueeText}
         </div>
      </div>

      <header className="p-8 text-center bg-white/50 border-4 border-dashed border-red-500 m-4 shadow-2xl transform -skew-x-12">
        <h1 className="text-6xl md:text-8xl font-fancy text-blue-800 drop-shadow-[5px_5px_0px_rgba(255,0,255,1)]">
          The Expereince
        </h1>
        <p className="text-xl mt-4 font-bold text-red-600 bg-yellow-200 inline-block px-2 rotate-2">
            Design is my pashun
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center relative p-4">
        
        {/* Fake decorative elements that block interaction */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply opacity-50 animate-bounce pointer-events-none"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-eye-green rounded-lg rotate-45 border-8 border-black animate-spin-slow pointer-events-none z-0"></div>

        <div className="z-10 bg-white p-12 rounded-3xl border-8 border-double border-blue-500 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] text-center max-w-2xl w-full">
            <h2 className="text-4xl mb-6 font-comic font-bold text-gray-800">
                Are you ready to start?
            </h2>
            
            <p className="mb-8 text-lg text-gray-600 leading-relaxed">
                To access the premium content, please confirm your intent by clicking the button below. 
                <br/>
                <span className="text-xs text-gray-400">(Note: Clicking may cause time loops)</span>
            </p>

            <ProsseedButton onProsseedAttempt={handleReset} />

            <div className="mt-8 text-sm text-gray-400 flex justify-center gap-4 underline">
                <a href="#" onClick={(e) => { e.preventDefault(); alert("404: Terms not found"); }} className="hover:text-red-500 cursor-help">Terms of Disservice</a>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Privacy is a myth."); }} className="hover:text-red-500 cursor-not-allowed">Privacy Policy</a>
            </div>
        </div>

      </main>

      <footer className="bg-gray-900 text-white p-4 text-center border-t-8 border-hurt-pink">
        <p>&copy; 1999-{new Date().getFullYear()} Bad Design Corp. All Rights Reserved.</p>
        <p className="text-[10px] text-gray-500">Optimized for Internet Explorer 5.0</p>
      </footer>

      {/* Frustration Components */}
      <CookieBanner />
      <UnhelpfulChat />

      {/* Global CSS for Marquee since Tailwind doesn't have it built-in cleanly */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
            animation: marquee 15s linear infinite;
        }
        /* Disable text selection to be annoying */
        body {
            user-select: none;
        }
      `}</style>
    </div>
  );
}