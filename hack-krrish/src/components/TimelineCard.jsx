import React, { useRef, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';

export default function TimelineCard({ event }) {
  const [inViewRef, isInView] = useInView({ threshold: 0.2 });
  const panelRef = useRef(null);
  const glareRef = useRef(null);

  // Mouse tilt logic
  const handleMouseMove = useCallback((e) => {
    if (!panelRef.current || !glareRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation limits (-15deg to 15deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    // Use setProperty directly for smooth 60fps local hover tilt without React state delays
    panelRef.current.style.setProperty('--mouse-x', `${x}px`);
    panelRef.current.style.setProperty('--mouse-y', `${y}px`);
    panelRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    panelRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!panelRef.current) return;
    panelRef.current.style.setProperty('--rotate-x', '0deg');
    panelRef.current.style.setProperty('--rotate-y', '0deg');
  }, []);

  return (
    <div 
      className={`card ${event.side} ${isInView ? 'visible' : ''}`} 
      ref={inViewRef}
    >
      <div className="card-floater">
        <div 
          className="panel" 
          ref={panelRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mouse-glare" ref={glareRef}></div>
          <div className="metal-ripples"></div>
          
          <div className="panel-content">
            <p className="eyebrow">{event.date}</p>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
