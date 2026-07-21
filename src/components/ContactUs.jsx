import React from 'react';

const ContactUs = () => {
  return (
    <section id="contact-us" style={{ background: 'var(--text-dark-green)', maxWidth: '100% !important', color: 'var(--bg-cream)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ color: 'var(--accent-lime)' }}>CONTACT US</h2>
        
        <div className="grid-auto-fit" style={{ alignItems: 'start' }}>
          <div className="momo-panel-dark" style={{ border: '2px solid var(--accent-lime)' }}>
            <h3 className="title-display" style={{ fontSize: '2rem', marginBottom: '2rem' }}>GET IN TOUCH</h3>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>+91 9611115040</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>+91 7899426055</div>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: '1.6' }}>
                Karunadham Complex, KSR Road,<br/>
                Near City Centre, Hampankatta,<br/>
                Mangalore
              </div>
            </div>
          </div>

          <div className="momo-panel" style={{ background: 'var(--bg-cream)', color: 'var(--text-dark-green)' }}>
            <h3 className="title-display" style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-dark-green)' }}>SEND A MESSAGE</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input type="text" placeholder="Your Name" />
              <input type="tel" placeholder="Your Phone Number" />
              <textarea placeholder="Your Message" rows="4"></textarea>
              <button type="button" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
