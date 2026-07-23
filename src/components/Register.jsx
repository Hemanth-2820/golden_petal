import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Point this to your BigRock domain API when deployed (e.g., https://yourdomain.com/api/register.php)
      const response = await fetch('https://golden-petal.in/backend/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="register-page-brutalist" style={{ backgroundColor: 'var(--bg-white, #FFFFFF)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '400px', width: '100%', border: '4px solid #000', backgroundColor: '#FFF', padding: '2rem', position: 'relative', boxShadow: '-6px 6px 0px #000' }}>
        
        {/* Decorative corner accent */}
        <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '20px', height: '20px', backgroundColor: '#D4AF37', border: '2px solid #000' }}></div>

        <h1 className="title-display" style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.5rem', color: '#000', textAlign: 'center' }}>
          JOIN US.
        </h1>
        <p style={{ fontSize: '1rem', fontWeight: 500, color: '#000', textAlign: 'center', marginBottom: '1.5rem' }}>
          Create an account to book your perfect event setup.
        </p>

        {error && (
          <div style={{ backgroundColor: '#ffcccc', border: '2px solid red', padding: '10px', color: 'red', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ backgroundColor: '#ccffcc', border: '2px solid green', padding: '10px', color: 'green', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.3rem', fontSize: '1rem', color: '#000' }}>Full Name <span style={{ color: '#D4AF37' }}>*</span></label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '2px solid #000', fontSize: '1rem', backgroundColor: '#FFFFFF', color: '#000' }} 
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.3rem', fontSize: '1rem', color: '#000' }}>Email Address <span style={{ color: '#D4AF37' }}>*</span></label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '2px solid #000', fontSize: '1rem', backgroundColor: '#FFFFFF', color: '#000' }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.3rem', fontSize: '1rem', color: '#000' }}>Password <span style={{ color: '#D4AF37' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '2px solid #000', fontSize: '1rem', backgroundColor: '#FFFFFF', color: '#000', paddingRight: '40px' }} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', backgroundColor: '#D4AF37', color: '#FFF', border: '2px solid #000', padding: '12px 0', fontSize: '1.1rem', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', boxShadow: '4px 4px 0px #000' }}
          >
            {loading ? 'Creating...' : 'CREATE ACCOUNT →'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#000', textDecoration: 'underline' }}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
