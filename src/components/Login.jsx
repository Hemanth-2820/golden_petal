import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Point this to your BigRock domain API when deployed (e.g., https://yourdomain.com/api/login.php)
      const response = await fetch('https://golden-petal.in/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Save the token and user info (you could use context/redux here)
        localStorage.setItem('booking_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/events'); // Redirect to booking page after login
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page-brutalist" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '500px', width: '100%', border: '4px solid #000', backgroundColor: '#FFF', padding: '3rem', position: 'relative', boxShadow: '8px 8px 0px #000' }}>
        
        {/* Decorative corner accent */}
        <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '30px', height: '30px', backgroundColor: '#D4AF37', border: '2px solid #000' }}></div>

        <h1 className="title-display" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '1rem', color: '#000', textAlign: 'center' }}>
          WELCOME<br />BACK.
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 500, color: '#000', textAlign: 'center', marginBottom: '2rem' }}>
          Enter your details to manage bookings.
        </p>

        {error && (
          <div style={{ backgroundColor: '#ffcccc', border: '2px solid red', padding: '10px', color: 'red', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Email Address <span style={{ color: '#D4AF37' }}>*</span></label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000' }} 
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Password <span style={{ color: '#D4AF37' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000', paddingRight: '50px' }} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', backgroundColor: '#000', color: '#FFF', border: '2px solid #000', padding: '15px 0', fontSize: '1.3rem', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
          >
            {loading ? 'Logging in...' : 'LOGIN TO ACCOUNT →'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 600, fontSize: '1.1rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#D4AF37', textDecoration: 'underline' }}>Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
