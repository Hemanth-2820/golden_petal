import React from 'react';

const Intro = () => {
  return (
    <section className="mobile-padding" style={{ backgroundColor: '#FFFFFF', padding: '6rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Text Section */}
        <div style={{ marginBottom: '6rem' }}>
          <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, color: '#000', margin: 0, letterSpacing: '-2px' }}>
            GOLDEN PETAL,
          </h2>
          <div style={{ display: 'inline-block', position: 'relative', marginTop: '10px' }}>
            {/* Yellow Background Block */}
            <div style={{ position: 'absolute', top: 0, left: '-20px', right: '-20px', bottom: 0, backgroundColor: '#D4AF37', zIndex: 0, transform: 'rotate(-2deg)' }}></div>
            <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, color: '#000', margin: 0, position: 'relative', zIndex: 1, letterSpacing: '-2px', padding: '0 10px' }}>
              DECODED.
            </h2>
          </div>
          
          <div style={{ marginTop: '4rem', maxWidth: '800px' }}>
            <p style={{ fontSize: '1.6rem', fontWeight: 500, lineHeight: 1.6, color: '#000', marginBottom: '1.5rem' }}>
              Golden Petal is a celebration space where people can connect, celebrate, and create lasting memories.
            </p>
            <p style={{ fontSize: '1.6rem', fontWeight: 500, lineHeight: 1.6, color: '#000', marginBottom: '2rem' }}>
              To transform dream celebrations into reality by delivering a beautiful, welcoming, and versatile setting that brings the Mangaluru community together to celebrate life's milestones.
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#000' }}>
              Bring friends. Bring kids. Bring everyone.
            </p>
          </div>
        </div>

        {/* Bottom Images Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', padding: '2rem 0' }}>
          
          {/* Image 1 - Green border */}
          <div style={{ 
            border: '8px solid #D4AF37', 
            backgroundColor: '#FFF', 
            padding: '10px', 
            transform: 'rotate(-3deg)',
            boxShadow: '15px 15px 0px rgba(0,0,0,0.5)',
            height: '450px'
          }}>
            <img src="/friends_selfie.png" alt="Friends celebrating" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Image 2 - Orange border */}
          <div style={{ 
            border: '8px solid #D4AF37', 
            backgroundColor: '#FFF', 
            padding: '10px', 
            transform: 'rotate(2deg)',
            boxShadow: '15px 15px 0px rgba(0,0,0,0.5)',
            height: '450px',
            marginTop: '2rem'
          }}>
            <img src="/romantic_entry.png" alt="Couple entering" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Image 3 - Purple border */}
          <div style={{ 
            border: '8px solid #D4AF37', 
            backgroundColor: '#FFF', 
            padding: '10px', 
            transform: 'rotate(-2deg)',
            boxShadow: '15px 15px 0px rgba(0,0,0,0.5)',
            height: '450px'
          }}>
            <img src="/kids_party.png" alt="Kids party" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Intro;
