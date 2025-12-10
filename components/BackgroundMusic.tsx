import React, { useEffect, useRef } from 'react';

export const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audio.src = '/Frustrating-website-antoon/music/Local20-Elevator.mp3';
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Try to play on load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Audio started playing');
        })
        .catch((err) => {
          console.log('Autoplay blocked or error:', err);
          // Try again on first user interaction
          const playOnInteraction = () => {
            audio.play().catch(() => {
              console.log('Could not play audio');
            });
            document.removeEventListener('click', playOnInteraction);
          };
          document.addEventListener('click', playOnInteraction);
        });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
};
