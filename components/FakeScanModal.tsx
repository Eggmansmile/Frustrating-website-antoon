import React, { useState, useEffect, useMemo } from 'react';

interface FakeScanModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const FakeScanModal: React.FC<FakeScanModalProps> = ({ isVisible, onComplete }) => {
  const scanItems = useMemo(() => [
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
  ], []);

  const [displayedItems, setDisplayedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedItems([]);
      return;
    }

    let itemIndex = 0;
    const interval = setInterval(() => {
      if (itemIndex < scanItems.length) {
        setDisplayedItems((prev) => [...prev, scanItems[itemIndex]]);
        itemIndex++;
      } else {
        clearInterval(interval);
        // Complete after scan is done
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 200); // Each item appears every 200ms for consistent pacing

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 pointer-events-none">
      <div className="bg-gray-900 border-4 border-eye-green p-6 rounded font-mono text-eye-green w-96 h-96 overflow-y-auto shadow-2xl">
        <div className="text-center font-bold mb-4 text-lg animate-pulse">
          ⚙️ SYSTEM DIAGNOSTIC SCAN ⚙️
        </div>
        <div className="space-y-1 text-sm">
          {displayedItems.map((item, index) => (
            <div key={index} className="animate-pulse">
              {item}
            </div>
          ))}
          {displayedItems.length > 0 && displayedItems.length < scanItems.length && (
            <div className="text-sm animate-bounce">
              &gt; _
            </div>
          )}
        </div>
        <div className="mt-4 text-xs text-red-500 animate-pulse text-center">
          {displayedItems.length < scanItems.length 
            ? `Scanning... ${Math.floor((displayedItems.length / scanItems.length) * 100)}%`
            : 'Scan complete!'}
        </div>
      </div>
    </div>
  );
};
