import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const { loginWithEmail, registerWithEmail, loginWithGoogle, loginAsGuest } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { t } = useLanguage();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    try {
      setLoading(true);
      await loginAsGuest();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: 500, height: 500, background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 400, height: 400, background: 'var(--accent2)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%', zIndex: 0 }}></div>

      <div className="km-card km-fade-in" style={{ width: '100%', maxWidth: 450, padding: 40, position: 'relative', zIndex: 1, borderTop: '4px solid var(--accent)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--surface)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: 'var(--shadow)' }}>
            🔐
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)' }}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to access your agricultural tools</p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', color: '#ef4444', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: '0.9rem', border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label className="km-label">Email Address</label>
            <input
              type="email"
              className="km-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="farmer@example.com"
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label className="km-label">Password</label>
            <input
              type="password"
              className="km-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="km-btn" style={{ width: '100%', height: 48, fontSize: '1.05rem', marginBottom: 16 }}>
            {loading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', position: 'relative' }}>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--bg-card)', padding: '0 12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <button onClick={handleGoogle} disabled={loading} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', height: 48, borderRadius: 12, border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text)', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" style={{ width: 18 }} />
             Continue with Google
          </button>

          <button onClick={handleGuest} disabled={loading} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', height: 48, borderRadius: 12, border: 'none',
            background: 'var(--bg)', color: 'var(--text-muted)', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'underline'
          }}>
             🕵️‍♂️ Continue as Guest
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)} style={{ border: 'none', background: 'none', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}>
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
