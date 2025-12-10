import React, { useState, useEffect } from 'react';

interface FakeScanModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const FakeScanModal: React.FC<FakeScanModalProps> = ({ isVisible, onComplete }) => {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setScanProgress(0);
      return;
    }

    setScanProgress(0);
    let progress = 0;
    
    // Scan takes ~7 seconds with chaotic progress
    const interval = setInterval(() => {
      const randomBehavior = Math.random();
      
      if (randomBehavior < 0.1) {
        // 10% chance to jump backward
        progress = Math.max(0, progress - Math.random() * 5);
      } else if (randomBehavior < 0.2) {
        // 10% chance to jump forward
        progress += Math.random() * 8;
      } else {
        // 80% normal progress
        progress += Math.random() * 3;
      }
      
      // Cap at 98 until we're ready to complete
      if (progress > 98) {
        progress = 98;
      }
      
      setScanProgress(Math.floor(progress));
      
      // Complete after 7 seconds
      if (progress >= 98) {
        clearInterval(interval);
        setScanProgress(100);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const scanMessages = [
    "🔍 Initializing scan...",
    "🔍 Scanning system files...",
    "⚠️  Checking security...",
    "🔍 Analyzing data...",
    "⚠️  Running diagnostics...",
  ];

  const currentMessage = scanMessages[Math.floor((scanProgress / 100) * (scanMessages.length - 1))];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 pointer-events-none">
      <div className="bg-gray-900 border-4 border-eye-green p-8 rounded font-mono text-eye-green w-full max-w-sm text-center shadow-2xl">
        <div className="text-lg font-bold animate-pulse mb-6">
          ⚙️ SYSTEM DIAGNOSTIC SCAN ⚙️
        </div>
        
        <div className="mb-4">
          <div className="text-sm mb-2">{currentMessage}</div>
          <div className="w-full bg-gray-800 border-2 border-eye-green h-8 rounded overflow-hidden">
            <div 
              className="h-full bg-eye-green transition-all duration-200"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-xs text-red-400 animate-pulse">
          {scanProgress < 100 ? `Scanning... ${scanProgress}%` : 'Scan complete!'}
        </div>
      </div>
    </div>
  );
};
