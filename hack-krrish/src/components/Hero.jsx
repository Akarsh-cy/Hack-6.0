import React, { useRef, useEffect } from 'react';
import './Hero.css';

export default function Hero({ parallaxRef }) {
  const heroRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    
    const render = () => {
      if (!parallaxRef.current) return;
      const { mouseX, mouseY, scrollProgress, time } = parallaxRef.current;
      
      const idleX = Math.sin(time * 0.5) * 0.05;
      const idleY = Math.cos(time * 0.3) * 0.05;
      const combinedX = mouseX + idleX;
      const combinedY = mouseY + idleY;
      
      if (heroRef.current) {
        heroRef.current.style.transform = `translate(${combinedX * -40}px, ${(combinedY * -40) - (scrollProgress * window.innerHeight * 0.4)}px)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [parallaxRef]);

  return (
    <div className="hero" id="hero" ref={heroRef}>
      <div className="hero-title-wrap">
        <h1>Hack 6.0</h1>
      </div>
      <p>Vaporwave Horizon</p>

      <div className="hero-cta">
        <button className="register-btn">
          <span className="text">REGISTER NOW <span className="arr">&gt;&gt;</span></span>
        </button>
      </div>
    </div>
  );
}
