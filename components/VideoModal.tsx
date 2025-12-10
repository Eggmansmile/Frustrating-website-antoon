import React, { useState, useEffect } from 'react';

export const VideoModal: React.FC = () => {
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [catDirection, setCatDirection] = useState(1); // 1 for right, -1 for left

  // Make cat walk around randomly
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCatPosition(prev => {
        let newX = prev.x + (Math.random() - 0.5) * 100;
        let newY = prev.y + (Math.random() - 0.5) * 100;

        // Keep cat within bounds
        newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 80));

        // Random direction change
        if (Math.random() > 0.5) {
          setCatDirection(prev => -prev);
        }

        return { x: newX, y: newY };
      });
    }, 500);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-hidden">
      {/* Walking Cat */}
      <div
        className="fixed text-6xl transition-all duration-500"
        style={{
          left: `${catPosition.x}px`,
          top: `${catPosition.y}px`,
          transform: catDirection === -1 ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      >
        🐱
      </div>

      {/* Video Container */}
      <div className="bg-white p-8 rounded-lg border-4 border-black shadow-2xl max-w-2xl w-full z-10">
        <h2 className="text-3xl font-bold mb-4 text-center font-comic">
          Thanks for sticking around. Here you go
        </h2>

        <div className="w-full bg-black rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/y0sF5xhGreA"
            title="Surprise Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
          ></iframe>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Watch the cat walk around while you enjoy the video!
        </p>
      </div>
    </div>
  );
};
