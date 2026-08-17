import { useEffect, useRef } from 'react';

// Helper for color interpolation (Vaporwave Sun Color Shift)
function lerpColor(a, b, amount) {
  const ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);
  return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

export function useParallaxEngine() {
  const parallaxRef = useRef({
    mouseX: 0,
    mouseY: 0,
    scrollProgress: 0
  });

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let scrollProgress = 0, targetScrollProgress = 0;
    let time = 0;
    let animationFrameId;
    
    const root = document.documentElement;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      targetScrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial compute

    const render = () => {
      time += 0.01;

      // Lerp mouse & scroll
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;

      // Update ref for components that need exact values (like inline transforms)
      parallaxRef.current = { mouseX, mouseY, scrollProgress, time };

      // Write CSS variables directly to root for performance
      root.style.setProperty('--scroll-p', scrollProgress);

      const c1 = lerpColor('#7EFFF5', '#FF71CE', scrollProgress);
      const c2 = lerpColor('#FF71CE', '#B967FF', scrollProgress);
      const c3 = lerpColor('#B967FF', '#2D1B4E', scrollProgress);
      const c4 = lerpColor('#2D1B4E', '#080512', scrollProgress);
      
      root.style.setProperty('--sun-c1', c1);
      root.style.setProperty('--sun-c2', c2);
      root.style.setProperty('--sun-c3', c3);
      root.style.setProperty('--sun-c4', c4);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return parallaxRef;
}
