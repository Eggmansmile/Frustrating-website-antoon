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
    { text: 'Scanning for suspicious behavior', status: 'pending' },
    { text: 'Verifying DNS records', status: 'pending' },
    { text: 'Checking geolocation legitimacy', status: 'pending' },
    { text: 'Validating system integrity', status: 'pending' },
    { text: 'Authenticating user credentials', status: 'pending' },
  ]);

  useEffect(() => {
    if (!isVisible) return;

    // Start the verification process
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        setChecks((prev) => {
          const newChecks = [...prev];
          newChecks[i].status = Math.random() > 0.45 ? 'pass' : 'fail';
          return newChecks;
        });

        // If this is the last check, close after a short delay
        if (i === 9) {
          setTimeout(() => {
            onClose();
          }, 200);
        }
      }, (i + 1) * 400);
    }
  }, [isVisible, onClose]);

  const passCount = checks.filter((c) => c.status === 'pass').length;
  const allDone = checks.every((c) => c.status !== 'pending');

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
      <div className="bg-white border-4 border-pain-yellow p-6 rounded w-full max-w-md max-h-screen overflow-y-auto">
        <div className="text-center font-bold mb-4 text-lg text-pain-yellow animate-pulse">
          🔐 IDENTITY VERIFICATION 🔐
        </div>
        <div className="space-y-2">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center gap-2 text-sm p-2 rounded bg-gray-50">
              <span className="flex-shrink-0 w-6">
                {check.status === 'pass' && '✅'}
                {check.status === 'fail' && '❌'}
                {check.status === 'pending' && '⏳'}
              </span>
              <span className="flex-1">{check.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-center text-gray-600 p-2 bg-gray-100 rounded">
          {allDone ? (
            <div className="font-bold text-pain-yellow">
              Verification: {passCount}/{checks.length} checks passed
              <div className="text-xs mt-1">Proceeding to loading...</div>
            </div>
          ) : (
            <div>Verifying... {checks.filter((c) => c.status !== 'pending').length}/{checks.length} complete</div>
          )}
        </div>
      </div>
    </div>
  );
};
