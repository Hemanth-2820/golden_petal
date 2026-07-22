import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111', color: '#F8F6F0', padding: '6rem 2rem 2rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          
          {/* Column 1: EXPLORE */}
          <div>
            <h4 style={{ color: '#D7F16C', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
              EXPLORE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <Link to="/" style={{ color: '#F8F6F0', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, transition: 'color 0.2s' }}>Home</Link>
              <Link to="/gallery" style={{ color: '#F8F6F0', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, transition: 'color 0.2s' }}>Gallery</Link>
              <Link to="/addons" style={{ color: '#F8F6F0', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, transition: 'color 0.2s' }}>Add-Ons</Link>
              <Link to="/events" style={{ color: '#F8F6F0', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, transition: 'color 0.2s' }}>Events</Link>
              <Link to="/about" style={{ color: '#F8F6F0', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, transition: 'color 0.2s' }}>About</Link>
              <Link to="/contact" style={{ color: '#F8F6F0', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, transition: 'color 0.2s' }}>Contact</Link>
            </div>
          </div>

          {/* Column 2: FIND US */}
          <div>
            <h4 style={{ color: '#D7F16C', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
              FIND US
            </h4>
            <div style={{ color: '#F8F6F0', fontSize: '1.1rem', lineHeight: '1.6', fontWeight: 500 }}>
              Karunadham Complex, KSR Road<br/>
              Near City Centre, Hampankatta<br/>
              Mangaluru, Karnataka 575001<br/>
              <br/>
              Open Every Day<br/>
              10:00 AM – 10:00 PM
            </div>
          </div>

          {/* Column 3: FOLLOW */}
          <div>
            <h4 style={{ color: '#D7F16C', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
              FOLLOW
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Instagram */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', border: '2px solid #F8F6F0', color: '#F8F6F0', textDecoration: 'none', transition: 'background-color 0.2s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', border: '2px solid #F8F6F0', color: '#F8F6F0', textDecoration: 'none', transition: 'background-color 0.2s' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Text */}
        <div style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '1px' }}>
          © {new Date().getFullYear()} Golden Petal • All rights reserved
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
