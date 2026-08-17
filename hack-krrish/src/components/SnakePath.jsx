import React, { useMemo } from 'react';

export default function SnakePath({ count }) {
  // Pure functional math generation for the snake path
  const svgData = useMemo(() => {
    const ROW_HEIGHT = 400; // MUST match grid-auto-rows in CSS
    const totalHeight = count * ROW_HEIGHT;
    
    // Create the path math
    let d = "M50,200 "; // Start at left side of row 1
    
    for (let i = 0; i < count - 1; i++) {
      const isLeftToRight = i % 2 === 0;
      const startY = 200 + (i * ROW_HEIGHT);
      const endY = 200 + ((i + 1) * ROW_HEIGHT);
      
      if (isLeftToRight) {
        // Curve from Left (50) to Right (950)
        d += `C50,${startY + 200} 950,${startY + 200} 950,${endY} `;
      } else {
        // Curve from Right (950) to Left (50)
        d += `C950,${startY + 200} 50,${startY + 200} 50,${endY} `;
      }
    }
    
    return { height: totalHeight, d };
  }, [count]);

  return (
    <div className="snake-svg-container">
      <svg viewBox={`0 0 1000 ${svgData.height}`} preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="50%" stopColor="var(--pink)" />
            <stop offset="100%" stopColor="var(--purple)" />
          </linearGradient>
          <linearGradient id="snakeDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a148c" />
            <stop offset="100%" stopColor="#311b92" />
          </linearGradient>
        </defs>
        
        <path 
          className="bright-snake" 
          d={svgData.d} 
          fill="none" 
          stroke="url(#snakeGrad)" 
          strokeWidth="4" 
          strokeDasharray="15, 15" 
        />
        <path 
          className="dark-snake" 
          d={svgData.d} 
          fill="none" 
          stroke="url(#snakeDarkGrad)" 
          strokeWidth="6" 
          strokeDasharray="15, 15" 
        />
      </svg>
    </div>
  );
}
