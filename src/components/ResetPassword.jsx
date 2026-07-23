import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://golden-petal.in/backend/reset_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setMessage('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="reset-password-page" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '500px', width: '100%', border: '4px solid #000', backgroundColor: '#FFF', padding: '3rem', position: 'relative', boxShadow: '-8px 8px 0px #000' }}>
        
        <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '30px', height: '30px', backgroundColor: '#D4AF37', border: '2px solid #000' }}></div>

        <h1 className="title-display" style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '1rem', color: '#000', textAlign: 'center' }}>
          NEW<br />PASSWORD.
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#000', textAlign: 'center', marginBottom: '2rem' }}>
          Please enter your new password below.
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>New Password <span style={{ color: '#D4AF37' }}>*</span></label>
            <input 
              type="password" 
              required
              minLength={6}
              disabled={!token}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000' }} 
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Confirm Password <span style={{ color: '#D4AF37' }}>*</span></label>
            <input 
              type="password" 
              required
              minLength={6}
              disabled={!token}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !token}
            style={{ width: '100%', backgroundColor: '#D4AF37', color: '#FFF', border: '2px solid #000', padding: '15px 0', fontSize: '1.3rem', fontWeight: 800, cursor: (loading || !token) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', boxShadow: '4px 4px 0px #000' }}
          >
            {loading ? 'Updating...' : 'UPDATE PASSWORD →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
