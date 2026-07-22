import React from 'react';

const EventCategories = () => {
  const categories = [
    {
      title: "Birthday\nParties",
      icon: (
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path>
          <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path>
          <path d="M2 21h20"></path>
          <path d="M7 8v3"></path>
          <path d="M12 8v3"></path>
          <path d="M17 8v3"></path>
          <path d="M7 4h.01"></path>
          <path d="M12 4h.01"></path>
          <path d="M17 4h.01"></path>
        </svg>
      )
    },
    {
      title: "Couple\nSurprise Entry",
      icon: (
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 14c-2 0-3.5-1.5-3.5-3.5S10 7 12 7s3.5 1.5 3.5 3.5S14 14 12 14z"/>
          <path d="M5 22v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/>
          <path d="M8 5a3 3 0 0 0-6 0c0 2 3 4 6 5 3-1 6-3 6-5a3 3 0 0 0-6 0"/>
        </svg>
      )
    },
    {
      title: "Baby\nShower",
      icon: (
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="20" r="2"/>
          <circle cx="18" cy="20" r="2"/>
          <path d="M4 4h3l2.5 10h9.5M16 14a6 6 0 0 0-12 0"/>
          <path d="M7 8l3-6h6a6 6 0 0 1 6 6v6"/>
        </svg>
      )
    },
    {
      title: "Anniversary\nCelebration",
      icon: (
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="16" r="5"/>
          <circle cx="15" cy="16" r="5"/>
          <path d="M9 11l3-4 3 4"/>
          <path d="M12 7l1-2-2-1-1 2z"/>
        </svg>
      )
    },
    {
      title: "Bride\nTo Be",
      icon: (
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          <path d="M7 21c0-4 3-7 5-7s5 3 5 7"/>
          <path d="M15 11c3 2 4 6 4 10M9 11c-3 2-4 6-4 10"/>
        </svg>
      )
    },
    {
      title: "Groom\nTo Be",
      icon: (
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          <path d="M6 22c0-4 4-6 6-6s6 2 6 6"/>
          <path d="M12 16l-2 2 2 2 2-2z"/>
          <path d="M12 20v2"/>
        </svg>
      )
    }
  ];

  return (
    <section className="mobile-padding" style={{ backgroundColor: '#FFFFFF', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '1rem',
          justifyContent: 'center'
        }}>
          {categories.map((cat, i) => (
            <div key={i} style={{ 
              backgroundColor: '#FFF',
              borderRadius: '12px',
              padding: '2.5rem 1rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.5)',
              minHeight: '220px'
            }}>
              <div style={{ marginBottom: '1.5rem', flex: 1, display: 'flex', alignItems: 'center' }}>
                {cat.icon}
              </div>
              <h3 style={{ 
                fontFamily: 'Playfair Display, Georgia, serif', 
                fontSize: '1rem', 
                fontWeight: 600, 
                color: '#000',
                whiteSpace: 'pre-line',
                lineHeight: 1.4,
                marginBottom: '1rem',
                textTransform: 'none'
              }}>
                {cat.title}
              </h3>
              <div style={{ width: '24px', height: '2px', backgroundColor: '#D4AF37' }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
