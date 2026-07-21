import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      background: '#FFFFFF',
      borderBottom: '2px solid var(--text-dark-green)',
      padding: '1.5rem 2rem',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Golden Petal Logo" style={{ height: '70px', width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/events" className="nav-link">EVENTS</Link>
          <Link to="/addons" className="nav-link">ADD-ONS</Link>
          <Link to="/testimonials" className="nav-link">TESTIMONIALS</Link>
          <Link to="/gallery" className="nav-link">GALLERY</Link>
          <Link to="/contact" className="nav-link" style={{ color: 'var(--text-dark-green)', fontWeight: 700 }}>CONTACT</Link>
          <Link to="/events" style={{ backgroundColor: '#B81387', color: 'white', padding: '10px 20px', fontWeight: 900, textDecoration: 'none', border: '3px solid black', display: 'flex', alignItems: 'center' }}>BOOK</Link>
        </div>
      </div>
      <style>{`
        .nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 1.1rem;
          color: var(--text-black-green);
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #7b9468;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
