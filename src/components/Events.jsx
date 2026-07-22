import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
    slot: ''
  });

  const handlePathClick = (path) => {
    setSelectedPath(path);
    setBookingStep(1);
    // Scroll to booking section smoothly
    setTimeout(() => {
      const el = document.getElementById('booking-flow');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNextStep = () => {
    setBookingStep(prev => Math.min(prev + 1, 3));
  };

  const availableSlots = [
    '10:00 AM - 11:00 AM',
    '11:30 AM - 12:30 PM',
    '01:00 PM - 02:00 PM',
    '02:30 PM - 03:30 PM',
    '04:00 PM - 05:00 PM',
    '05:30 PM - 06:30 PM'
  ];

  const eventData = {
    'BIRTHDAY': {
      title: 'BIRTHDAY PARTIES.',
      desc: 'Make every birthday unforgettable with beautiful decor and perfect ambience.',
      color: '#B81387',
      image: '/birthday.png',
      quote: 'The birthday setup was magical! Beautiful decorations and perfectly hassle-free.'
    },
    'COUPLE SURPRISE': {
      title: 'COUPLE SURPRISE.',
      desc: 'Make their heart skip a beat with a romantic setup and candle-lit path.',
      color: '#4CAF50',
      image: '/romantic.png',
      quote: 'A truly romantic experience! The ambiance was absolutely perfect for our surprise.'
    },
    'ANNIVERSARY': {
      title: 'ANNIVERSARY.',
      desc: 'Celebrate your journey of love and make your anniversary truly special.',
      color: '#0000FF',
      image: '/anniversary.png',
      quote: 'Elegant decor and a beautiful evening to celebrate our milestone.'
    },
    'BABY SHOWER': {
      title: 'BABY SHOWER.',
      desc: 'A precious moment deserves a beautiful celebration. Joy and beautiful memories forever.',
      color: '#E11C83',
      image: '/babyshower.png',
      quote: 'Adorable setup for our baby shower! Comfortable and picture perfect.'
    },
    'BRIDE TO BE': {
      title: 'BRIDE / GROOM TO BE.',
      desc: 'Celebrate your special journey with love, laughter & unforgettable memories.',
      color: '#FF9800',
      image: '/bridetobe.png',
      quote: 'The perfect engagement vibe. Beautiful ambience and customized decorations.'
    }
  };

  return (
    <div id="events-page">
      
      {/* 1. Hero Section */}
      <section className="dotted-bg" style={{ padding: '8rem 2rem', borderBottom: '4px solid var(--text-black-green)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem', fontSize: '1rem', opacity: 0.6, textTransform: 'uppercase' }}>
              ▼ HOST AN EVENT
            </div>
            
            <h1 className="title-display" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, marginBottom: '2rem', color: '#000000' }}>
              YOUR CELEBRATION.<br/>OUR VENUE.
            </h1>
            
            <p style={{ fontSize: '1.5rem', lineHeight: '1.6', fontWeight: 500 }}>
              Birthdays, anniversaries, couple surprises, and milestones. We clear the room. You bring the people.
            </p>
          </div>
          
          <div className="brutalist-card" style={{ flex: '1 1 400px', height: '500px', padding: 0 }}>
            <img src="/addon_fog_real.jpg" alt="Golden Petal Celebration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 2. Pick Your Path */}
      <section style={{ backgroundColor: 'var(--bg-cream)', padding: '8rem 2rem', color: '#000000', borderBottom: '4px solid var(--text-black-green)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem', fontSize: '1rem', opacity: 0.6, textTransform: 'uppercase' }}>
            ▼ CELEBRATE WITH US
          </div>
          
          <h2 className="title-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '4rem' }}>
            PICK YOUR EVENT.
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {Object.keys(eventData).map(eventKey => (
              <div key={eventKey} className="brutalist-card" onClick={() => handlePathClick(eventKey)} style={{ padding: '3rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 className="title-display" style={{ fontSize: '2.5rem', color: eventData[eventKey].color, marginBottom: '1rem' }}>
                    {eventData[eventKey].title}
                  </h3>
                  <p style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '2rem' }}>
                    {eventData[eventKey].desc}
                  </p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '2rem', marginTop: '2rem' }}>→</div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 3. Dynamic Booking Section */}
      {selectedPath && (
        <section id="booking-flow" style={{ backgroundColor: eventData[selectedPath].color, padding: '6rem 2rem', color: 'white', borderBottom: '4px solid var(--text-black-green)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem', fontSize: '1rem', opacity: 0.9, textTransform: 'uppercase' }}>
              ▼ SELECTED / {selectedPath}
            </div>
            
            <h2 className="title-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '1rem' }}>
              {selectedPath},<br/>UPGRADED.
            </h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '4rem', maxWidth: '700px' }}>
              A celebration you'll actually remember. Custom setups, logistics handled. Let's get your booking started.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
              
              {/* Left Side: Images & Quote */}
              <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="brutalist-card" style={{ padding: 0 }}>
                  <img src={eventData[selectedPath].image} alt={selectedPath} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
                </div>
                <div style={{ backgroundColor: 'white', color: 'black', padding: '2rem', border: '4px solid black' }}>
                  <div style={{ fontSize: '3rem', color: eventData[selectedPath].color, lineHeight: 1, fontWeight: 900, marginBottom: '1rem' }}>“</div>
                  <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>
                    {eventData[selectedPath].quote}
                  </p>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: '#666' }}>GOOGLE • 5 STARS</div>
                </div>
              </div>

              {/* Right Side: Brutalist Booking Form (Unchanged functionality) */}
              <div style={{ flex: '1 1 400px' }}>
                <div className="brutalist-card" style={{ padding: '3rem', backgroundColor: 'white', color: 'black' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {[1, 2, 3].map(step => (
                        <div key={step} style={{ width: '15px', height: '15px', borderRadius: '50%', border: '2px solid black', backgroundColor: step <= bookingStep ? eventData[selectedPath].color : 'transparent' }} />
                      ))}
                    </div>
                    <div style={{ backgroundColor: 'var(--accent-lime)', padding: '5px 10px', border: '2px solid black', fontWeight: 900, fontSize: '0.9rem' }}>
                      STEP {bookingStep} OF 3
                    </div>
                  </div>

                  <h3 className="title-display" style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1 }}>
                    {bookingStep === 1 ? 'TELL US ABOUT THE EVENT.' : bookingStep === 2 ? 'CHOOSE YOUR SLOT.' : 'CONFIRM & PAY.'}
                  </h3>

                  {bookingStep === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Your Name *</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '1rem', border: '3px solid black', fontSize: '1.2rem' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Phone Number *</label>
                        <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '1rem', border: '3px solid black', fontSize: '1.2rem' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Expected Guests *</label>
                        <input type="text" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} style={{ width: '100%', padding: '1rem', border: '3px solid black', fontSize: '1.2rem' }} placeholder="e.g. 15" />
                      </div>
                      <button onClick={handleNextStep} style={{ backgroundColor: 'var(--accent-lime)', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', marginTop: '1rem', width: '100%' }}>
                        NEXT →
                      </button>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Select Date *</label>
                        <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '1rem', border: '3px solid black', fontSize: '1.2rem', fontFamily: 'inherit' }} />
                      </div>
                      
                      {formData.date && (
                        <div>
                          <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', marginTop: '1rem' }}>Available Slots</label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            {availableSlots.map((slot, i) => (
                              <div key={i} onClick={() => setFormData({...formData, slot})} style={{ padding: '1rem', border: '3px solid black', backgroundColor: formData.slot === slot ? 'var(--accent-lime)' : 'white', cursor: 'pointer', fontWeight: 700, textAlign: 'center' }}>
                                {slot}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button onClick={handleNextStep} disabled={!formData.date || !formData.slot} style={{ backgroundColor: (formData.date && formData.slot) ? 'var(--accent-lime)' : '#eee', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.5rem', fontWeight: 900, cursor: (formData.date && formData.slot) ? 'pointer' : 'not-allowed', marginTop: '1rem', width: '100%' }}>
                        NEXT →
                      </button>
                      <button onClick={() => setBookingStep(1)} style={{ backgroundColor: 'transparent', color: 'black', border: 'none', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                        ← Back
                      </button>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem', alignItems: 'center' }}>
                      <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f0f0f0', padding: '1rem', border: '3px solid black' }}>
                        <div style={{ fontWeight: 700 }}>{selectedPath} EVENT</div>
                        <div>{formData.date} | {formData.slot}</div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, marginTop: '1rem' }}>₹999</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Starting Price Deposit</div>
                      </div>

                      <div style={{ width: '200px', height: '200px', border: '4px solid black', padding: '10px', backgroundColor: 'white' }}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                          <span style={{ fontSize: '3rem' }}>📱</span>
                          <span style={{ fontWeight: 900, fontSize: '0.8rem', marginTop: '10px' }}>SCAN TO PAY</span>
                        </div>
                      </div>
                      
                      <p style={{ textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Scan the QR code with any UPI app (GPay, PhonePe, Paytm) to confirm your booking.</p>

                      <button onClick={() => { alert('Booking Confirmed! (This is a frontend demo)'); setBookingStep(1); setSelectedPath(null); }} style={{ backgroundColor: 'var(--accent-lime)', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', marginTop: '1rem', width: '100%' }}>
                        I HAVE PAID
                      </button>
                      <button onClick={() => setBookingStep(2)} style={{ backgroundColor: 'transparent', color: 'black', border: 'none', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                        ← Back
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Events;
