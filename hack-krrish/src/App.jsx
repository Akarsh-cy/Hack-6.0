import React from 'react';
import Scene from './components/Scene';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import { useViewportHeight } from './hooks/useViewportHeight';
import { useParallaxEngine } from './hooks/useParallaxEngine';

function App() {
  useViewportHeight();
  const parallaxRef = useParallaxEngine();

  return (
    <div className="rig">
      <Scene parallaxRef={parallaxRef} />
      <Hero parallaxRef={parallaxRef} />
      
      <div className="crt"></div>
      <div className="grain"></div>
      <div className="vignette"></div>

      <Timeline parallaxRef={parallaxRef} />
    </div>
  );
}

export default App;
