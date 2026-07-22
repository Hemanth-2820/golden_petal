import React from 'react';

const Highlights = () => {
  return (
    <section className="mobile-padding" id="highlights">
      <h2 className="section-title">HIGHLIGHTS & RULES</h2>
      <div className="grid-auto-fit">
        
        <div className="momo-panel">
          <h3 className="title-display mobile-text-clamp" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>PACKAGES</h3>
          <p style={{ fontWeight: 700, marginBottom: '1rem' }}>Up to 8 Guests (*Above 8 members Rs. 100/head)</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ background: 'var(--accent-gold)', padding: '15px', borderRadius: '10px', fontWeight: 700, fontFamily: 'Oswald', fontSize: '1.2rem' }}>RS. 999/- (60 MINS)</li>
            <li style={{ background: 'var(--accent-gold)', padding: '15px', borderRadius: '10px', fontWeight: 700, fontFamily: 'Oswald', fontSize: '1.2rem' }}>RS. 1599/- (90 MINS)</li>
            <li style={{ background: 'var(--accent-gold)', padding: '15px', borderRadius: '10px', fontWeight: 700, fontFamily: 'Oswald', fontSize: '1.2rem' }}>RS. 1999/- (2 HOURS)</li>
          </ul>
        </div>

        <div className="momo-panel-dark">
          <h3 className="title-display mobile-text-clamp" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>NOT ALLOWED</h3>
          <p style={{ marginBottom: '1.5rem' }}>To ensure everyone enjoys safely, these are strictly prohibited inside the studio:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ border: '2px solid var(--accent-gold)', padding: '8px 15px', borderRadius: '20px', fontWeight: 600 }}>Fireworks / Sparkles</span>
            <span style={{ border: '2px solid var(--accent-gold)', padding: '8px 15px', borderRadius: '20px', fontWeight: 600 }}>Outside Food</span>
            <span style={{ border: '2px solid var(--accent-gold)', padding: '8px 15px', borderRadius: '20px', fontWeight: 600 }}>Color Smoke / Powders</span>
            <span style={{ border: '2px solid var(--accent-gold)', padding: '8px 15px', borderRadius: '20px', fontWeight: 600 }}>Smoking / Alcohol</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Highlights;
