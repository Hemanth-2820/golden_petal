import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--text-black-green)', color: 'var(--bg-cream)', padding: '4rem 2rem', textAlign: 'center' }}>
      <img src="/logo.png" alt="Golden Petal Logo" style={{ height: '80px', width: 'auto', marginBottom: '1.5rem' }} />
      <p style={{ fontWeight: 500, opacity: 0.7 }}>© {new Date().getFullYear()} Golden Petal. Make your moments unforgettable.</p>
    </footer>
  );
};

export default Footer;
