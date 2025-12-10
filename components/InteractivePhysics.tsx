import React, { useRef, useEffect, useState } from 'react';

interface InteractivePhysicsProps {
  isVisible: boolean;
}

export const InteractivePhysics: React.FC<InteractivePhysicsProps> = ({ isVisible }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 200, y: 100 });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 200, y: 100 });

  const GRAVITY = 0.3;
  const FRICTION = 0.99;
  const BOUNCE = 0.7;
  const SIZE = 40;

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Check if clicking on ball
      const dx = mouseX - positionRef.current.x;
      const dy = mouseY - positionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < SIZE) {
        isDraggingRef.current = true;
        dragOffsetRef.current = {
          x: mouseX - positionRef.current.x,
          y: mouseY - positionRef.current.y
        };
        lastPositionRef.current = { ...positionRef.current };
        velocityRef.current = { x: 0, y: 0 };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (isDraggingRef.current) {
        lastPositionRef.current = { ...positionRef.current };
        positionRef.current.x = mouseX - dragOffsetRef.current.x;
        positionRef.current.y = mouseY - dragOffsetRef.current.y;
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        // Calculate velocity based on movement
        velocityRef.current.x = (positionRef.current.x - lastPositionRef.current.x) * 0.5;
        velocityRef.current.y = (positionRef.current.y - lastPositionRef.current.y) * 0.5 + 2;
      }
    };

    const animate = () => {
      if (!isDraggingRef.current) {
        // Apply gravity only when not dragging
        velocityRef.current.y += GRAVITY;

        // Apply friction
        velocityRef.current.x *= FRICTION;
        velocityRef.current.y *= FRICTION;

        // Update position
        positionRef.current.x += velocityRef.current.x;
        positionRef.current.y += velocityRef.current.y;
      }

      // Bounce off walls
      if (positionRef.current.x - SIZE < 0) {
        positionRef.current.x = SIZE;
        velocityRef.current.x *= -BOUNCE;
      } else if (positionRef.current.x + SIZE > canvas.width) {
        positionRef.current.x = canvas.width - SIZE;
        velocityRef.current.x *= -BOUNCE;
      }

      // Bounce off floor/ceiling
      if (positionRef.current.y - SIZE < 0) {
        positionRef.current.y = SIZE;
        velocityRef.current.y *= -BOUNCE;
      } else if (positionRef.current.y + SIZE > canvas.height) {
        positionRef.current.y = canvas.height - SIZE;
        velocityRef.current.y *= -BOUNCE;
      }

      // Clear canvas
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#1e2749';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw ball with glow
      const gradient = ctx.createRadialGradient(
        positionRef.current.x,
        positionRef.current.y,
        0,
        positionRef.current.x,
        positionRef.current.y,
        SIZE
      );
      gradient.addColorStop(0, '#ff6b6b');
      gradient.addColorStop(0.7, '#ee5a52');
      gradient.addColorStop(1, '#c92a2a');

      // Draw stronger glow for rubber ball
      ctx.fillStyle = 'rgba(255, 107, 107, 0.4)';
      ctx.beginPath();
      ctx.arc(positionRef.current.x, positionRef.current.y, SIZE + 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw ball with rubber appearance
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(positionRef.current.x, positionRef.current.y, SIZE, 0, Math.PI * 2);
      ctx.fill();

      // Add rubber ball shine/highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(positionRef.current.x - 12, positionRef.current.y - 12, 10, 0, Math.PI * 2);
      ctx.fill();

      // Add secondary highlight for rubber texture
      ctx.fillStyle = 'rgba(255, 200, 200, 0.3)';
      ctx.beginPath();
      ctx.arc(positionRef.current.x + 8, positionRef.current.y + 8, 6, 0, Math.PI * 2);
      ctx.fill();

      // Add subtle seams for rubber ball look
      ctx.strokeStyle = 'rgba(200, 50, 50, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(positionRef.current.x, positionRef.current.y, SIZE - 5, 0, Math.PI * 2);
      ctx.stroke();

      setPosition({ ...positionRef.current });
      setVelocity({ ...velocityRef.current });

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-auto">
      <div className="bg-gray-900 border-2 border-eye-green rounded p-2">
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="border border-eye-green rounded cursor-move bg-gray-950"
        />
        <div className="text-xs text-eye-green mt-2 text-center font-mono">
          Pick up and throw the ball! 🎾
        </div>
      </div>
    </div>
  );
};
