import React, { useState, useEffect } from 'react';

interface VerificationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isVisible, onClose }) => {
  const [checks, setChecks] = useState<Array<{ text: string; status: 'pending' | 'pass' | 'fail' }>>([
    { text: 'Verifying IP address legitimacy', status: 'pending' },
    { text: 'Checking browser fingerprint', status: 'pending' },
    { text: 'Validating device certificate', status: 'pending' },
    { text: 'Confirming you are not a robot', status: 'pending' },
    { text: 'Analyzing mouse movement pattern', status: 'pending' },
  ]);

  useEffect(() => {
    if (!isVisible) return;

    let checkIndex = 0;
    const interval = setInterval(() => {
      if (checkIndex < checks.length) {
        setChecks((prev) => {
          const newChecks = [...prev];
          // 60% pass, 40% fail for chaos
          newChecks[checkIndex].status = Math.random() > 0.4 ? 'pass' : 'fail';
          return newChecks;
        });
        checkIndex++;
      } else {
        // Auto close after all checks
        setTimeout(onClose, 1000);
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
      <div className="bg-white border-4 border-pain-yellow p-6 rounded w-96">
        <div className="text-center font-bold mb-4 text-lg text-pain-yellow">
          🔐 IDENTITY VERIFICATION 🔐
        </div>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>
                {check.status === 'pass' && '✅'}
                {check.status === 'fail' && '❌'}
                {check.status === 'pending' && '⏳'}
              </span>
              <span className="text-sm flex-1">{check.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-center text-gray-600">
          {checks.every((c) => c.status !== 'pending')
            ? 'Verification complete'
            : 'Please wait...'}
        </div>
      </div>
    </div>
  );
};
