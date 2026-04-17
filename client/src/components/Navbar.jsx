import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV_LINKS = [
    { to: '/diagnose', label: t('nav.diagnosis'), icon: '🔬' },
    { to: '/soil',     label: t('nav.soilLab'),   icon: '🧪' },
    { to: '/crops',    label: t('nav.cropMatch'), icon: '🌾' },
    { to: '/history',  label: t('nav.archive'),   icon: '📋' },
    { to: '/about',    label: t('nav.aboutUs'),   icon: '👥' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      height: scrolled ? 64 : 80,
      display: 'flex', alignItems: 'center'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(10px, 4vw, 24px)', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, boxShadow: '0 8px 16px var(--accent-glow)',
              transform: scrolled ? 'scale(0.9)' : 'scale(1)',
              transition: 'transform 0.3s'
            }}>🌿</div>
            <span className="mobile-hide" style={{
              fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text)',
            }}>
              FarmShield<span style={{ color: 'var(--accent)' }}> AI</span>
            </span>
            <span className="md:hidden" style={{
              fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text)',
            }}>
              FS<span style={{ color: 'var(--accent)' }}>AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="km-desktop-nav" style={{ 
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--surface)', padding: '6px', borderRadius: 14,
            border: '1px solid var(--border)'
          }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} 
                className={`km-nav-link ${location.pathname === to ? 'active' : ''}`}
                style={{
                  padding: '8px 16px', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600,
                  color: location.pathname === to ? 'var(--accent)' : 'var(--text-muted)',
                  background: location.pathname === to ? 'var(--bg-card)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1.5vw, 10px)' }}>
            {/* Language Toggle */}
            <div className="km-lang-wrapper">
              <select
                className="km-lang-dropdown"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                title="Select Language"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button className="mobile-hide" onClick={toggle} title="Toggle theme" style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'var(--surface)', border: '1px solid var(--border)',
              cursor: 'pointer', fontSize: 20, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s', color: 'var(--text)',
              boxShadow: 'var(--shadow-sm)'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'rotate(15deg)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'rotate(0)'; }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Auth */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 12px 4px 6px', background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
                <Link to="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 10, border: '2px solid var(--accent)', overflow: 'hidden', background: 'var(--bg-card)' }}>
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.displayName || 'User') + '&background=0D8ABC&color=fff'; }} />
                  ) : (
                    <span style={{ fontSize: 18 }}>👤</span>
                  )}
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                   <Link to="/profile" style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text)' }}>
                      {currentUser.displayName ? currentUser.displayName.split(' ')[0] : 'Profile'}
                   </Link>
                   <button onClick={logout} style={{
                      background: 'none', border: 'none', padding: 0,
                      color: '#ef4444', fontSize: '0.65rem', fontWeight: 700,
                      cursor: 'pointer', textAlign: 'left', opacity: 0.8
                   }}>{t('nav.signOut')}</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="km-btn" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: 12, textDecoration: 'none' }}>
                {t('nav.login')} <span style={{ marginLeft: 6 }}>🔒</span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, width: 42, height: 42, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text)', fontSize: 20,
            }}>{menuOpen ? '✕' : '☰'}</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="km-fade-in" style={{
            position: 'absolute', top: '100%', left: 24, right: 24,
            marginTop: 12, padding: 12,
            background: 'var(--nav-bg)', backdropFilter: 'blur(30px)',
            borderRadius: 20, border: '1px solid var(--border-strong)',
            display: 'flex', flexDirection: 'column', gap: 8,
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 1000
          }}>
            {NAV_LINKS.map(({ to, label, icon }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                style={{
                  padding: '14px 20px', borderRadius: 14, textDecoration: 'none',
                  color: location.pathname === to ? 'var(--accent)' : 'var(--text)',
                  background: location.pathname === to ? 'var(--accent-glow)' : 'var(--surface)',
                  fontWeight: 700, display: 'flex', alignItems: 'center', gap: 14,
                  border: '1px solid transparent',
                  borderColor: location.pathname === to ? 'var(--accent)30' : 'transparent'
                }}>
                <span style={{ fontSize: 20 }}>{icon}</span> {label}
              </Link>
            ))}
            
            {/* Mobile Theme Toggle placed in hamburger menu */}
            <button onClick={toggle} style={{
              padding: '14px 20px', borderRadius: 14,
              background: 'var(--surface)', border: '1px solid var(--border)',
              cursor: 'pointer', fontSize: '1rem', display: 'flex',
              alignItems: 'center', gap: 14, color: 'var(--text)',
              fontWeight: 700, textAlign: 'left', marginTop: 4
            }}>
              <span style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</span> 
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
