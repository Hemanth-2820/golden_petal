import React from 'react';
import GoldParticles from './GoldParticles';

const Services = () => {
  const serviceImages = [
    '/service_1.jpg',
    '/service_2.jpg',
    '/service_3.jpg',
    '/service_4.jpg',
    '/service_5.jpg',
  ];

  return (
    <section className="mobile-padding" id="services" style={{
      padding: '6rem 2rem',
      backgroundColor: '#000000',
      backgroundImage: 'radial-gradient(circle at center, #000000 0%, #000000 100%)',
      position: 'relative'
    }}>
      <GoldParticles density={3} bright={true} />
      <h2 className="section-title" style={{ color: 'var(--accent-gold)', position: 'relative', zIndex: 1 }}>OUR PACKAGES</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '60vh', // Creates long scroll space between cards arriving
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '30vh',
        position: 'relative'
      }}>
        {serviceImages.slice(0, 4).map((src, index) => (
          <div key={index} className="service-card-mobile" style={{
            position: 'sticky',
            top: '25vh',
            marginLeft: `${index * 25}%`,
            width: '22%',
            minWidth: '220px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '2px solid var(--accent-gold)',
            zIndex: index,
            transition: 'transform 0.3s ease'
          }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={src}
              alt={`Service Package ${index + 1}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
