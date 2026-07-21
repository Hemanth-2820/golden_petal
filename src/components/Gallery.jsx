import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredVideos = [
    { id: 1, src: '/romantic.png', category: 'WEDDING', title: 'Kelsey & Anthony' },
    { id: 2, src: '/new_addon_candles.jpg', category: 'PORTRAIT', title: 'Romantic Candles' },
    { id: 3, src: '/anniversary.png', category: 'CELEBRATE', title: 'Anniversary Special' }
  ];

  useEffect(() => {
    let animationFrameId;
    let scrollPos = 0;

    const scrollStep = () => {
      if (scrollRef.current) {
        scrollPos += 0.5; // Very slow, continuous speed
        const { scrollWidth, clientWidth } = scrollRef.current;
        
        // Reset scroll position to 0 if it reaches the end for an infinite feel
        if (scrollPos >= scrollWidth - clientWidth) {
          scrollPos = 0;
        }
        
        scrollRef.current.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div id="gallery-page">
      
      {/* 1. Videos Grid Section (New) */}
      <section style={{ padding: '4rem 2vw', backgroundColor: '#F5F5F0' }}>
        <h2 className="title-display" style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#000' }}>
          FEATURED VIDEOS
        </h2>
        
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem',
          maxWidth: '1600px',
          height: '600px',
          margin: '0 auto'
        }}>
          
          {featuredVideos.map((video, index) => (
            <div 
              key={video.id}
              onClick={() => setActiveIndex(index)}
              style={{ 
                flex: activeIndex === index ? 2 : 1, 
                position: 'relative', 
                overflow: 'hidden', 
                cursor: 'pointer',
                backgroundColor: '#000',
                transition: 'flex 0.5s ease-in-out'
              }}
            >
              <img src={video.src} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: activeIndex === index ? 'brightness(0.9)' : 'brightness(0.6)', transition: 'filter 0.5s' }} />
              
              {/* Play Button Overlay */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: activeIndex === index ? '4rem' : '2.5rem', opacity: 0.8, transition: 'font-size 0.5s' }}>
                ▶
              </div>

              {/* Text Overlay Bottom Left */}
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: 'white', opacity: activeIndex === index ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: 'none' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  {video.category}
                </div>
                <div style={{ fontFamily: 'serif', fontSize: '3.5rem', lineHeight: 1, whiteSpace: 'nowrap' }}>
                  {video.title}
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 2. Existing Horizontal Image Scroll */}
      <section id="gallery-scroll" style={{ padding: '6rem 0', maxWidth: '100%', position: 'relative', backgroundColor: 'white' }}>
        <div style={{ padding: '0 5vw', marginBottom: '3rem' }}>
          <h2 className="title-display" style={{ fontSize: '3rem' }}>PHOTO GALLERY</h2>
        </div>
        
        <div className="horizontal-scroll-container" ref={scrollRef}>
          <div className="scroll-item">
            <img src="/romantic.png" alt="Romantic Setup" />
          </div>
          <div className="scroll-item">
            <img src="/birthday.png" alt="Birthday Celebration" />
          </div>
          <div className="scroll-item">
            <img src="/anniversary.png" alt="Anniversary Hall" />
          </div>
          <div className="scroll-item">
            <img src="/babyshower.png" alt="Baby Shower" />
          </div>
          <div className="scroll-item">
            <img src="/bridetobe.png" alt="Bride To Be" />
          </div>
          <div className="scroll-item">
            <img src="/fogentry.png" alt="Fog Entry" />
          </div>
        </div>

        {/* Floating internal navigation similar to momoamo's pinned nav */}
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          background: 'var(--bg-offwhite)',
          border: '1px solid var(--text-dark-green)',
          zIndex: 100
        }}>
          <div style={{ padding: '15px 30px', borderRight: '1px solid var(--text-dark-green)', fontWeight: 700, fontFamily: 'Oswald', whiteSpace: 'nowrap' }}>ROMANTIC</div>
          <div style={{ padding: '15px 30px', borderRight: '1px solid var(--text-dark-green)', fontWeight: 700, fontFamily: 'Oswald', whiteSpace: 'nowrap' }}>BIRTHDAY</div>
          <div style={{ padding: '15px 30px', fontWeight: 700, fontFamily: 'Oswald', whiteSpace: 'nowrap' }}>ANNIVERSARY</div>
          <Link to="/contact" style={{ background: 'var(--text-black-green)', color: 'var(--bg-cream)', padding: '15px 30px', fontWeight: 700, fontFamily: 'Oswald', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
            BOOK <span style={{ fontSize: '1.2rem' }}>➔</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Gallery;
