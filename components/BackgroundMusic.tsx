import React, { useEffect } from 'react';

export const BackgroundMusic: React.FC = () => {
  useEffect(() => {
    const audio = new Audio();
    // File is in public/music folder, which gets served at the root
    audio.src = '/Frustrating-website-antoon/music/Local20-Elevator.mp3';
    audio.loop = true;
    audio.volume = 0.3;
    
    // Try to play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log('Autoplay blocked');
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
};
