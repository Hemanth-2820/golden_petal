import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [bgImage, setBgImage] = useState('/addon_fog_real.jpg');

  const blobs = [
    {
      id: 1,
      text: 'BIRTHDAY PARTIES',
      subtext: 'Make it unforgettable',
      color: '#FFB6C1',
      textColor: 'black',
      image: '/hero_birthday_luxury.png',
      style: { top: '15%', left: '5%', width: 'clamp(180px, 15vw, 250px)', height: 'clamp(130px, 12vw, 180px)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
    },
    {
      id: 2,
      text: 'COUPLE SURPRISE',
      subtext: 'Romantic setups',
      color: '#FF0000',
      textColor: 'white',
      image: '/hero_couple_luxury.png',
      style: { top: '45%', right: '8%', width: 'clamp(200px, 18vw, 280px)', height: 'clamp(150px, 15vw, 220px)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }
    },
    {
      id: 3,
      text: 'ANNIVERSARY',
      subtext: 'Celebrate love',
      color: '#007BFF',
      textColor: 'white',
      image: '/anniversary.png',
      style: { top: '20%', left: '40%', width: 'clamp(180px, 15vw, 240px)', height: 'clamp(140px, 12vw, 190px)', borderRadius: '50% 50% 20% 80% / 25% 80% 20% 75%' }
    },
    {
      id: 4,
      text: 'BABY SHOWER',
      subtext: 'Joy & memories',
      color: 'black',
      textColor: 'white',
      image: '/babyshower.png',
      style: { bottom: '15%', left: '15%', width: 'clamp(160px, 14vw, 220px)', height: 'clamp(120px, 10vw, 160px)', borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%' }
    },
    {
      id: 5,
      text: 'BRIDE TO BE',
      subtext: 'Celebrate her',
      color: '#CCFF00',
      textColor: 'black',
      image: '/bridetobe.png',
      style: { bottom: '15%', right: '30%', width: 'clamp(150px, 13vw, 200px)', height: 'clamp(150px, 13vw, 200px)', borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%' }
    }
  ];

  return (
    <section 
      id="hero"
      className="hero-section" 
      style={{ 
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      {/* Dark overlay to make blobs stand out */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        pointerEvents: 'none',
        zIndex: 1
      }}></div>

      <div className="blob-container" style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        

        {/* Floating Blobs */}
        {blobs.map(blob => (
          <div
            key={blob.id}
            className="blob-wrapper"
            onMouseEnter={() => setBgImage(blob.image)}
            onMouseLeave={() => setBgImage('/addon_fog_real.jpg')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: blob.color,
              color: blob.textColor,
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, border-radius 0.3s ease',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              ...blob.style
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {blob.text === 'BOOK NOW' ? (
              <Link to="/contact" style={{ color: blob.textColor, textDecoration: 'none' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: 'inherit' }}>{blob.text}</h3>
                <p style={{ fontSize: '1rem', fontWeight: 600, margin: '5px 0 0', color: 'inherit' }}>{blob.subtext}</p>
              </Link>
            ) : (
              <Link to="/events" style={{ color: blob.textColor, textDecoration: 'none' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: 'inherit' }}>{blob.text}</h3>
                <p style={{ fontSize: '1rem', fontWeight: 600, margin: '5px 0 0', color: 'inherit' }}>{blob.subtext}</p>
              </Link>
            )}
          </div>
        ))}
      </div>
      <style>{`
        .hero-section {
          height: calc(100vh - 122px);
        }
        .blob-wrapper {
          position: absolute;
        }
        @media (max-width: 768px) {
          .hero-section {
            height: auto !important;
            min-height: 100vh;
            padding: 2rem 1rem !important;
          }
          .blob-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
            gap: 1.5rem;
            height: auto !important;
          }
          .blob-wrapper {
            position: relative !important;
            top: auto !important; left: auto !important; right: auto !important; bottom: auto !important;
            width: 40vw !important;
            height: 40vw !important;
            padding: 1rem !important;
          }
          .blob-wrapper h3 {
            font-size: 1.2rem !important;
          }
          .blob-wrapper p {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
