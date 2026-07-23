import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminBookings = async () => {
      const userString = localStorage.getItem('user');
      if (!userString) {
        navigate('/login');
        return;
      }
      
      const parsedUser = JSON.parse(userString);
      if (parsedUser.role !== 'admin') {
        navigate('/my-bookings');
        return;
      }
      
      setUser(parsedUser);

      try {
        const response = await fetch(`https://golden-petal.in/backend/admin_get_all_bookings.php?user_id=${parsedUser.id}`);
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

    fetchAdminBookings();
  }, [navigate]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch('https://golden-petal.in/backend/admin_update_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          booking_id: bookingId,
          status: newStatus
        })
      });
      
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        // Update local state
        setBookings(bookings.map(b => b.booking_id === bookingId ? { ...b, status: newStatus } : b));
        alert('Status updated successfully!');
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Network error while updating status');
    }
  };

  if (!user || user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  // Calculate some basic stats
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + parseFloat(b.total_price) : sum, 0);
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div id="admin-dashboard-page" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', minHeight: '80vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h1 className="title-display" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '2rem', color: '#000' }}>
          ADMIN<br />DASHBOARD.
        </h1>

        {/* Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ border: '4px solid #000', backgroundColor: '#FFF', padding: '2rem', boxShadow: '8px 8px 0px #000' }}>
            <p style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: '0.5rem' }}>Total Revenue (Active)</p>
            <p style={{ fontSize: '3rem', fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>${totalRevenue.toFixed(2)}</p>
          </div>
          <div style={{ border: '4px solid #000', backgroundColor: '#FFF', padding: '2rem', boxShadow: '8px 8px 0px #000' }}>
            <p style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: '0.5rem' }}>Total Bookings</p>
            <p style={{ fontSize: '3rem', fontWeight: 900, color: '#000', lineHeight: 1 }}>{totalBookings}</p>
          </div>
          <div style={{ border: '4px solid #000', backgroundColor: '#FFF', padding: '2rem', boxShadow: '8px 8px 0px #000' }}>
            <p style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: '0.5rem' }}>Confirmed Events</p>
            <p style={{ fontSize: '3rem', fontWeight: 900, color: '#000', lineHeight: 1 }}>{activeBookings}</p>
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: '#ffcccc', border: '2px solid red', padding: '10px', color: 'red', fontWeight: 700, marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        {loading ? (
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Loading all bookings...</p>
        ) : bookings.length === 0 ? (
          <div style={{ border: '4px solid #000', padding: '3rem', backgroundColor: '#FFF', boxShadow: '8px 8px 0px #000' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>No bookings found in the database.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', border: '4px solid #000', boxShadow: '8px 8px 0px #000', backgroundColor: '#FFF' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#000', color: '#FFF' }}>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>ID</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Customer</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Service</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Date & Time</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Duration</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Price</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => {
                  const bookingDate = new Date(booking.booking_date);
                  const formattedDate = bookingDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                  const formattedTime = bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <tr key={booking.booking_id} style={{ borderBottom: '1px solid #CCC', backgroundColor: index % 2 === 0 ? '#FFF' : '#F8F8F8' }}>
                      <td style={{ padding: '15px', fontWeight: 700 }}>#{booking.booking_id}</td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: 700 }}>{booking.customer_name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{booking.customer_email}</div>
                      </td>
                      <td style={{ padding: '15px', fontWeight: 600 }}>{booking.service_name}</td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: 700 }}>{formattedDate}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{formattedTime}</div>
                      </td>
                      <td style={{ padding: '15px', fontWeight: 600 }}>{booking.duration_hours} hr(s)</td>
                      <td style={{ padding: '15px', fontWeight: 800, color: '#D4AF37' }}>${parseFloat(booking.total_price).toFixed(2)}</td>
                      <td style={{ padding: '15px' }}>
                        <select 
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.booking_id, e.target.value)}
                          style={{ 
                            padding: '8px', 
                            border: '2px solid #000', 
                            fontWeight: 800, 
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            backgroundColor: booking.status === 'confirmed' ? '#D4AF37' : (booking.status === 'cancelled' ? '#FFCCCC' : '#FFF'),
                            color: booking.status === 'confirmed' ? '#FFF' : '#000'
                          }}
                        >
                          <option value="pending">PENDING</option>
                          <option value="confirmed">CONFIRMED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
