import React, { useState, useEffect } from 'react';

interface FakeScanModalProps {
  isVisible: boolean;
}

export const FakeScanModal: React.FC<FakeScanModalProps> = ({ isVisible }) => {
  const [scanItems] = useState([
    "Scanning browser history... 47 embarrassing searches found",
    "Checking for malware... 12 potential threats detected",
    "Optimizing performance... freeing up 0 MB",
    "Analyzing click patterns... SUSPICIOUS ACTIVITY DETECTED",
    "Running system diagnostics... keyboard is worn",
    "Checking CPU temperature... OVERHEATING DETECTED",
    "Scanning for trojans... installing trojans...",
    "Verifying user authenticity... FAILED",
    "Checking disk space... you have negative space",
    "Analyzing user behavior... you seem frustrated",
  ]);

  const [displayedItems, setDisplayedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    let itemIndex = 0;
    const interval = setInterval(() => {
      if (itemIndex < scanItems.length) {
        setDisplayedItems((prev) => [...prev, scanItems[itemIndex]]);
        itemIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isVisible, scanItems]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
      <div className="bg-gray-900 border-4 border-green-500 p-6 rounded font-mono text-green-400 w-96 h-96 overflow-y-auto">
        <div className="text-center font-bold mb-4 text-lg animate-pulse">
          ⚠️ SYSTEM SCAN IN PROGRESS ⚠️
        </div>
        <div className="space-y-2">
          {displayedItems.map((item, index) => (
            <div key={index} className="text-sm animate-pulse">
              &gt; {item}
            </div>
          ))}
          {displayedItems.length > 0 && displayedItems.length < scanItems.length && (
            <div className="text-sm animate-bounce">
              &gt; _
            </div>
          )}
        </div>
        <div className="mt-4 text-xs text-red-500 animate-pulse">
          DO NOT CLOSE THIS WINDOW
        </div>
      </div>
    </div>
  );
};
