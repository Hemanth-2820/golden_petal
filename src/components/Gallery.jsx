import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GoldParticles from './GoldParticles';

const Gallery = () => {
  const scrollRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredVideos = [
    { id: 1, src: '/featured_video_1.mp4', category: 'ROMANTIC', title: 'Kelsey & Anthony' },
    { id: 2, src: '/featured_video_2.mp4', category: 'BIRTHDAY', title: 'Birthday Bash' },
    { id: 3, src: '/featured_video_3.mp4', category: 'ANNIVERSARY', title: 'Anniversary Special' }
  ];

  const handleNavClick = (index) => {
    setActiveIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (activeIndex === index) {
          video.play().catch(e => console.log('Autoplay blocked:', e));
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

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
    <div id="gallery-page" style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Particles */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <GoldParticles />
      </div>

      {/* 1. Videos Grid Section (New) */}
      <section className="mobile-padding" style={{ padding: '4rem 2vw', backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <h2 className="title-display mobile-text-clamp" style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center', color: '#FFFFFF' }}>
          FEATURED VIDEOS
        </h2>
        
        <div className="flex-stack-mobile" style={{ 
          display: 'flex', 
          gap: '0',
          maxWidth: '1600px',
          height: '400px',
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
              <video 
                ref={el => videoRefs.current[index] = el}
                src={video.src} 
                loop 
                muted 
                playsInline 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1, filter: activeIndex === index ? 'brightness(1)' : 'brightness(0.4)', transition: 'filter 0.5s' }} 
              />
              
              {/* Play Button Overlay */}
              {activeIndex !== index && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '3rem', opacity: 0.8 }}>
                  ▶
                </div>
              )}

              {/* Text Overlay Bottom Left Removed */}
            </div>
          ))}

        </div>
      </section>

      {/* 2. Existing Horizontal Image Scroll */}
      <section id="gallery-scroll" className="mobile-padding" style={{ padding: '6rem 0', maxWidth: '100%', position: 'relative', backgroundColor: 'transparent', zIndex: 1 }}>
        <div style={{ padding: '0 5vw', marginBottom: '3rem' }}>
          <h2 className="title-display mobile-text-clamp" style={{ fontSize: '3rem', color: '#FFFFFF' }}>PHOTO GALLERY</h2>
        </div>
        
        <div className="horizontal-scroll-container" ref={scrollRef}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => (
            <div key={num} className="scroll-item">
              <img src={`/gallery_real_${num}.jpeg`} alt={`Golden Petal Gallery ${num}`} />
            </div>
          ))}
        </div>

        {/* Floating internal navigation similar to momoamo's pinned nav */}
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          background: '#000000',
          border: '1px solid #D4AF37',
          zIndex: 100
        }}>
          <button onClick={() => handleNavClick(0)} style={{ background: 'none', color: '#FFFFFF', border: 'none', cursor: 'pointer', padding: '15px 30px', borderRight: '1px solid #D4AF37', fontWeight: 700, fontFamily: 'Oswald', whiteSpace: 'nowrap', fontSize: '1rem' }}>ROMANTIC</button>
          <button onClick={() => handleNavClick(1)} style={{ background: 'none', color: '#FFFFFF', border: 'none', cursor: 'pointer', padding: '15px 30px', borderRight: '1px solid #D4AF37', fontWeight: 700, fontFamily: 'Oswald', whiteSpace: 'nowrap', fontSize: '1rem' }}>BIRTHDAY</button>
          <button onClick={() => handleNavClick(2)} style={{ background: 'none', color: '#FFFFFF', border: 'none', cursor: 'pointer', padding: '15px 30px', fontWeight: 700, fontFamily: 'Oswald', whiteSpace: 'nowrap', fontSize: '1rem' }}>ANNIVERSARY</button>
          <Link to="/contact" style={{ background: '#D4AF37', color: '#000000', padding: '15px 30px', fontWeight: 700, fontFamily: 'Oswald', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', textDecoration: 'none' }}>
            BOOK <span style={{ fontSize: '1.2rem' }}>➔</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Gallery;
