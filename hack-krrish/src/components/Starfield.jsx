import React, { useEffect, useRef } from 'react';

export default function Starfield({ parallaxRef }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const seedStars = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((w * h) / 3000);
      starsRef.current = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.7,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: 0.01 + Math.random() * 0.03
      }));
    };

    seedStars();
    window.addEventListener('resize', seedStars);

    let animationFrameId;
    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      
      const scrollProgress = parallaxRef.current?.scrollProgress || 0;

      for (let s of starsRef.current) {
        s.alpha += s.speed;
        const a = (Math.sin(s.alpha) + 1) / 2;
        const baseOpacity = 0.2 + (scrollProgress * 0.3);
        const r = 200 + s.x % 55;
        const g = 200 + s.y % 55;
        const b = 255;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseOpacity + a * 0.8})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', seedStars);
      cancelAnimationFrame(animationFrameId);
    };
  }, [parallaxRef]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
