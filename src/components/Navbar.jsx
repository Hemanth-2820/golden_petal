import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{ 
      background: '#000000',
      borderBottom: '2px solid #333',
      padding: '1rem 2rem',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', zIndex: 1001 }}>
          <img src="/logo.png" alt="Golden Petal Logo" style={{ height: '50px', width: 'auto' }} className="nav-logo" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'none', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/events" className="nav-link">EVENTS</Link>
          <Link to="/addons" className="nav-link">ADD-ONS</Link>
          <Link to="/testimonials" className="nav-link">TESTIMONIALS</Link>
          <Link to="/gallery" className="nav-link">GALLERY</Link>
          <Link to="/contact" className="nav-link" style={{ fontWeight: 700 }}>CONTACT</Link>
          <Link to="/events" style={{ backgroundColor: '#B81387', color: 'white', padding: '10px 20px', fontWeight: 900, textDecoration: 'none', border: '3px solid white', display: 'flex', alignItems: 'center' }}>BOOK</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', zIndex: 1001, display: 'block' }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} style={{
        position: 'absolute', top: '100%', left: 0, right: 0, background: '#000', 
        borderBottom: '2px solid #333', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', gap: '1.5rem', padding: '2rem',
        maxHeight: isMenuOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease',
        boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
      }}>
        <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
        <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>EVENTS</Link>
        <Link to="/addons" className="nav-link" onClick={() => setIsMenuOpen(false)}>ADD-ONS</Link>
        <Link to="/testimonials" className="nav-link" onClick={() => setIsMenuOpen(false)}>TESTIMONIALS</Link>
        <Link to="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>GALLERY</Link>
        <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 700 }}>CONTACT</Link>
        <Link to="/events" onClick={() => setIsMenuOpen(false)} style={{ backgroundColor: '#B81387', color: 'white', padding: '10px 20px', fontWeight: 900, textDecoration: 'none', border: '3px solid white', display: 'flex', alignItems: 'center' }}>BOOK</Link>
      </div>

      <style>{`
        .nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 1.1rem;
          color: #F8F6F0;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #D7F16C;
        }
        @media (min-width: 1024px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
          .nav-logo {
            height: 70px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
