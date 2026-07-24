import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      const userString = localStorage.getItem('user');
      if (!userString) {
        navigate('/login');
        return;
      }
      
      const parsedUser = JSON.parse(userString);
      setUser(parsedUser);

      try {
        const response = await fetch(`https://golden-petal.in/backend/my_bookings.php?user_id=${parsedUser.id}`);
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          setBookings(data.data);
        } else {
          setError(data.message || 'Failed to fetch bookings.');
        }
      } catch (err) {
        setError('Network error. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [navigate]);

  return (
    <div id="my-bookings-page" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', minHeight: '80vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <h1 className="title-display" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '2rem', color: '#000', textAlign: 'center', textTransform: 'uppercase' }}>
          WELCOME,<br />{user ? user.name : 'GUEST'}!
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button 
            onClick={() => navigate('/events')}
            style={{ backgroundColor: '#D4AF37', color: '#FFF', border: '3px solid #000', padding: '10px 20px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
          >
            BOOK AN EVENT →
          </button>
          <button 
            onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}
            style={{ backgroundColor: '#000', color: '#FFF', border: '3px solid #D4AF37', padding: '10px 20px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
          >
            LOGOUT
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#ffcccc', border: '2px solid red', padding: '10px', color: 'red', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div style={{ border: '4px solid #000', padding: '3rem', textAlign: 'center', backgroundColor: '#FFF', boxShadow: '8px 8px 0px #000' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '2rem' }}>You don't have any bookings yet.</p>
            <button 
              onClick={() => navigate('/events')}
              style={{ backgroundColor: '#D4AF37', color: '#FFF', border: '3px solid #000', padding: '15px 30px', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
            >
              BOOK NOW →
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {bookings.map(booking => {
              const bookingDate = new Date(booking.booking_date);
              const formattedDate = bookingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
              const formattedTime = bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={booking.booking_id} style={{ border: '4px solid #000', backgroundColor: '#FFF', position: 'relative', boxShadow: '8px 8px 0px #000', display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Status Banner */}
                  <div style={{ backgroundColor: booking.status === 'confirmed' ? '#D4AF37' : (booking.status === 'pending' ? '#DDD' : 'red'), padding: '10px 20px', borderBottom: '4px solid #000', fontWeight: 900, textTransform: 'uppercase', color: booking.status === 'pending' ? '#000' : '#FFF' }}>
                    {booking.status}
                  </div>

                  <div style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#000' }}>{booking.service_name}</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <div>
                        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 800, color: '#666', marginBottom: '0.2rem' }}>Date</p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{formattedDate}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 800, color: '#666', marginBottom: '0.2rem' }}>Start Time</p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{formattedTime}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 800, color: '#666', marginBottom: '0.2rem' }}>Duration</p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{booking.duration_hours} Hour(s)</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 800, color: '#666', marginBottom: '0.2rem' }}>Total Price</p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#D4AF37' }}>₹{parseFloat(booking.total_price).toFixed(2)}</p>
                      </div>
                      {booking.addons && (
                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px dashed #EEE' }}>
                          <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 800, color: '#666', marginBottom: '0.5rem' }}>Add-ons Selected</p>
                          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{booking.addons}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
