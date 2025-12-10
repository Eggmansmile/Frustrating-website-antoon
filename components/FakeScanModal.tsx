import React, { useState, useEffect, useRef } from 'react';

interface FakeScanModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const FakeScanModal: React.FC<FakeScanModalProps> = ({ isVisible, onComplete }) => {
  const SCAN_ITEMS = [
    "🔍 Scanning system files...",
    "🔍 Initializing deep scan... 0%",
    "⚠️  WARNING: Unauthorized access detected!",
    "🔍 Scanning browser history... 47 embarrassing searches found",
    "⚠️  CRITICAL: Malware detected in sector 7",
    "🔍 Checking for spyware... 12 potential threats identified",
    "🔍 Optimizing performance... freeing up 0 MB",
    "⚠️  ERROR: Cannot allocate memory (you don't have any)",
    "🔍 Analyzing click patterns... SUSPICIOUS ACTIVITY DETECTED",
    "🔍 Running system diagnostics... keyboard is worn",
    "⚠️  WARNING: Your password is 'password'",
    "🔍 Checking CPU temperature... OVERHEATING DETECTED (47°C is normal but we'll say it's bad)",
    "🔍 Scanning for trojans... installing trojans...",
    "⚠️  ALERT: Verifying user authenticity... FAILED (you are not who you think you are)",
    "🔍 Checking disk space... you have negative space",
    "⚠️  WARNING: Your trash bin is sentient",
    "🔍 Analyzing user behavior... you seem frustrated",
    "🔍 Scanning for viruses... found 1 (your frustration)",
    "⚠️  CRITICAL: Your RAM is tired",
    "🔍 Checking internet connection... yes, it exists",
    "🔍 Validating system files... 1,847 corrupted (just kidding)",
    "⚠️  Checking antivirus status... COMPROMISED",
    "🔍 Scanning boot sectors... found ancient boot",
    "⚠️  Your files are sleeping",
    "🔍 Deep scanning... 25% complete",
    "🔍 Deep scanning... 50% complete",
    "🔍 Analyzing metadata... found your secrets",
    "⚠️  Your browser cookies are stale",
    "🔍 Scanning for backdoors... found one in your heart",
    "⚠️  WARNING: Someone is watching you. It's me.",
    "🔍 Running final checks... almost there",
    "✅ Scan 99% complete...",
    "⚠️  One more thing... your computer doesn't like you",
    "✅ Scan complete! All systems: FINE (definitely not broken)",
  ];

  const [displayedItems, setDisplayedItems] = useState<string[]>([]);
  const itemIndexRef = useRef(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedItems([]);
      itemIndexRef.current = 0;
      return;
    }

    // Reset index when becoming visible
    itemIndexRef.current = 0;
    setDisplayedItems([]);

    // Add each item one by one with a timeout
    const addNextItem = (index: number) => {
      if (index < SCAN_ITEMS.length) {
        setDisplayedItems((prev) => [...prev, SCAN_ITEMS[index]]);
        setTimeout(() => {
          addNextItem(index + 1);
        }, 200);
      } else {
        // All items added, call onComplete after brief delay
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    addNextItem(0);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 pointer-events-auto">
      <div className="bg-gray-900 border-4 border-eye-green p-6 rounded font-mono text-eye-green w-full max-w-2xl h-96 shadow-2xl flex flex-col">
        <div className="text-center font-bold mb-4 text-lg animate-pulse flex-shrink-0 whitespace-nowrap">
          ⚙️ SYSTEM DIAGNOSTIC SCAN ⚙️
        </div>
        <div className="space-y-0 text-sm flex-1 overflow-y-auto min-h-0 pr-2">
          {displayedItems.map((item, index) => (
            <div key={index} className="animate-pulse break-words leading-tight py-0.5">
              {item}
            </div>
          ))}
          {displayedItems.length > 0 && displayedItems.length < SCAN_ITEMS.length && (
            <div className="text-sm animate-bounce">
              &gt; _
            </div>
          )}
        </div>
        <div className="mt-4 text-xs text-red-500 animate-pulse text-center flex-shrink-0 whitespace-nowrap">
          {displayedItems.length < SCAN_ITEMS.length 
            ? `Scanning... ${Math.floor((displayedItems.length / SCAN_ITEMS.length) * 100)}%`
            : 'Scan complete!'}
        </div>
      </div>
    </div>
  );
};
