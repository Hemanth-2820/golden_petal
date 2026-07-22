import React from 'react';

const PerfectSetup = () => {
  const categories = [
    {
      title: "Bride to be\nCelebration",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#000000" stroke="none">
          <path d="M12 11c-2 0-3.5-1.5-3.5-3.5S10 4 12 4s3.5 1.5 3.5 3.5S14 11 12 11z"/>
          <path d="M5 22v-2a7 7 0 0 1 7-7h0a7 7 0 0 1 7 7v2H5z"/>
          <path d="M12 2l-1 2-2-1 1.5 2h3L15 3l-2 1-1-2z" fill="#D4AF37"/>
        </svg>
      )
    },
    {
      title: "Engagement\nVibes",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="15" r="6" stroke="#000000" fill="none"/>
          <path d="M9 9h6l-3-4-3 4z" fill="#D4AF37" stroke="#D4AF37"/>
        </svg>
      )
    },
    {
      title: "Picture Perfect\nMoments",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#000000" stroke="none">
          <path d="M21 7h-3l-2-3H8L6 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="14" r="4" fill="#FFFFFF"/>
          <circle cx="12" cy="14" r="2" fill="#000000"/>
        </svg>
      )
    },
    {
      title: "Fun &\nMemories",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#000000" stroke="none">
          <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#D4AF37"/>
          <path d="M16 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#000000"/>
          <path d="M12 16a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="#000000"/>
          <path d="M8 12v6M16 12v6M12 16v6" stroke="#000" strokeWidth="1" fill="none"/>
        </svg>
      )
    },
    {
      title: "Beautiful\nAmbience",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#000000" stroke="none">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      )
    }
  ];

  return (
    <section className="mobile-padding" style={{ backgroundColor: '#FFFFFF', padding: '4rem 1rem 6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{ height: '1px', backgroundColor: '#D4AF37', width: '60px' }}></div>
          <div style={{ margin: '0 15px', color: '#D4AF37' }}>✦</div>
          <h2 style={{ 
            fontFamily: 'Playfair Display, Georgia, serif', 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#000', 
            margin: '0 15px',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Perfect Setup For
          </h2>
          <div style={{ margin: '0 15px', color: '#D4AF37' }}>✦</div>
          <div style={{ height: '1px', backgroundColor: '#D4AF37', width: '60px' }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '2rem',
          justifyContent: 'center'
        }}>
          {categories.map((cat, i) => (
            <div key={i} style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textAlign: 'center',
            }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                border: '2px solid #D4AF37', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem',
                backgroundColor: '#FFF'
              }}>
                {cat.icon}
              </div>
              <h3 style={{ 
                fontFamily: 'Playfair Display, Georgia, serif', 
                fontSize: '1.1rem', 
                fontWeight: 600, 
                color: '#000',
                whiteSpace: 'pre-line',
                lineHeight: 1.4,
                textTransform: 'none'
              }}>
                {cat.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerfectSetup;
