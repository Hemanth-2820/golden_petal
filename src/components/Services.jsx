import React from 'react';

const Services = () => {
  const serviceImages = [
    '/service_1.jpg',
    '/service_2.jpg',
    '/service_3.jpg',
    '/service_4.jpg',
    '/service_5.jpg',
  ];

  return (
    <section id="services" style={{ padding: '6rem 2rem', background: 'var(--text-dark-green)' }}>
      <h2 className="section-title" style={{ color: 'var(--accent-lime)' }}>OUR PACKAGES</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        {serviceImages.map((src, index) => (
          <div key={index} style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
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
