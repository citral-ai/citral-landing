"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Aurora blobs — slow drifting gradients
    const blobs = [
      { x: 0.3, y: 0.4, r: 0.35, color: [0, 194, 168], speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.3, r: 0.3, color: [0, 150, 136], speed: 0.0004, phase: 2 },
      { x: 0.5, y: 0.6, r: 0.4, color: [0, 194, 168], speed: 0.0002, phase: 4 },
      { x: 0.2, y: 0.7, r: 0.25, color: [232, 200, 74], speed: 0.00025, phase: 1 },
      { x: 0.8, y: 0.6, r: 0.3, color: [0, 180, 160], speed: 0.00035, phase: 3 },
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear to black
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      // Draw aurora blobs
      for (const blob of blobs) {
        const bx = (blob.x + Math.sin(time * blob.speed * 10 + blob.phase) * 0.08) * w;
        const by = (blob.y + Math.cos(time * blob.speed * 8 + blob.phase) * 0.06) * h;
        const br = blob.r * Math.min(w, h);

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        const [r, g, b] = blob.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.06)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.025)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 1 }}
    />
  );
}
