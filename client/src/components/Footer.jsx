import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--bg-card)', 
      borderTop: '1px solid var(--border)',
      padding: '40px 24px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40
      }}>
        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, width: 'max-content' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, boxShadow: '0 4px 10px var(--accent-glow)'
            }}>🌿</div>
            <span style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text)' }}>
              FarmShield<span style={{ color: 'var(--accent)' }}> AI</span>
            </span>
          </Link>
          <p style={{ marginTop: 16, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Empowering modern agriculture with localized AI diagnostics and precision soil insights. Secure your harvest.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: 16, color: 'var(--text)' }}>Platform</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><Link to="/diagnose" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Plant Diagnosis</Link></li>
            <li><Link to="/soil" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Soil Laboratory</Link></li>
            <li><Link to="/crops" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Crop Match</Link></li>
          </ul>
        </div>

        {/* Legal & About */}
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: 16, color: 'var(--text)' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link></li>
            <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '40px auto 0', paddingTop: 20, borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} FarmShield AI. All rights reserved.
      </div>
    </footer>
  );
}
