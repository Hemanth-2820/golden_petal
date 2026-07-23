import React, { useState } from 'react';

const ContactUs = () => {
  const [category, setCategory] = useState('GENERAL');

  return (
    <div id="contact-page-brutalist">
      {/* 1. Hero Section */}
      <section className="mobile-padding" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', padding: '6rem 2rem 4rem', borderBottom: '2px solid #000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, marginBottom: '1.5rem', color: '#000', letterSpacing: '-2px' }}>
            GOT A<br />QUESTION.
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '4rem', color: '#000' }}>
            Quick answers below. Phone, email, and the form catch everything else.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', borderTop: '2px solid transparent' }}>
            <div>
              <div style={{ fontWeight: 700, letterSpacing: '2px', fontSize: '0.8rem', color: '#000', marginBottom: '0.5rem' }}>CALL US</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, textDecoration: 'underline', marginBottom: '0.5rem', color: '#000' }}>+91 9611115040</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, textDecoration: 'underline', color: '#000' }}>+91 7899426055</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, letterSpacing: '2px', fontSize: '0.8rem', color: '#000', marginBottom: '0.5rem' }}>EMAIL US</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, textDecoration: 'underline', color: '#000', marginBottom: '0.5rem' }}>goldencelebration2026@gmail.com</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ backgroundColor: '#D4AF37', border: '2px solid #000', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#000' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#000', borderRadius: '50%', display: 'inline-block' }}></span>
                OPEN NOW
              </div>
              <div style={{ color: '#000' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Karunadham Complex, KSR Road</div>
                <div style={{ color: '#000', fontSize: '1rem', fontWeight: 500 }}>Near City Centre, Hampankatta,<br />Mangalore</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '3rem', border: '4px solid #000', height: '400px', backgroundColor: '#FFF' }}>
            <iframe 
              src="https://maps.google.com/maps?q=Karunadham+Complex,+KSR+Road,+Mangaluru&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 2. Shortcuts Section */}
      <section className="mobile-padding" style={{ backgroundColor: '#D4AF37', padding: '6rem 2rem', color: '#FFF', borderBottom: '2px solid #000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#FFF' }}>
            ▼ SHORTCUTS
          </div>
          <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '3rem', color: '#FFF' }}>
            LOOKING FOR THIS?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🎟️', title: 'BOOKINGS +\nRATES.', desc: 'Packages, group rates, what\'s included.' },
              { icon: '✨', title: 'ADD-ONS +\nEXTRAS.', desc: 'Fog entry, candles, luxury decor.' },
              { icon: '📍', title: 'HOURS +\nPARKING.', desc: 'Opening times, parking availability.' }
            ].map((card, i) => (
              <div key={i} style={{ backgroundColor: '#FFF', color: '#000', border: '4px solid #000', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '250px', boxShadow: '8px 8px 0px #000', cursor: 'pointer' }} className="shortcut-card">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
                <div style={{ position: 'absolute', top: '2rem', right: '2rem', fontSize: '1.5rem' }}>→</div>
                <h3 className="title-display mobile-text-clamp" style={{ fontSize: '2rem', lineHeight: 1.1, marginBottom: '1rem', whiteSpace: 'pre-line' }}>{card.title}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#000', marginTop: 'auto' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Most Asked Section */}
      <section className="dotted-bg mobile-padding" style={{ backgroundColor: '#FFFFFF', padding: '6rem 2rem', borderBottom: '2px solid #000' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#D4AF37' }}>
            ♥ MOST ASKED
          </div>
          <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '3rem', color: '#000' }}>
            THE COMMON ONES.
          </h2>

          <div style={{ backgroundColor: '#FFF', border: '4px solid #000', padding: '1rem 3rem' }}>
            {[
              { q: 'WHAT ARE YOUR HOURS?', a: 'Open every day. 10AM–10PM.' },
              { q: 'WHERE DO I PARK?', a: 'Parking is available in the complex.' },
              { q: 'ARE DEPOSITS REFUNDABLE?', a: 'Deposits are non-refundable but can be rescheduled up to 48 hours before your visit.' },
              { q: 'IS THE VENUE ACCESSIBLE?', a: 'Yes. Wheelchair access throughout, seating in every main area.' },
              { q: 'DO YOU HOST SURPRISE PARTIES?', a: 'Yes. We specialize in them. Visit our events page and reach out to us so we can assist you.' }
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: i === 4 ? 'none' : '2px solid #FFF', padding: '2rem 0' }}>
                <h3 className="title-display mobile-text-clamp" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000' }}>{faq.q}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#000' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Form Section */}
      <section className="mobile-padding" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', padding: '6rem 2rem 8rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#D4AF37' }}>
            ♥ EVERYTHING ELSE.
          </div>
          <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 0.9, marginBottom: '1.5rem', color: '#000' }}>
            SOMETHING ELSE ON<br />YOUR MIND.
          </h2>
          <p style={{ fontSize: '1.3rem', fontWeight: 500, fontStyle: 'italic', color: '#000', marginBottom: '3rem' }}>
            Pick a category. We'll point you to a faster path if there is one.
          </p>

          <div style={{ border: '4px solid #000', padding: '3rem', backgroundColor: '#FFF' }}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem', color: '#000' }}>Category <span style={{ color: '#D4AF37' }}>*</span></label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {['GENERAL', 'BOOKING ISSUE', 'PARTNERSHIP / VENDOR', 'OTHER'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: category === cat ? '#000' : '#FFF',
                      color: category === cat ? '#FFF' : '#000',
                      border: '2px solid #000',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Name <span style={{ color: '#D4AF37' }}>*</span></label>
              <input type="text" style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000' }} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Email <span style={{ color: '#D4AF37' }}>*</span></label>
              <input type="email" style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000' }} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Message <span style={{ color: '#D4AF37' }}>*</span></label>
              <textarea rows="5" style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', resize: 'vertical', color: '#000' }}></textarea>
            </div>

            <button style={{ backgroundColor: '#D4AF37', color: '#FFF', border: '2px solid #000', padding: '15px 40px', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', display: 'inline-block', boxShadow: '4px 4px 0px #000' }}>
              SUBMIT
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;
