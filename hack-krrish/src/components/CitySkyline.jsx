import React, { useMemo } from 'react';

// Seeded RNG
const getRNG = (seed) => () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

export default function CitySkyline() {
  const elements = useMemo(() => {
    const totalBldgs = 22;
    const widthTotal = 600;
    const baseline = 140;
    const rng = getRNG(1337);
    
    let curX = 0;
    const rects = [];
    const windows = [];

    for (let i = 0; i < totalBldgs; i++) {
      const w = 15 + rng() * 30;
      const h = 20 + rng() * 90;
      
      rects.push(
        <rect key={`bldg-${i}`} className="bldg" x={curX} y={baseline - h} width={w} height={h} />
      );

      // Random glowing windows in buildings
      if (rng() > 0.5) {
        const winCount = Math.floor(rng() * 4);
        for(let j=0; j < winCount; j++){
          const wx = curX + 2 + rng() * (w - 6);
          const wy = baseline - h + 5 + rng() * (h - 10);
          windows.push(
            <rect 
              key={`win-${i}-${j}`} 
              className="window" 
              x={wx} 
              y={wy} 
              width={3} 
              height={4} 
              style={{ animationDelay: `${rng() * 3}s` }} 
            />
          );
        }
      }
      curX += w + (1 + rng() * 4);
    }

    const scaleRatio = widthTotal / curX;
    
    return { rects, windows, scaleRatio };
  }, []);

  return (
    <svg viewBox="0 0 600 140" preserveAspectRatio="none">
      <g transform={`scale(${elements.scaleRatio}, 1)`}>
        {elements.rects}
        {elements.windows}
      </g>
    </svg>
  );
}
