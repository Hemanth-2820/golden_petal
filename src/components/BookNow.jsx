import React from 'react';

const BookNow = () => {
  return (
    <section className="mobile-padding" id="book-now" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
      <h2 className="title-display mobile-text-clamp" style={{ fontSize: '6rem', marginBottom: '2rem' }}>READY TO CELEBRATE?</h2>
      <p style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
        Book your slot today and let us make your moments unforgettable. Slots fill up fast!
      </p>
      <button className="btn-primary" style={{ fontSize: '1.8rem', padding: '20px 60px' }}>
        BOOK NOW ➔
      </button>
    </section>
  );
};

export default BookNow;
