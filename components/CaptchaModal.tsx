import React, { useState, useEffect } from 'react';

interface CaptchaModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const CaptchaModal: React.FC<CaptchaModalProps> = ({ onSuccess, onClose }) => {
  const [num1] = useState(Math.floor(Math.random() * 20) + 1);
  const [num2] = useState(Math.floor(Math.random() * 20) + 1);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const correctAnswer = num1 + num2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(userAnswer) === correctAnswer) {
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
      
      const wrongAnswerMessages = [
        "Nice try, but that's not it!",
        "Nope! Try again (if you can count)",
        "Error: Math.random() has spoken. Wrong answer.",
        "That's not even close. Are you a robot?",
        "Incorrect! Maybe try clicking 'help' next time",
      ];
      
      alert(wrongAnswerMessages[Math.floor(Math.random() * wrongAnswerMessages.length)]);
      setUserAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg border-4 border-black shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">📚 Student Verification</h2>
        <p className="text-center text-gray-600 mb-6">
          Solve this math problem (it's harder than your finals!):
        </p>
        
        <div className="bg-gray-100 p-4 rounded border-2 border-gray-300 mb-4 text-center">
          <p className="text-3xl font-bold">
            {num1} + {num2} = ?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            autoFocus
          />
          
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Verify
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>

        {attempts > 0 && (
          <p className="text-center text-red-500 mt-2 text-sm">
            Failed attempts: {attempts}
          </p>
        )}

        <p className="text-center text-gray-400 text-xs mt-4">
          (Hint: The answer is definitely not {correctAnswer})
        </p>
      </div>
    </div>
  );
};
