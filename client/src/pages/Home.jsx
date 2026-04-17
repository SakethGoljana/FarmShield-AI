import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const FEATURES = [
  {
    icon: '🔬', 
    titleKey: 'featureDiagTitle',
    link: '/diagnose',
    descKey: 'featureDiagDesc',
    accent: '#22c55e',
    tagKey: 'featureDiagTag'
  },
  {
    icon: '🧪', 
    titleKey: 'featureSoilTitle',
    link: '/soil',
    descKey: 'featureSoilDesc',
    accent: '#0d9488',
    tagKey: 'featureSoilTag'
  },
  {
    icon: '🌾', 
    titleKey: 'featureCropTitle',
    link: '/crops',
    descKey: 'featureCropDesc',
    accent: '#8b5cf6',
    tagKey: 'featureCropTag'
  },
];

const STATS = [
  { value: '55+',   labelKey: 'statCrops', icon: '🌱' },
  { value: '71+',   labelKey: 'statDiseases', icon: '🔬' },
  { value: '250ms', labelKey: 'statLatency', icon: '⚡' },
  { value: '99%',   labelKey: 'statPrecision', icon: '🎯' },
];

const TESTIMONIALS = [
  { text: "FarmShield AI correctly diagnosed Leaf Blight on my wheat crop instantly. Saved my entire harvest!", name: "Rajesh K.", location: "Punjab, India", rating: 5, avatar: "👨🏽‍🌾" },
  { text: "The soil laboratory feature accurately matched the ICAR testing we did independently, but in seconds.", name: "Dr. Alok Verma", location: "Agronomist", rating: 5, avatar: "🔬" },
  { text: "It predicted the perfect time to plant millets despite the changing monsoon patterns.", name: "Sita Devi", location: "Karnataka, India", rating: 4, avatar: "👩🏽‍🌾" },
  { text: "Unbelievably precise and easy to use. The organic remedies suggested actually worked.", name: "Anand M.", location: "Maharashtra", rating: 5, avatar: "🧔🏽‍♂️" },
  { text: "FarmShield AI correctly diagnosed Leaf Blight on my wheat crop instantly. Saved my entire harvest!", name: "Rajesh K.", location: "Punjab, India", rating: 5, avatar: "👨🏽‍🌾" },
  { text: "The soil laboratory feature accurately matched the ICAR testing we did independently, but in seconds.", name: "Dr. Alok Verma", location: "Agronomist", rating: 5, avatar: "🔬" },
  { text: "It predicted the perfect time to plant millets despite the changing monsoon patterns.", name: "Sita Devi", location: "Karnataka, India", rating: 4, avatar: "👩🏽‍🌾" },
  { text: "Unbelievably precise and easy to use. The organic remedies suggested actually worked.", name: "Anand M.", location: "Maharashtra", rating: 5, avatar: "🧔🏽‍♂️" }
];

function Home() {
  const { lang, t } = useLanguage();

  return (
    <div className="km-grid-bg" style={{ minHeight: 'calc(100vh - 64px)', padding: '0', overflowX: 'hidden' }}>

      {/* ── Hero Section ── */}
      <section style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '100px 24px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        position: 'relative'
      }}>
        
        {/* Animated Background Orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, background: 'var(--accent)', filter: 'blur(120px)', opacity: 0.08, borderRadius: '50%', zIndex: 0 }} className="km-float"></div>
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: 250, height: 250, background: 'var(--accent2)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%', zIndex: 0, animationDelay: '2s' }} className="km-float"></div>

        <div className="km-badge km-fade-in" style={{ marginBottom: 28, padding: '6px 16px', fontSize: '0.85rem' }}>
          {t('home.badge')}
        </div>

        <h1 className="km-fade-in" style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 900, lineHeight: 1,
          color: 'var(--text)',
          marginBottom: 24, letterSpacing: '-0.04em',
          animationDelay: '0.1s',
          zIndex: 1
        }}>
          {t('home.heroLine1')}<br /><span className="km-gradient-text" style={{ paddingBottom: 10, display: 'inline-block' }}>{t('home.heroLine2')}</span>
        </h1>

        <p className="km-fade-in" style={{
          fontSize: '1.2rem', color: 'var(--text-muted)',
          maxWidth: 640, lineHeight: 1.6,
          marginBottom: 48, animationDelay: '0.2s',
          zIndex: 1
        }}>
          {t('home.heroDesc')}
        </p>

        <div className="km-fade-in" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', animationDelay: '0.3s', zIndex: 1 }}>
          <Link to="/diagnose" className="km-btn km-pulse" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: 16 }}>
            {t('home.btnScan')} <span style={{ marginLeft: 8 }}>🔬</span>
          </Link>
          <Link to="/soil" style={{
            padding: '16px 40px', fontSize: '1.1rem', borderRadius: 16,
            background: 'var(--bg-card)', color: 'var(--text)',
            border: '1px solid var(--border)', textDecoration: 'none',
            fontWeight: 700, transition: 'all 0.3s',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            boxShadow: 'var(--shadow)'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t('home.btnSoil')} 🧪
          </Link>
        </div>

        {/* Floating Stats Card */}
        <div className="km-card km-fade-in" style={{
          marginTop: 64, width: '100%', maxWidth: 900, 
          padding: '24px 12px', display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 20, animationDelay: '0.4s', zIndex: 1,
          background: 'var(--nav-bg)', backdropFilter: 'blur(10px)',
          borderColor: 'var(--border-strong)'
        }}>
          {STATS.map(s => (
            <div key={s.labelEn} style={{ textAlign: 'center', borderRight: '1px solid var(--border)', lastChild: { border: 'none' } }}>
              <div style={{ fontSize: '1.1rem', marginBottom: 4 }}>{s.icon}</div>
              <div style={{
                fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.02em'
              }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {t(`home.${s.labelKey}`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capabilities Section ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>{t('home.statsTitle')}</h2>
          <div style={{ width: 60, height: 4, background: 'var(--accent)', margin: '0 auto', borderRadius: 2 }}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
        }}>
          {FEATURES.map((f, i) => (
            <Link key={f.link} to={f.link} style={{ textDecoration: 'none' }}>
              <div className="km-card km-fade-in" style={{
                padding: 40, cursor: 'pointer', height: '100%',
                animationDelay: `${0.1 * i + 0.6}s`,
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                   <div style={{
                      width: 64, height: 64, borderRadius: 20,
                      background: `${f.accent}15`,
                      border: `1px solid ${f.accent}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 32, boxShadow: `0 8px 20px ${f.accent}15`
                    }}>{f.icon}</div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, background: 'var(--surface)', color: 'var(--text-muted)', padding: '4px 10px', borderRadius: 6, letterSpacing: 0.5 }}>
                        {t(`home.${f.tagKey}`)}
                    </span>
                </div>

                <h3 style={{
                  fontSize: '1.5rem', fontWeight: 800,
                  color: 'var(--text)', marginBottom: 16,
                  letterSpacing: '-0.01em'
                }}>{t(`home.${f.titleKey}`)}</h3>

                <p style={{
                  fontSize: '1rem', color: 'var(--text-muted)',
                  lineHeight: 1.6, flex: 1
                }}>{t(`home.${f.descKey}`)}</p>

                <div style={{
                  marginTop: 32, display: 'flex', alignItems: 'center', gap: 10,
                  color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 700,
                }}>
                  {t('home.launchLab')} <span style={{ fontSize: 18, transition: 'transform 0.3s' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Testimonials Marquee ── */}
      <section style={{ padding: '40px 0', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>Trusted by Farmers</h2>
          <div style={{ width: 60, height: 4, background: 'var(--accent)', margin: '0 auto', borderRadius: 2 }}></div>
        </div>

        <div className="km-marquee-container">
          <div className="km-marquee-track">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="cyber-card" style={{ 
                minWidth: 350, maxWidth: 400, padding: 24, 
                display: 'flex', flexDirection: 'column', gap: 16,
                whiteSpace: 'normal'
              }}>
                <div style={{ display: 'flex', gap: 4, color: '#fbbf24', fontSize: '1rem' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ opacity: i < t.rating ? 1 : 0.2 }}>★</span>
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, flex: 1, letterSpacing: '0.5px' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                  <div className="cyber-avatar" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="cyber-text-glow" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text)' }}>{t.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.5px' }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section style={{ padding: '80px 24px', background: 'var(--surface)', textAlign: 'center' }}>
         <div className="km-card" style={{ maxWidth: 800, margin: '0 auto', padding: 60, background: 'linear-gradient(135deg, var(--bg-card), var(--bg-card2))' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 20 }}>{t('home.ctaTitle')}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: 32 }}>
                {t('home.ctaDesc')}
            </p>
            <Link to="/diagnose" className="km-btn" style={{ padding: '16px 48px', fontSize: '1.2rem', borderRadius: 16 }}>
               {t('home.ctaBtn')}
            </Link>
         </div>
      </section>

    </div>
  );
}

export default Home;
