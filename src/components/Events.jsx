import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Events = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
    duration: 1,
    addons: [],
    payment_screenshot: ''
  });

  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const navigate = useNavigate();

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://golden-petal.in/backend/get_services.php');
        const data = await response.json();
        if (response.ok && data.status === 'success') {
          setServices(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  const eventData = {
    'BIRTHDAY': {
      title: 'BIRTHDAY PARTIES.',
      desc: 'Make every birthday unforgettable with beautiful decor and perfect ambience.',
      color: '#D4AF37',
      image: '/birthday.png',
      quote: 'The birthday setup was magical! Beautiful decorations and perfectly hassle-free.'
    },
    'COUPLE SURPRISE': {
      title: 'COUPLE SURPRISE.',
      desc: 'Make their heart skip a beat with a romantic setup and candle-lit path.',
      color: '#D4AF37',
      image: '/romantic.png',
      quote: 'A truly romantic experience! The ambiance was absolutely perfect for our surprise.'
    },
    'ANNIVERSARY': {
      title: 'ANNIVERSARY.',
      desc: 'Celebrate your journey of love and make your anniversary truly special.',
      color: '#D4AF37',
      image: '/anniversary.png',
      quote: 'Elegant decor and a beautiful evening to celebrate our milestone.'
    },
    'BABY SHOWER': {
      title: 'BABY SHOWER.',
      desc: 'A precious moment deserves a beautiful celebration. Joy and beautiful memories forever.',
      color: '#D4AF37',
      image: '/babyshower.png',
      quote: 'Adorable setup for our baby shower! Comfortable and picture perfect.'
    },
    'BRIDE TO BE': {
      title: 'BRIDE / GROOM TO BE.',
      desc: 'Celebrate your special journey with love, laughter & unforgettable memories.',
      color: '#D4AF37',
      image: '/bridetobe.png',
      quote: 'The perfect engagement vibe. Beautiful ambience and customized decorations.'
    }
  };

  const availableAddons = [
    { name: 'Photo or Video (15 mins Edit)', price: 0, suffix: '(Price as per order)' },
    { name: 'Luxury Bouquet (10 Roses)', price: 800 },
    { name: 'Candle Path', price: 500 },
    { name: 'Bubble Bliss', price: 400 },
    { name: 'Welcome Board', price: 700 },
    { name: 'Fog Entry', price: 850 },
    { name: 'Gift Hamper', price: 0, suffix: '(Cost as per order)' },
    { name: 'Cake & Cup Cakes', price: 0, suffix: '(Price as per order)' },
    { name: 'Artificial Bouquet (Rental)', price: 350 },
    { name: 'LED Number', price: 150, suffix: '(Per Number)' },
    { name: 'Message Box', price: 100 }
  ];

  // Get current service object
  const currentService = services.find(s => s.name === selectedPath);
  const basePricePerHour = currentService ? parseFloat(currentService.price) : 999;
  
  // Calculate Addons Price
  const addonsTotalPrice = formData.addons.reduce((sum, addonName) => {
    const addon = availableAddons.find(a => a.name === addonName);
    return sum + (addon ? addon.price : 0);
  }, 0);

  // Calculate Extra Guests Price (Up to 8 is free, then ₹100 per extra person)
  const numGuests = parseInt(formData.guests) || 1;
  const extraGuests = numGuests > 8 ? numGuests - 8 : 0;
  const extraGuestsCost = extraGuests * 100;

  // Total Final Price
  const finalTotalPrice = (basePricePerHour * formData.duration) + addonsTotalPrice + extraGuestsCost;

  // Fetch availability when Service, Date, or Duration changes (Step 3)
  useEffect(() => {
    if (bookingStep === 3 && currentService && formData.date && formData.duration) {
      const fetchAvailability = async () => {
        setSlotsLoading(true);
        setFormData(prev => ({ ...prev, slot: '' })); // Reset slot
        setError('');
        try {
          const response = await fetch(`https://golden-petal.in/backend/get_availability.php?service_id=${currentService.id}&date=${formData.date}&duration_hours=${formData.duration}`);
          const data = await response.json();
          if (response.ok && data.status === 'success') {
            setAvailableSlots(data.data);
          } else {
            setAvailableSlots([]);
          }
        } catch (err) {
          console.error("Failed to fetch availability", err);
          setAvailableSlots([]);
        } finally {
          setSlotsLoading(false);
        }
      };
      fetchAvailability();
    }
  }, [bookingStep, formData.date, formData.duration, currentService]);

  const handlePathClick = (path) => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
      return;
    }
    
    setSelectedPath(path);
    setBookingStep(1);
    setFormData({ ...formData, date: '', slot: '', duration: 1, addons: [], payment_screenshot: '' });
    setError('');

    // Scroll to booking section smoothly
    setTimeout(() => {
      const el = document.getElementById('booking-flow');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNextStep = () => {
    if (bookingStep === 1 && (!formData.name || !formData.phone || !formData.guests)) {
      setError('Please fill in all details.');
      return;
    }
    if (bookingStep === 3 && (!formData.date || !formData.slot)) {
      setError('Please select a date and an available slot.');
      return;
    }
    setError('');
    setBookingStep(prev => Math.min(prev + 1, 4));
    setTimeout(() => {
      const el = document.getElementById('booking-flow');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePrevStep = () => {
    setBookingStep(prev => Math.max(prev - 1, 1));
    setTimeout(() => {
      const el = document.getElementById('booking-flow');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAddonToggle = (addonName) => {
    setFormData(prev => {
      if (prev.addons.includes(addonName)) {
        return { ...prev, addons: prev.addons.filter(a => a !== addonName) };
      } else {
        return { ...prev, addons: [...prev.addons, addonName] };
      }
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('screenshot', file);

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://golden-petal.in/backend/upload_payment.php', {
        method: 'POST',
        body: formDataUpload
      });
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        setFormData(prev => ({ ...prev, payment_screenshot: data.file_path }));
      } else {
        setError(data.message || 'Failed to upload screenshot.');
      }
    } catch (err) {
      setError('Network error during upload.');
    } finally {
      setLoading(false);
    }
  };

  const submitBooking = async () => {
    setError('');
    const userString = localStorage.getItem('user');
    if (!userString) {
      setError('You must be logged in.');
      return;
    }
    
    if (!currentService) {
      setError('Service not found in database. Please run update_db.php.');
      return;
    }

    const user = JSON.parse(userString);
    setLoading(true);

    const addonsString = formData.addons.length > 0 ? formData.addons.join(', ') : '';

    try {
      const response = await fetch('https://golden-petal.in/backend/create_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: user.id, 
          service_id: currentService.id, 
          booking_date: formData.slot,
          duration_hours: formData.duration,
          addons: addonsString,
          total_price: finalTotalPrice,
          customer_phone: formData.phone,
          guests: formData.guests,
          payment_screenshot: formData.payment_screenshot
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setShowSuccessPopup(true);
      } else {
        setError(data.message || 'Failed to create booking.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div id="events-page">
      
      {/* 1. Hero Section */}
      <section className="dotted-bg mobile-padding" style={{ backgroundColor: '#000000', padding: '8rem 2rem', borderBottom: '4px solid #D4AF37' }}>
        <div className="flex-stack-mobile" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div className="mobile-w-full" style={{ flex: '1 1 500px' }}>
            <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem', fontSize: '1rem', color: '#D4AF37', textTransform: 'uppercase' }}>
              ▼ HOST AN EVENT
            </div>
            
            <h1 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9, marginBottom: '2rem', color: '#FFFFFF' }}>
              YOUR CELEBRATION.<br/>OUR VENUE.
            </h1>
            
            <p style={{ fontSize: '1.5rem', lineHeight: '1.6', fontWeight: 500, color: '#FFFFFF' }}>
              Birthdays, anniversaries, couple surprises, and milestones. We clear the room. You bring the people.
            </p>
          </div>
          
          <div className="brutalist-card mobile-w-full" style={{ flex: '1 1 400px', height: '500px', padding: 0 }}>
            <img src="/addon_fog_real.jpg" alt="Golden Petal Celebration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* 2. Pick Your Path */}
      <section id="pick-your-event" style={{ backgroundColor: 'var(--bg-white)', padding: '8rem 2rem', color: '#000000', borderBottom: '4px solid var(--text-black)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem', fontSize: '1rem', opacity: 0.6, textTransform: 'uppercase' }}>
            ▼ CELEBRATE WITH US
          </div>
          
          <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '4rem' }}>
            PICK YOUR EVENT.
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            
            {Object.keys(eventData).map(eventKey => (
              <div key={eventKey} className="brutalist-card" onClick={() => handlePathClick(eventKey)} style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '4px solid #D4AF37' }}>
                <div>
                  <h3 className="title-display mobile-text-clamp" style={{ fontSize: '2rem', color: '#D4AF37', marginBottom: '0.5rem' }}>
                    {eventData[eventKey].title}
                  </h3>
                  <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                    {eventData[eventKey].desc}
                  </p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '1.5rem', marginTop: '1rem', color: '#D4AF37' }}>→</div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 3. Dynamic Booking Section */}
      {selectedPath && (
        <section id="booking-flow" className="mobile-padding" style={{ backgroundColor: eventData[selectedPath].color, padding: '6rem 2rem', color: 'white', borderBottom: '4px solid var(--text-black)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            <div style={{ fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem', fontSize: '1rem', opacity: 0.9, textTransform: 'uppercase' }}>
              ▼ SELECTED / {selectedPath}
            </div>
            
            <h2 className="title-display mobile-text-clamp" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '1rem' }}>
              {selectedPath},<br/>UPGRADED.
            </h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '4rem', maxWidth: '700px' }}>
              A celebration you'll actually remember. Custom setups, logistics handled. Let's get your booking started.
            </p>

            <div className="flex-stack-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
              
              {/* Left Side: Images & Quote */}
              <div className="mobile-w-full" style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="brutalist-card" style={{ padding: 0 }}>
                  <img src={eventData[selectedPath].image} alt={selectedPath} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
                </div>
                <div style={{ backgroundColor: 'white', color: 'black', padding: '2rem', border: '4px solid black' }}>
                  <div style={{ fontSize: '3rem', color: eventData[selectedPath].color, lineHeight: 1, fontWeight: 900, marginBottom: '1rem' }}>“</div>
                  <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>
                    {eventData[selectedPath].quote}
                  </p>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: '#000' }}>GOOGLE • 5 STARS</div>
                </div>
              </div>

              {/* Right Side: Brutalist Booking Form */}
              <div className="mobile-w-full" style={{ flex: '1 1 400px' }}>
                <div className="brutalist-card mobile-padding" style={{ padding: '3rem', backgroundColor: 'white', color: 'black' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {[1, 2, 3, 4].map(step => (
                        <div key={step} style={{ width: '15px', height: '15px', borderRadius: '50%', border: '2px solid black', backgroundColor: step <= bookingStep ? eventData[selectedPath].color : 'transparent' }} />
                      ))}
                    </div>
                    <div style={{ backgroundColor: 'var(--accent-gold)', padding: '5px 10px', border: '2px solid black', fontWeight: 900, fontSize: '0.9rem' }}>
                      STEP {bookingStep} OF 4
                    </div>
                  </div>

                  <h3 className="title-display mobile-text-clamp" style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1 }}>
                    {bookingStep === 1 ? 'TELL US ABOUT THE EVENT.' : 
                     bookingStep === 2 ? 'DURATION & ADD-ONS.' : 
                     bookingStep === 3 ? 'CHOOSE YOUR SLOT.' : 
                     'CONFIRM & PAY.'}
                  </h3>

                  {error && (
                    <div style={{ backgroundColor: '#ffcccc', border: '2px solid red', padding: '10px', color: 'red', fontWeight: 700, marginBottom: '1rem' }}>
                      {error}
                    </div>
                  )}

                  {/* STEP 1: Basic Info */}
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
                      <button onClick={handleNextStep} style={{ backgroundColor: 'var(--accent-gold)', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer', marginTop: '1rem', width: '100%' }}>
                        NEXT →
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Duration & Addons */}
                  {bookingStep === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Duration (₹{basePricePerHour}/hr) *</label>
                        <select 
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                          style={{ width: '100%', padding: '1rem', border: '3px solid black', fontSize: '1.2rem', cursor: 'pointer', backgroundColor: '#FFF' }}
                        >
                          <option value={1}>1 Hour</option>
                          <option value={2}>2 Hours</option>
                          <option value={3}>3 Hours</option>
                          <option value={4}>4 Hours</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Select Upgrades / Add-ons</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {availableAddons.map((addon) => (
                            <label key={addon.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '2px solid black', backgroundColor: formData.addons.includes(addon.name) ? 'var(--accent-gold)' : '#FFF', cursor: 'pointer', fontWeight: 600 }}>
                              <input 
                                type="checkbox" 
                                checked={formData.addons.includes(addon.name)}
                                onChange={() => handleAddonToggle(addon.name)}
                                style={{ transform: 'scale(1.5)', marginRight: '10px' }}
                              />
                              {addon.name} 
                              <span style={{ marginLeft: 'auto', fontWeight: 800, textAlign: 'right' }}>
                                {addon.price > 0 ? `+₹${addon.price}` : ''} {addon.suffix ? <span style={{ fontSize: '0.8rem', color: '#666', display: 'block' }}>{addon.suffix}</span> : ''}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div style={{ backgroundColor: '#000', color: '#FFF', padding: '1rem', textAlign: 'center', fontWeight: 800, fontSize: '1.2rem', marginTop: '1rem' }}>
                        Subtotal: ₹{finalTotalPrice}
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={handlePrevStep} style={{ backgroundColor: '#FFF', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', flex: 1 }}>
                          ← BACK
                        </button>
                        <button onClick={handleNextStep} style={{ backgroundColor: 'var(--accent-gold)', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', flex: 2 }}>
                          NEXT →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Choose Slot */}
                  {bookingStep === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Select Date *</label>
                        <input type="date" min={today} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ width: '100%', padding: '1rem', border: '3px solid black', fontSize: '1.2rem', fontFamily: 'inherit' }} />
                      </div>
                      
                      {formData.date && (
                        <div>
                          <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', marginTop: '1rem' }}>Available Slots ({formData.duration} Hr)</label>
                          
                          {slotsLoading ? (
                             <p>Finding slots...</p>
                          ) : availableSlots.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '10px' }}>
                              {availableSlots.map((slot, i) => (
                                <div 
                                  key={i} 
                                  onClick={() => setFormData({...formData, slot: slot.datetime})} 
                                  style={{ padding: '1rem', border: '3px solid black', backgroundColor: formData.slot === slot.datetime ? 'var(--accent-gold)' : 'white', cursor: 'pointer', fontWeight: 700, textAlign: 'center' }}
                                >
                                  {slot.display}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ color: 'red', fontWeight: 800 }}>No continuous {formData.duration}-hour slots available on this date.</p>
                          )}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button onClick={handlePrevStep} style={{ backgroundColor: '#FFF', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', flex: 1 }}>
                          ← BACK
                        </button>
                        <button onClick={handleNextStep} disabled={!formData.date || !formData.slot} style={{ backgroundColor: (formData.date && formData.slot) ? 'var(--accent-gold)' : '#DDD', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.2rem', fontWeight: 900, cursor: (formData.date && formData.slot) ? 'pointer' : 'not-allowed', flex: 2 }}>
                          REVIEW →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Confirm & Pay */}
                  {bookingStep === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem', alignItems: 'center' }}>
                      
                      <div style={{ width: '100%', border: '3px solid black', backgroundColor: '#FFF' }}>
                        <div style={{ backgroundColor: '#000', color: '#FFF', padding: '10px', textAlign: 'center', fontWeight: 900 }}>
                          BOOKING SUMMARY
                        </div>
                        <div style={{ padding: '15px' }}>
                          <p style={{ margin: '5px 0', fontWeight: 700 }}>{selectedPath} EVENT</p>
                          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Date: {formData.date}</p>
                          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Duration: {formData.duration} Hr(s)</p>
                          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Guests: {numGuests} {extraGuests > 0 ? `(+₹${extraGuestsCost} Extra)` : ''}</p>
                          {formData.addons.length > 0 && (
                            <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>Add-ons: {formData.addons.join(', ')}</p>
                          )}
                        </div>
                        <div style={{ backgroundColor: 'var(--accent-gold)', padding: '15px', textAlign: 'center', borderTop: '3px solid black' }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>TOTAL AMOUNT</div>
                          <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>₹{finalTotalPrice}</div>
                        </div>
                      </div>

                      <div style={{ width: '250px', border: '4px solid black', padding: '10px', backgroundColor: 'white', textAlign: 'center' }}>
                        <img src="/qr_code.png" alt="Payment QR Code" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        <div style={{ fontWeight: 800, marginTop: '10px', fontSize: '1.1rem' }}>megsgatty35@oksbi</div>
                      </div>
                      
                      <p style={{ textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>Scan the QR code with any UPI app (GPay, PhonePe, Paytm) to confirm your booking.</p>

                      <div style={{ width: '100%', marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>Upload Payment Screenshot *</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileUpload} 
                          style={{ width: '100%', padding: '0.5rem', border: '3px solid black', fontSize: '1rem', backgroundColor: '#FFF' }}
                          disabled={loading}
                        />
                        {formData.payment_screenshot && (
                          <div style={{ marginTop: '0.5rem', color: 'green', fontWeight: 800 }}>✓ Screenshot Uploaded Successfully!</div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                        <button onClick={handlePrevStep} disabled={loading} style={{ backgroundColor: '#FFF', color: 'black', border: '4px solid black', padding: '1rem', fontSize: '1.2rem', fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer', flex: 1 }}>
                          ← BACK
                        </button>
                        <button onClick={submitBooking} disabled={loading || !formData.payment_screenshot} style={{ backgroundColor: (!formData.payment_screenshot || loading) ? '#DDD' : '#000', color: (!formData.payment_screenshot || loading) ? '#888' : 'var(--accent-gold)', border: '4px solid black', padding: '1rem', fontSize: '1.2rem', fontWeight: 900, cursor: (!formData.payment_screenshot || loading) ? 'not-allowed' : 'pointer', flex: 2 }}>
                          {loading ? 'PROCESSING...' : 'I HAVE PAID'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* SUCCESS POPUP MODAL */}
      {showSuccessPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '1rem' }}>
          <div className="brutalist-card" style={{ backgroundColor: '#FFF', padding: '3rem 2rem', textAlign: 'center', border: '6px solid #D4AF37', maxWidth: '500px', width: '100%', boxShadow: '12px 12px 0px #000' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 className="title-display" style={{ fontSize: '2.5rem', color: '#D4AF37', marginBottom: '1rem', lineHeight: 1 }}>BOOKING<br/>RECEIVED!</h2>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2rem', color: '#333' }}>
              Your event request has been successfully submitted! We are verifying your payment screenshot and will confirm your slot shortly.<br/><br/>
              Check your email for the summary.
            </p>
            <button 
              onClick={() => {
                setShowSuccessPopup(false);
                setBookingStep(1);
                setSelectedPath(null);
                navigate('/my-bookings');
              }} 
              style={{ backgroundColor: '#000', color: '#D4AF37', border: '4px solid #000', padding: '1rem', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', width: '100%', textTransform: 'uppercase' }}
            >
              GO TO MY BOOKINGS →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
