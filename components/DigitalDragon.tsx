'use client';

import { useEffect, useRef } from 'react';

export default function DigitalDragon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Dragon State
    const mouse = { x: width / 2, y: height / 2 };
    const segments: { x: number; y: number }[] = [];
    const numSegments = 12; // Much shorter (.5cm feel)

    for (let i = 0; i < numSegments; i++) {
      segments.push({ x: width / 2, y: height / 2 });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let time = 0;

    const animate = () => {
      time += 0.1;
      ctx.clearRect(0, 0, width, height);

      // Update Head (First Segment) - Snappier movement
      segments[0].x += (mouse.x - segments[0].x) * 0.25;
      segments[0].y += (mouse.y - segments[0].y) * 0.25;

      // Update Body
      for (let i = 1; i < numSegments; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const angle = Math.atan2(dy, dx);
        const targetDist = 5; // Very tight spacing

        const tx = prev.x - Math.cos(angle) * targetDist;
        const ty = prev.y - Math.sin(angle) * targetDist;

        curr.x += (tx - curr.x) * 0.4;
        curr.y += (ty - curr.y) * 0.4;
      }

      // Draw - Unique "Crystal Shards" Style
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#10b981';

      for (let i = 0; i < numSegments; i++) {
        const s = segments[i];
        const size = (numSegments - i) * 1.5; // Tapering size
        const opacity = 1 - (i / numSegments);

        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`; // Emerald
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.lineWidth = 1;

        // Draw Diamond/Shard shape
        ctx.beginPath();
        // Rotate slightly based on movement or time for "floating" feel
        const angle = Math.sin(time + i * 0.5) * 0.2;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(angle);

        ctx.moveTo(0, -size); // Top
        ctx.lineTo(size * 0.8, 0); // Right
        ctx.lineTo(0, size); // Bottom
        ctx.lineTo(-size * 0.8, 0); // Left
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Center Core (Head)
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#fff';
      ctx.beginPath();
      ctx.arc(segments[0].x, segments[0].y, 3, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen"
    />
  );
}
