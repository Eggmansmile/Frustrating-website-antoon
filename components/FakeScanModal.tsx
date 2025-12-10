import React, { useState, useEffect, useRef } from 'react';

interface FakeScanModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const FakeScanModal: React.FC<FakeScanModalProps> = ({ isVisible, onComplete }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
  const progressRef = useRef(0);
  const stepCountRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scanMessages = [
    "🔍 Scanning your procrastination levels...",
    "⚠️  Analyzing your study habits...",
    "🔍 Checking how many assignments you've ignored...",
    "⚠️  WARNING: Deadline in 24 hours!",
    "🔍 Running diagnostics on your GPA...",
  ];

  const diagnoses = [
    "🚨 CRITICAL: Student attempting to avoid studying. Resistance futile.",
    "📚 ALERT: Academic integrity check FAILED. Homework still overdue!",
    "🔴 ERROR: Found 47 unread class emails. System overwhelmed.",
    "💥 FATAL: Procrastination levels have exceeded maximum. No recovery possible.",
    "🎓 DIAGNOSIS: User is a professional procrastinator. No cure found.",
    "⏰ NOTE: Time management skills = 0%. All hope is lost.",
    "📖 SCAN COMPLETE: Your textbooks are gathering dust. Very efficient.",
  ];

  useEffect(() => {
    if (!isVisible) {
      setScanProgress(0);
      setShowDiagnosis(false);
      progressRef.current = 0;
      stepCountRef.current = 0;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setScanProgress(0);
    setShowDiagnosis(false);
    progressRef.current = 0;
    stepCountRef.current = 0;
    
    // Scan takes ~7 seconds (35 steps of 200ms each)
    intervalRef.current = setInterval(() => {
      stepCountRef.current += 1;
      const randomBehavior = Math.random();
      
      if (randomBehavior < 0.1) {
        // 10% chance to jump backward
        progressRef.current = Math.max(0, progressRef.current - Math.random() * 5);
      } else if (randomBehavior < 0.2) {
        // 10% chance to jump forward
        progressRef.current += Math.random() * 8;
      } else {
        // 80% normal progress
        progressRef.current += Math.random() * 3;
      }
      
      // Allow progress to go beyond 98
      progressRef.current = Math.min(progressRef.current, 99);
      const newProgress = Math.floor(progressRef.current);
      setScanProgress(newProgress);
      
      // Force completion after 35 steps (~7 seconds)
      if (stepCountRef.current >= 35 || progressRef.current >= 99) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setScanProgress(100);
        // Pick random diagnosis and store it
        const randomIndex = Math.floor(Math.random() * diagnoses.length);
        setSelectedDiagnosis(diagnoses[randomIndex]);
        setShowDiagnosis(true);
        
        // Show diagnosis for 2 seconds then complete
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }, 200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible]);

  const currentMessage = scanMessages[Math.floor((scanProgress / 100) * (scanMessages.length - 1))];

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  // Show diagnosis screen if scan is complete
  if (showDiagnosis) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 pointer-events-none">
        <div className="bg-gray-900 border-4 border-eye-green p-8 rounded font-mono text-eye-green w-full max-w-sm text-center shadow-2xl animate-pulse">
          <div className="text-lg font-bold mb-6">
            📋 FINAL DIAGNOSIS 📋
          </div>
          <div className="text-sm text-red-400 mb-4">
            {selectedDiagnosis}
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
