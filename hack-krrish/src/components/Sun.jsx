import React from 'react';

const sliceHeights = [1, 2, 2.5, 3.5, 5, 7, 9.5, 13, 17, 22, 28, 35];

export default function Sun() {
  return (
    <>
      <div className="sun-glow"></div>
      <div className="sun-corona"></div>
      <div className="sun-ripples">
        <div className="sun-ripple"></div>
        <div className="sun-ripple"></div>
        <div className="sun-ripple"></div>
      </div>
      <div className="sun">
        <div className="slice-container">
          {sliceHeights.map((h, i) => (
            <div 
              key={i} 
              className={`slice ${i > 6 ? 'flicker' : ''}`}
              style={{ height: `${h}px`, marginBottom: `${h * 0.5}px` }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
