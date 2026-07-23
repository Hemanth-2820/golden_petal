import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoldParticles from './GoldParticles';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname === '/admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('booking_token');
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#000000',
      borderBottom: '2px solid #000',
      padding: '1rem 2rem',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <GoldParticles />
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', zIndex: 1001 }}>
          <img src="/logo.png" alt="Golden Petal Logo" style={{ height: '50px', width: 'auto' }} className="nav-logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'none', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {isAdminPage ? (
            <>
              <Link to="/events" className="nav-link" style={{ fontWeight: 700 }}>RETURN TO SITE</Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#FFF', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Oswald', cursor: 'pointer' }}>LOGOUT</button>
            </>
          ) : (
            <>
              <Link to="/about" className="nav-link">ABOUT</Link>
              <Link to="/events" className="nav-link">EVENTS</Link>
              <Link to="/addons" className="nav-link">ADD-ONS</Link>
              <Link to="/testimonials" className="nav-link">TESTIMONIALS</Link>
              <Link to="/gallery" className="nav-link">GALLERY</Link>
              <Link to="/contact" className="nav-link" style={{ fontWeight: 700 }}>CONTACT</Link>
              
              {localStorage.getItem('user') ? (
                <>
                  {JSON.parse(localStorage.getItem('user')).role === 'admin' && (
                    <Link to="/admin" style={{ backgroundColor: '#FFF', color: '#000', padding: '10px 20px', fontWeight: 900, textDecoration: 'none', border: '3px solid #D4AF37', display: 'flex', alignItems: 'center' }}>ADMIN DASHBOARD</Link>
                  )}
                  <Link to="/my-bookings" style={{ fontWeight: 700, color: '#D4AF37', textDecoration: 'none' }}>MY ACCOUNT</Link>
                </>
              ) : (
                <Link to="/login" style={{ fontWeight: 700, color: '#FFF', textDecoration: 'none' }}>LOGIN</Link>
              )}

              <Link to="/events" className="flash-book-btn" onClick={() => {
                setTimeout(() => {
                  const el = document.getElementById('pick-your-event');
                  if(el) el.scrollIntoView({behavior: 'smooth'});
                }, 100);
              }} style={{ backgroundColor: '#D4AF37', color: '#000000', padding: '10px 20px', fontWeight: 900, textDecoration: 'none', border: '3px solid white', display: 'flex', alignItems: 'center' }}>BOOK</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '2rem', cursor: 'pointer', zIndex: 1001, display: 'block' }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} style={{
        position: 'absolute', top: '100%', left: 0, right: 0, background: '#000',
        borderBottom: '2px solid #000', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '1.5rem', padding: isMenuOpen ? '2rem' : '0',
        maxHeight: isMenuOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease',
        boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
      }}>
        {isAdminPage ? (
          <>
            <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>RETURN TO SITE</Link>
            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} style={{ background: 'none', border: 'none', color: '#FFF', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Oswald', cursor: 'pointer' }}>LOGOUT</button>
          </>
        ) : (
          <>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
            <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>EVENTS</Link>
            <Link to="/addons" className="nav-link" onClick={() => setIsMenuOpen(false)}>ADD-ONS</Link>
            <Link to="/testimonials" className="nav-link" onClick={() => setIsMenuOpen(false)}>TESTIMONIALS</Link>
            <Link to="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>GALLERY</Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 700 }}>CONTACT</Link>
            
            {localStorage.getItem('user') ? (
              <>
                {JSON.parse(localStorage.getItem('user')).role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{ backgroundColor: '#FFF', color: '#000', padding: '10px 20px', fontWeight: 900, textDecoration: 'none', border: '3px solid #D4AF37', display: 'flex', alignItems: 'center' }}>ADMIN DASHBOARD</Link>
                )}
                <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 700, color: '#D4AF37', textDecoration: 'none' }}>MY ACCOUNT</Link>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 700, color: '#FFF', textDecoration: 'none' }}>LOGIN</Link>
            )}

            <Link to="/events" className="flash-book-btn" onClick={() => {
              setIsMenuOpen(false);
              setTimeout(() => {
                const el = document.getElementById('pick-your-event');
                if(el) el.scrollIntoView({behavior: 'smooth'});
              }, 100);
            }} style={{ backgroundColor: '#D4AF37', color: '#000000', padding: '10px 20px', fontWeight: 900, textDecoration: 'none', border: '3px solid white', display: 'flex', alignItems: 'center' }}>BOOK</Link>
          </>
        )}
      </div>

      <style>{`
        .nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 1.1rem;
          color: #FFFFFF;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #D4AF37;
        }
        @keyframes flashEffect {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .flash-book-btn {
          animation: flashEffect 1.5s infinite ease-in-out;
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
