import React, { useState, useEffect } from 'react';

interface CatPosition {
  id: number;
  x: number;
  y: number;
  direction: number;
}

export const VideoModal: React.FC = () => {
  const [cats, setCats] = useState<CatPosition[]>([
    { id: 0, x: 0, y: 0, direction: 1 },
    { id: 1, x: 100, y: 100, direction: -1 },
    { id: 2, x: 200, y: 200, direction: 1 },
    { id: 3, x: 300, y: 50, direction: -1 },
    { id: 4, x: 50, y: 300, direction: 1 },
  ]);

  // Make cats walk around randomly
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCats(prevCats =>
        prevCats.map(cat => {
          let newX = cat.x + (Math.random() - 0.5) * 100;
          let newY = cat.y + (Math.random() - 0.5) * 100;

          // Keep cat within bounds
          newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
          newY = Math.max(0, Math.min(newY, window.innerHeight - 80));

          // Random direction change
          let newDirection = cat.direction;
          if (Math.random() > 0.5) {
            newDirection = -cat.direction;
          }

          return { ...cat, x: newX, y: newY, direction: newDirection };
        })
      );
    }, 500);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-hidden">
      {/* Walking Cats */}
      {cats.map(cat => (
        <div
          key={cat.id}
          className="fixed text-6xl transition-all duration-500"
          style={{
            left: `${cat.x}px`,
            top: `${cat.y}px`,
            transform: cat.direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        >
          🐱
        </div>
      ))}

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
