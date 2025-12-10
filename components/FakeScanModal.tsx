import React, { useState, useEffect } from 'react';

interface FakeScanModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const FakeScanModal: React.FC<FakeScanModalProps> = ({ isVisible, onComplete }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const scanMessages = [
    "🔍 Checking your life choices...",
    "⚠️  Analyzing your frustration levels...",
    "🔍 Scanning for patience...",
    "⚠️  WARNING: No patience detected!",
    "🔍 Running diagnostics on your sanity...",
  ];

  const diagnoses = [
    "🚨 CRITICAL: User is too determined. Recommend immediate distraction.",
    "⚠️  ALERT: Patience levels dangerously low. Continuing anyway.",
    "🔴 ERROR: User has clicked through 3+ CAPTCHAs. System confused.",
    "💥 FATAL: Button evasion has been defeated. Abandoning protocols.",
    "😈 DIAGNOSIS: User refuses to give up. We like this one.",
    "🎯 ALERT: User clicking with intent. This is unusual.",
    "🤖 NOTE: AI has determined you are either very bored or very spiteful.",
  ];

  useEffect(() => {
    if (!isVisible) {
      setScanProgress(0);
      return;
    }

    setScanProgress(0);
    let progress = 0;
    let stepCount = 0;
    
    // Scan takes ~7 seconds (35 steps of 200ms each)
    const interval = setInterval(() => {
      stepCount++;
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
      
      // Allow progress to go beyond 98
      progress = Math.min(progress, 99);
      setScanProgress(Math.floor(progress));
      
      // Force completion after 35 steps (~7 seconds)
      if (stepCount >= 35 || progress >= 99) {
        clearInterval(interval);
        setScanProgress(100);
        setShowDiagnosis(true);
        
        // Show diagnosis for 2 seconds then complete
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  const currentMessage = scanMessages[Math.floor((scanProgress / 100) * (scanMessages.length - 1))];
  const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];

  // Show diagnosis screen if scan is complete
  if (showDiagnosis) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 pointer-events-none">
        <div className="bg-gray-900 border-4 border-eye-green p-8 rounded font-mono text-eye-green w-full max-w-sm text-center shadow-2xl animate-pulse">
          <div className="text-lg font-bold mb-6">
            📋 FINAL DIAGNOSIS 📋
          </div>
          <div className="text-sm text-red-400 mb-4">
            {randomDiagnosis}
          </div>
          <div className="text-xs text-eye-green opacity-75">
            Proceeding with extreme caution...
          </div>
        </div>
      </div>
    );
  }

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
