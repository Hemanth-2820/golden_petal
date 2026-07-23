import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('https://golden-petal.in/backend/forgot_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setMessage(data.message);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="forgot-password-page" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '500px', width: '100%', border: '4px solid #000', backgroundColor: '#FFF', padding: '3rem', position: 'relative', boxShadow: '8px 8px 0px #000' }}>
        
        <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '30px', height: '30px', backgroundColor: '#D4AF37', border: '2px solid #000' }}></div>

        <h1 className="title-display" style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '1rem', color: '#000', textAlign: 'center' }}>
          FORGOT<br />PASSWORD.
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#000', textAlign: 'center', marginBottom: '2rem' }}>
          Enter your email and we'll send you a link to reset your password.
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
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#000' }}>Email Address <span style={{ color: '#D4AF37' }}>*</span></label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '15px', border: '2px solid #000', fontSize: '1.1rem', backgroundColor: '#FFFFFF', color: '#000' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', backgroundColor: '#000', color: '#FFF', border: '2px solid #000', padding: '15px 0', fontSize: '1.3rem', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}
          >
            {loading ? 'Sending...' : 'SEND RESET LINK →'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 600, fontSize: '1.1rem' }}>
          Remembered it? <Link to="/login" style={{ color: '#D4AF37', textDecoration: 'underline' }}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
