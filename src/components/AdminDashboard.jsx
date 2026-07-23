import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2500); // Auto close after 2.5s
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

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = (b.customer_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                          (b.customer_email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          b.booking_id.toString().includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        ) : (
          <>
            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Search by name, email, or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: '1', minWidth: '250px', padding: '12px', border: '2px solid #000', fontSize: '1.1rem' }}
              />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '12px', border: '2px solid #000', fontSize: '1.1rem', fontWeight: 700, backgroundColor: '#FFF', minWidth: '200px' }}
              >
                <option value="all">ALL STATUSES</option>
                <option value="pending">PENDING</option>
                <option value="confirmed">CONFIRMED</option>
                <option value="cancelled">CANCELLED</option>
              </select>
            </div>

            {filteredBookings.length === 0 ? (
              <div style={{ border: '4px solid #000', padding: '3rem', backgroundColor: '#FFF', boxShadow: '8px 8px 0px #000' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>No bookings found matching your search.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', border: '4px solid #000', boxShadow: '8px 8px 0px #000', backgroundColor: '#FFF' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
              <thead>
                <tr style={{ backgroundColor: '#000', color: '#FFF' }}>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>ID</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Customer</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Guests</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Service</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Add-ons</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Date & Time</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Duration</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Price</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Payment Proof</th>
                  <th style={{ padding: '15px', fontWeight: 800, borderBottom: '2px solid #000' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => {
                  const bookingDate = new Date(booking.booking_date);
                  const formattedDate = bookingDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                  const formattedTime = bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <tr key={booking.booking_id} style={{ borderBottom: '1px solid #CCC', backgroundColor: index % 2 === 0 ? '#FFF' : '#F8F8F8' }}>
                      <td style={{ padding: '15px', fontWeight: 700 }}>#{booking.booking_id}</td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: 700 }}>{booking.customer_name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{booking.customer_phone || booking.customer_email}</div>
                      </td>
                      <td style={{ padding: '15px', fontWeight: 600 }}>{booking.guests || 1}</td>
                      <td style={{ padding: '15px', fontWeight: 600 }}>{booking.service_name}</td>
                      <td style={{ padding: '15px', fontSize: '0.85rem' }}>
                        {booking.addons ? booking.addons : <span style={{ color: '#999' }}>None</span>}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: 700 }}>{formattedDate}</div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{formattedTime}</div>
                      </td>
                      <td style={{ padding: '15px', fontWeight: 600 }}>{booking.duration_hours} hr(s)</td>
                      <td style={{ padding: '15px', fontWeight: 800, color: '#D4AF37' }}>${parseFloat(booking.total_price).toFixed(2)}</td>
                      <td style={{ padding: '15px' }}>
                        {booking.payment_screenshot ? (
                          <a href={`https://golden-petal.in/${booking.payment_screenshot}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', fontWeight: 600 }}>View Proof</a>
                        ) : (
                          <span style={{ color: '#999' }}>N/A</span>
                        )}
                      </td>
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
          </>
        )}
        
        {/* SUCCESS POPUP MODAL */}
        {showSuccessPopup && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '1rem' }}>
            <div className="brutalist-card" style={{ backgroundColor: '#FFF', padding: '3rem 2rem', textAlign: 'center', border: '6px solid #D4AF37', maxWidth: '400px', width: '100%', boxShadow: '12px 12px 0px #000' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
              <h2 className="title-display" style={{ fontSize: '2.5rem', color: '#D4AF37', marginBottom: '1rem', lineHeight: 1 }}>UPDATED!</h2>
              <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>
                Booking status was successfully changed.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
