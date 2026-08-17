import React, { useEffect, useRef } from 'react';
import Starfield from './Starfield';
import Sun from './Sun';
import CitySkyline from './CitySkyline';
import './Scene.css';

export default function Scene({ parallaxRef }) {
  const starsLayerRef = useRef(null);
  const geoRef = useRef(null);
  const sunWrapRef = useRef(null);
  const sunPoolRef = useRef(null);
  const mountainsBackRef = useRef(null);
  const mountainsFrontRef = useRef(null);
  const cityRef = useRef(null);
  const silhouettesRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    
    const render = () => {
      if (!parallaxRef.current) return;
      
      const { mouseX, mouseY, scrollProgress, time } = parallaxRef.current;
      
      // Idle drifts
      const idleX = Math.sin(time * 0.5) * 0.05;
      const idleY = Math.cos(time * 0.3) * 0.05;

      const combinedX = mouseX + idleX;
      const combinedY = mouseY + idleY;

      // Sun Layer
      const sunX = combinedX * 30;
      const sunY = (combinedY * 20) + (scrollProgress * window.innerHeight * 0.7);
      if (sunWrapRef.current) sunWrapRef.current.style.transform = `translate(calc(-50% + ${sunX}px), ${sunY}px)`;
      if (sunPoolRef.current) {
        sunPoolRef.current.style.transform = `translateX(calc(-50% + ${sunX * 0.5}px))`;
        sunPoolRef.current.style.opacity = Math.max(0, 1 - scrollProgress * 1.5);
      }

      // Stars Layer
      if (starsLayerRef.current) {
        starsLayerRef.current.style.transform = `translate(${combinedX * -10}px, ${(combinedY * -10) + (scrollProgress * window.innerHeight * 0.1)}px)`;
      }

      // Geometry
      if (geoRef.current) {
        geoRef.current.style.transform = `translate(${combinedX * -20}px, ${(combinedY * -20) + (scrollProgress * window.innerHeight * 0.2)}px)`;
      }

      // Mountains (Back & Front)
      if (mountainsBackRef.current) mountainsBackRef.current.style.transform = `translate(${combinedX * 10}px, ${scrollProgress * window.innerHeight * 0.05}px)`;
      if (mountainsFrontRef.current) mountainsFrontRef.current.style.transform = `translate(${combinedX * 20}px, ${scrollProgress * window.innerHeight * 0.1}px)`;

      // City Silhouette
      if (cityRef.current) cityRef.current.style.transform = `translate(calc(-50% + ${combinedX * 35}px), ${scrollProgress * window.innerHeight * 0.15}px)`;

      // Silhouettes (Palms, Bust)
      if (silhouettesRef.current) silhouettesRef.current.style.transform = `translate(${combinedX * 50}px, ${scrollProgress * window.innerHeight * 0.2}px)`;

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [parallaxRef]);

  return (
    <div className="scene">
      <div className="sky"></div>
      <div className="sky sky-dark"></div>
      
      <div className="stars" ref={starsLayerRef}>
        <Starfield parallaxRef={parallaxRef} />
      </div>
      
      <div className="floating-geo" ref={geoRef}>
        <div className="wire-planet"></div>
        <div className="grid-triangle"></div>
      </div>

      <div className="haze"></div>
      <div className="haze haze-dark"></div>

      <div className="sun-wrap" ref={sunWrapRef}>
        <Sun />
      </div>

      <div className="mountains" ref={mountainsBackRef}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path className="back" d="M0,200 L0,110 L90,50 L200,120 L310,35 L450,110 L580,45 L700,120 L840,40 L970,115 L1080,60 L1200,110 L1200,200 Z"/>
        </svg>
      </div>
      <div className="mountains" ref={mountainsFrontRef}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,200 L0,140 L110,80 L230,135 L360,70 L480,140 L600,85 L720,130 L850,75 L990,145 L1110,95 L1200,140 L1200,200 Z"/>
        </svg>
      </div>

      <div className="city" ref={cityRef}>
        <CitySkyline />
      </div>

      <div className="silhouettes" ref={silhouettesRef}>
        <div className="palm left"></div>
        <div className="palm right"></div>
        <div className="bust"></div>
      </div>

      <div className="horizon-line"></div>

      <div className="ground">
        <div className="pool" ref={sunPoolRef}></div>
        <div className="grid"></div>
        <div className="grid grid-dark"></div>
      </div>
    </div>
  );
}
