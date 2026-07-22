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
    <section id="services" style={{ 
      padding: '6rem 2rem', 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(10, 25, 20, 0.9)), url("/packages_bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed' // Adds a premium parallax scroll effect
    }}>
      <h2 className="section-title" style={{ color: 'var(--accent-lime)' }}>OUR PACKAGES</h2>
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
            border: '2px solid var(--accent-lime)',
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
