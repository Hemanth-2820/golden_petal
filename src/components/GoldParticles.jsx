import React, { useEffect, useState } from 'react';

const GoldParticles = ({ density = 1, bright = false }) => {
  const [particles, setParticles] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate massive bokeh particles
    const generatedParticles = Array.from({ length: 70 * density }).map((_, i) => {
      const layer = Math.random();
      let size, blur, maxOpacity, zIndex;
      
      if (layer < 0.33) {
        // Background
        size = Math.random() * 15 + 10; // 10px to 25px
        blur = 1; // barely any blur
        maxOpacity = Math.random() * 0.4 + 0.6; 
        zIndex = 1;
      } else if (layer < 0.66) {
        // Midground
        size = Math.random() * 10 + 5; // 5px to 15px
        blur = 0; 
        maxOpacity = Math.random() * 0.3 + 0.7;
        zIndex = 2;
      } else {
        // Foreground
        size = Math.random() * 5 + 3; // 3px to 8px
        blur = 0; // Completely sharp
        maxOpacity = 1.0; 
        zIndex = 3;
      }

      // Force extremely bright on gallery
      if (bright) {
        maxOpacity = 1;
      }

      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDelay = Math.random() * -30;
      const animationDuration = Math.random() * 20 + 15; // Faster for more visible movement
      
      return { id: `p-${i}`, size, blur, maxOpacity, zIndex, left, top, animationDelay, animationDuration };
    });
    
    setParticles(generatedParticles);
    setStars([]); // Removing stars, we only want bokeh now
  }, [density, bright]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {/* Celebration ambient glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at top center, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
      }}></div>

      {/* Floating Bokeh Bubbles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            // Create a bubble/bokeh effect: darker inside, bright thick golden edge
            background: 'radial-gradient(circle, rgba(255,200,0,0.2) 0%, rgba(255,180,0,0.5) 60%, rgba(255,230,0,1) 100%)',
            border: '3px solid rgba(255, 230, 0, 1)',
            boxShadow: 'inset 0 0 15px rgba(255, 180, 0, 1), 0 0 10px rgba(255, 215, 0, 1)',
            borderRadius: '50%',
            left: `${p.left}%`,
            top: `${p.top}%`,
            filter: `blur(${p.blur}px)`,
            zIndex: p.zIndex,
            animation: `floatUp ${p.animationDuration}s linear infinite`,
            animationDelay: `${p.animationDelay}s`,
            opacity: 0, 
            '--max-opacity': p.maxOpacity,
            mixBlendMode: 'screen'
          }}
        />
      ))}
    </div>
  );
};

export default GoldParticles;
