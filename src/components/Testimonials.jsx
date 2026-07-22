import React, { useState } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    { 
      id: 1,
      image: '/romantic.png',
      text: 'We celebrated our first anniversary here. The romantic setup and candle path were absolutely magical! Highly recommend for special moments.', 
      author: 'RAHUL & PRIYA'
    },
    { 
      id: 2,
      image: '/birthday.png',
      text: 'Best place for a surprise birthday party in Mangalore. The fog entry was a huge hit with my friends and the ambiance was perfect.', 
      author: 'SNEHA D.'
    },
    { 
      id: 3,
      image: '/babyshower.png',
      text: 'Hosted a baby shower for my wife. The team handled everything perfectly from start to finish. We are extremely grateful!', 
      author: 'KARTHIK SHETTY'
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // After 400ms (when card is swiped out), actually change the index so it falls to the back
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 400);

    // End animation state after the full cycle
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const getCardStyle = (index) => {
    // Determine relative position in the stack (0 = front, 1 = middle, 2 = back)
    const isCurrentFront = index === activeIndex;
    const isMovingOut = isAnimating && isCurrentFront;
    
    // If we are currently animating, the visual diff is based on the OLD active index for the first 400ms
    // After 400ms, activeIndex updates, and isAnimating is still true for 400ms more (sliding back in)
    const diff = (index - activeIndex + testimonials.length) % testimonials.length;
    
    let zIndex = 3 - diff;
    let rotateZ = 0;
    let rotateY = 0;
    let rotateX = 0;
    let translateZ = 0;
    let translateX = 0;
    let translateY = 0;
    let opacity = 1;

    // The card being swiped out gets a special 3D trajectory
    if (isMovingOut) {
      rotateZ = 15;
      rotateY = -40; // Flip in 3D
      rotateX = 10;
      translateZ = 150; // Pop out towards the user
      translateX = 400; // Swipe far right
      translateY = -50;
      zIndex = 10; // Keep on top while swiping out
    } else {
      // Normal stack positions with 3D depth
      if (diff === 1) {
        rotateZ = -4;
        rotateY = 5;
        translateZ = -80; // Push back into the screen
        translateX = -20;
        translateY = -15;
      } else if (diff === 2) {
        rotateZ = 4;
        rotateY = -5;
        translateZ = -160; // Push further back
        translateX = 20;
        translateY = -5;
      }
    }
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex,
      opacity,
      transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)', // Smooth realistic 3D swipe
      backgroundColor: '#FFFFFF', // Cream/off-white background
      border: '3px solid #000000', // Dark green border
      borderRadius: '8px',
      padding: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: diff === 0 ? '0 20px 40px rgba(0,0,0,0.5)' : 'none'
    };
  };

  return (
    <section className="mobile-padding" id="testimonials" style={{ padding: '8rem 2rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="title-display mobile-text-clamp" style={{ fontSize: '3rem', color: '#000000', margin: 0 }}>STORIES</h2>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#000000', letterSpacing: '2px' }}>REAL MOMENTS</p>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '480px', height: '520px', perspective: '1200px', transformStyle: 'preserve-3d' }}>
        
        {testimonials.map((test, index) => {
          const isFront = (index - activeIndex + testimonials.length) % testimonials.length === 0;
          return (
          <div key={test.id} style={getCardStyle(index)}>
            <div style={{ width: '100%', height: '260px', overflow: 'hidden', border: '1px solid #000000' }}>
              <img src={test.image} alt={test.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <p style={{ fontFamily: 'serif', fontSize: '1.3rem', color: '#000000', textAlign: 'center', lineHeight: '1.4', margin: '1.5rem 0' }}>
              “{test.text}”
            </p>
            
            <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: '#000000', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {test.author}
            </div>

            {/* Next button wrapper to prevent clicking buttons on hidden cards */}
            <div style={{ 
              opacity: isFront && !isAnimating ? 1 : 0, 
              transition: 'opacity 0.2s', 
              pointerEvents: isFront && !isAnimating ? 'auto' : 'none',
              marginTop: 'auto',
              marginBottom: '-2.8rem' // Pull button down slightly over the border like the screenshot
            }}>
              <button 
                onClick={handleNext}
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 30px',
                  borderRadius: '50px',
                  fontFamily: 'serif',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Next →
              </button>
            </div>
          </div>
        )})}
        
      </div>
    </section>
  );
};

export default Testimonials;
