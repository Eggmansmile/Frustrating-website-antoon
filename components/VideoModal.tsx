import React, { useState, useEffect } from 'react';

interface CatPosition {
  id: number;
  x: number;
  y: number;
  direction: number;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export const VideoModal: React.FC = () => {
  const [cats, setCats] = useState<CatPosition[]>([
    { id: 0, x: 0, y: 0, direction: 1 },
    { id: 1, x: 100, y: 100, direction: -1 },
    { id: 2, x: 200, y: 200, direction: 1 },
    { id: 3, x: 300, y: 50, direction: -1 },
    { id: 4, x: 50, y: 300, direction: 1 },
  ]);

  const [confetti, setConfetti] = useState<Confetti[]>([]);

  // Generate confetti on mount
  useEffect(() => {
    const newConfetti: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 2 + 2,
    }));
    setConfetti(newConfetti);
  }, []);

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

  const emojis = ['🎉', '🎊', '🌟', '✨', '🎈', '🎁', '🏆', '👑', '💎', '🚀'];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pain-yellow via-hurt-pink to-eye-green flex items-center justify-center z-50 overflow-hidden">
      {/* Confetti falling */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="fixed animate-pulse"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            fontSize: `${item.size}px`,
            animation: `fall ${item.duration}s linear`,
            opacity: Math.random() > 0.5 ? 1 : 0.7,
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </div>
      ))}

      {/* Walking Cats */}
      {cats.map(cat => (
        <div
          key={cat.id}
          className="fixed text-8xl transition-all duration-500 drop-shadow-lg"
          style={{
            left: `${cat.x}px`,
            top: `${cat.y}px`,
            transform: cat.direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.8))',
          }}
        >
          🐱
        </div>
      ))}

      {/* Rotating emoji circles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-5xl animate-spin">🎪</div>
        <div className="absolute top-10 right-10 text-5xl animate-spin" style={{ animationDirection: 'reverse' }}>🎭</div>
        <div className="absolute bottom-10 left-10 text-5xl animate-bounce">🎸</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎺</div>
      </div>

      {/* Video Container */}
      <div className="bg-white p-8 rounded-xl border-8 border-black shadow-2xl max-w-3xl w-full z-10 animate-pulse">
        <h2 className="text-4xl font-bold mb-2 text-center font-fancy text-transparent bg-clip-text bg-gradient-to-r from-pain-yellow to-hurt-pink">
          🎉 CONGRATULATIONS! 🎉
        </h2>
        <p className="text-center text-2xl font-bold mb-4 text-hurt-pink">
          You've successfully navigated the frustration!
        </p>

        <div className="w-full bg-black rounded-lg overflow-hidden mb-4 border-4 border-eye-green">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/y0sF5xhGreA"
            title="Victory Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
          ></iframe>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="bg-pain-yellow p-3 rounded font-bold">
            <div className="text-3xl">🏆</div>
            <div className="text-sm">Achievement</div>
            <div className="text-xs">Unlocked!</div>
          </div>
          <div className="bg-hurt-pink p-3 rounded font-bold text-white">
            <div className="text-3xl">💯</div>
            <div className="text-sm">Perfect</div>
            <div className="text-xs">Score!</div>
          </div>
          <div className="bg-eye-green p-3 rounded font-bold">
            <div className="text-3xl">⭐</div>
            <div className="text-sm">5-Star</div>
            <div className="text-xs">Rating!</div>
          </div>
        </div>

        <p className="text-center text-gray-600 font-bold mb-2">
          Watch the cats dance to the victory music! 🐱🐱🐱
        </p>

        <div className="text-center text-sm text-gray-700 bg-pain-yellow/20 p-3 rounded border-2 border-pain-yellow">
          <p className="font-bold">🌟 You've earned these rewards: 🌟</p>
          <p>✓ The respect of a computer that doesn't respect you</p>
          <p>✓ A video of a cat doing absolutely nothing</p>
          <p>✓ The satisfaction of finally making it through</p>
          <p>✓ Temporary bragging rights (expires in 5 minutes)</p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full mt-4 bg-eye-green text-black font-bold py-3 px-4 rounded-lg hover:bg-green-400 transition-all text-lg border-4 border-black active:scale-95"
        >
          👎 Do It All Again (Why Would You?)
        </button>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
