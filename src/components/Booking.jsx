import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [bookingDate, setBookingDate] = useState(''); // YYYY-MM-DD
  const [durationHours, setDurationHours] = useState(1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(''); // Datetime string
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Check login on mount
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch services when component mounts
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

  // Fetch availability when Service, Date, or Duration changes
  useEffect(() => {
    if (selectedService && bookingDate && durationHours) {
      const fetchAvailability = async () => {
        setSlotsLoading(true);
        setSelectedSlot(''); // Reset slot selection
        try {
          const response = await fetch(`https://golden-petal.in/backend/get_availability.php?service_id=${selectedService}&date=${bookingDate}&duration_hours=${durationHours}`);
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
  }, [selectedService, bookingDate, durationHours]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    if (!userString) {
      setError('You must be logged in to make a booking.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!selectedSlot) {
      setError('Please select an available time slot.');
      return;
    }

    const user = JSON.parse(userString);
    setLoading(true);

    try {
      const response = await fetch('https://golden-petal.in/backend/create_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: user.id, 
          service_id: selectedService, 
          booking_date: selectedSlot,
          duration_hours: durationHours
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setMessage('Booking Confirmed! Check your email for details.');
        // Reset form
        setSelectedService('');
        setBookingDate('');
        setDurationHours(1);
        setSelectedSlot('');
        setAvailableSlots([]);
      } else {
        setError(data.message || 'Failed to create booking.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // Calculate current dynamic price
  const currentService = services.find(s => s.id === parseInt(selectedService));
  const dynamicPrice = currentService ? currentService.price * durationHours : 0;

  // Get today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div id="booking-page-brutalist" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', border: '4px solid #000', backgroundColor: '#FFF', padding: '3rem', position: 'relative', boxShadow: '8px 8px 0px #000' }}>
        
        <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '30px', height: '30px', backgroundColor: '#D4AF37', border: '2px solid #000' }}></div>

        <h1 className="title-display" style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '1rem', color: '#000', textAlign: 'center' }}>
          RESERVE<br />YOUR SPOT.
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#000', textAlign: 'center', marginBottom: '2rem' }}>
          Select a service, date, and duration below to see available slots.
        </p>

        {error && (
          <div style={{ backgroundColor: '#ffcccc', border: '2px solid red', padding: '10px', color: 'red', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ backgroundColor: '#ccffcc', border: '2px solid green', padding: '10px', color: 'green', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleBooking}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Select Service <span style={{ color: '#D4AF37' }}>*</span></label>
            <select 
              required
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000', cursor: 'pointer' }}
            >
              <option value="" disabled>-- Choose an option --</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} (Base Price: ${service.price}/hr)
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Date <span style={{ color: '#D4AF37' }}>*</span></label>
              <input 
                type="date" 
                required
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000' }} 
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Duration <span style={{ color: '#D4AF37' }}>*</span></label>
              <select 
                required
                value={durationHours}
                onChange={(e) => setDurationHours(parseInt(e.target.value))}
                style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000', cursor: 'pointer' }}
              >
                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
                <option value={3}>3 Hours</option>
              </select>
            </div>
          </div>

          {selectedService && bookingDate && (
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem', color: '#000' }}>
                Available Slots <span style={{ color: '#D4AF37' }}>*</span>
              </label>
              
              {slotsLoading ? (
                <p>Loading slots...</p>
              ) : availableSlots.length > 0 ? (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {availableSlots.map(slot => (
                    <div 
                      key={slot.datetime}
                      onClick={() => setSelectedSlot(slot.datetime)}
                      style={{
                        padding: '15px',
                        border: '3px solid #000',
                        backgroundColor: selectedSlot === slot.datetime ? '#D4AF37' : '#FFF',
                        color: selectedSlot === slot.datetime ? '#FFF' : '#000',
                        fontWeight: 700,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {slot.display}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'red', fontWeight: 700 }}>No slots available for this date/duration.</p>
              )}
            </div>
          )}

          {currentService && (
            <div style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 800, textAlign: 'center' }}>
              Total Price: <span style={{ color: '#D4AF37' }}>${dynamicPrice.toFixed(2)}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || !selectedSlot}
            style={{ width: '100%', backgroundColor: '#000', color: '#FFF', border: '2px solid #000', padding: '15px 0', fontSize: '1.3rem', fontWeight: 800, cursor: (loading || !selectedSlot) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
          >
            {loading ? 'Confirming...' : 'CONFIRM BOOKING →'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Booking;
